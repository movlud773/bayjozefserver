import express from "express";
import path from "path";
import dns from "dns";
import net from "net";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // DNS & Port connection checker endpoint
  app.post("/api/ftp/check", async (req, res) => {
    const { host, port } = req.body;

    if (!host) {
      return res.status(400).json({ error: "Hostname is required." });
    }

    const targetPort = port ? parseInt(port, 10) : 21;
    if (isNaN(targetPort) || targetPort < 1 || targetPort > 65535) {
      return res.status(400).json({ error: "Invalid port number. Must be between 1 and 65535." });
    }

    // Clean target host from prefix like ftp:// or http://
    let cleanHost = host.replace(/^(ftp:\/\/|sftp:\/\/|https:\/\/|http:\/\/)/i, "");
    cleanHost = cleanHost.split("/")[0].split(":")[0]; // extract only host part

    try {
      // 1. Resolve DNS
      const ip = await new Promise<string | null>((resolve) => {
        dns.lookup(cleanHost, (err, address) => {
          if (err) resolve(null);
          else resolve(address);
        });
      });

      if (!ip) {
        return res.json({
          success: false,
          host: cleanHost,
          ip: null,
          dnsStatus: "failed",
          portStatus: "unknown",
          message: "Hostname could not be resolved. Please check if the host exists or if you misspelled it.",
        });
      }

      // 2. Perform TCP port check (connect with a 4s timeout)
      const portStatus = await new Promise<"open" | "closed" | "timeout">((resolve) => {
        const socket = new net.Socket();
        let solved = false;

        const timer = setTimeout(() => {
          if (!solved) {
            solved = true;
            socket.destroy();
            resolve("timeout");
          }
        }, 4000);

        socket.connect(targetPort, cleanHost, () => {
          if (!solved) {
            solved = true;
            clearTimeout(timer);
            socket.end();
            resolve("open");
          }
        });

        socket.on("error", () => {
          if (!solved) {
            solved = true;
            clearTimeout(timer);
            socket.destroy();
            resolve("closed");
          }
        });
      });

      let message = "";
      if (portStatus === "open") {
        message = `Successfully reached ${cleanHost} (${ip}) on port ${targetPort}! The host is active and ready for connection.`;
      } else if (portStatus === "timeout") {
        message = `Connection to ${cleanHost} (${ip}) on port ${targetPort} timed out. The server might be offline, behind a firewall, or blocked.`;
      } else {
        message = `Connection refused on ${cleanHost} (${ip}) on port ${targetPort}. Please verify that the host supports FTP/SFTP on this port.`;
      }

      return res.json({
        success: portStatus === "open",
        host: cleanHost,
        ip,
        dnsStatus: "ok",
        portStatus,
        message,
      });

    } catch (err: any) {
      return res.status(500).json({
        error: "Server encountered an error while testing connectivity.",
        details: err?.message || String(err),
      });
    }
  });

  // Lazy initialized AI assistant recommendation route
  app.post("/api/ai/recommend", async (req, res) => {
    const { requirements, projectType, language = "az" } = req.body;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
      return res.json({
        error: "missing_api_key",
        message: language === "az" 
          ? "Sistemdə Gemini API Açarı tapılmadı. Zəhmət olmasa AI Studio interfeysində 'Settings > Secrets' panelindən GEMINI_API_KEY əlavə edin."
          : "Gemini API Key is missing. Please add GEMINI_API_KEY under 'Settings > Secrets' panel in the AI Studio UI to enable AI recommendations.",
      });
    }

    try {
      // Lazy initialization of SDK
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const userRequirements = requirements || "No specific requirements provided.";
      const userProjectType = projectType || "general website";

      const systemInstruction = `You are a professional free web hosting and free domain expert.
Your goal is to guide developers on how to host their projects entirely for free (0 USD cost) using free domain registrars and free web hosting servers, with clear FileZilla or deployment setups.
You must respond in the requested language: "${language}" (which is likely Azerbaijani or English). Keep your explanations concise, professional, and action-oriented.
Recommend 2-3 specific free hosting servers (like InfinityFree, GitHub Pages, Vercel, Netlify, Render, Freehostia, AwardSpace) and free domains/subdomains (EU.org, PP.UA, DuckDNS, or built-in subdomains like .infinityfreeapp.com, .vercel.app) that perfectly match the project type: "${userProjectType}".
Include step-by-step instructions on how to set up the connection using FileZilla (FTP host, port, protocol) or static deployment for the recommended setups.
Return the output in clean Markdown formatting. No introductory fluff.`;

      const prompt = `Project Type: ${userProjectType}
User Special Requirements: ${userRequirements}

Please provide the best free hosting & domain combinations and step-by-step setup guides!`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        success: true,
        recommendation: response.text,
      });

    } catch (err: any) {
      return res.json({
        success: false,
        error: "api_error",
        message: err?.message || String(err),
      });
    }
  });

  // Serve static files and integrate Vite in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
