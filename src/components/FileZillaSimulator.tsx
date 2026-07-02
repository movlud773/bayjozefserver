import React, { useState, useEffect, useRef } from "react";
import { SIMULATED_FILES_TEMPLATES } from "../data";
import { SimulatedFile, FtpLogLine, FtpConnectionState } from "../types";
import { 
  Server, HardDrive, RefreshCw, Upload, Terminal, Play, CheckCircle, 
  XCircle, Edit3, Code, FileText, Folder, Check, AlertCircle, PlayCircle, HelpCircle
} from "lucide-react";

interface FileZillaSimulatorProps {
  language: "az" | "en";
}

export default function FileZillaSimulator({ language }: FileZillaSimulatorProps) {
  // Connection State
  const [connection, setConnection] = useState<FtpConnectionState>({
    host: "ftpupload.net",
    user: "if0_38472911",
    pass: "mypassword123",
    port: "21",
    isConnected: false,
    isConnecting: false,
  });

  // Files State
  const [localFiles, setLocalFiles] = useState<SimulatedFile[]>(() => {
    return JSON.parse(JSON.stringify(SIMULATED_FILES_TEMPLATES));
  });
  const [remoteFiles, setRemoteFiles] = useState<SimulatedFile[]>([]);
  const [selectedLocalFile, setSelectedLocalFile] = useState<SimulatedFile | null>(null);
  const [selectedRemoteFile, setSelectedRemoteFile] = useState<SimulatedFile | null>(null);
  
  // Editor state
  const [editorContent, setEditorContent] = useState<string>("");
  const [editingFileName, setEditingFileName] = useState<string>("");

  // Transfer and Queue logs
  const [logs, setLogs] = useState<FtpLogLine[]>([]);
  const [queuedFiles, setQueuedFiles] = useState<string[]>([]);
  const [transferProgress, setTransferProgress] = useState<number | null>(null);
  const [transferringFileName, setTransferringFileName] = useState<string>("");

  // Real-world connectivity test state
  const [testHost, setTestHost] = useState("ftpupload.net");
  const [testPort, setTestPort] = useState("21");
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    ip: string | null;
    dnsStatus: string;
    portStatus: string;
    message: string;
  } | null>(null);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Initial local file selection
  useEffect(() => {
    const defaultFile = localFiles.find(f => !f.isDirectory);
    if (defaultFile) {
      setSelectedLocalFile(defaultFile);
      setEditorContent(defaultFile.content || "");
      setEditingFileName(defaultFile.name);
    }
    
    // Add initial tutorial log
    addLog("info", language === "az" 
      ? "Sistem hazırdır. Hostinq məlumatlarınızı daxil edin və 'Quick Connect' düyməsini sıxın."
      : "System ready. Input your free hosting FTP details and click 'Quick Connect'."
    );
  }, []);

  // Scroll to bottom of logs
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (type: FtpLogLine["type"], text: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      { id: Math.random().toString(), type, text, timestamp }
    ]);
  };

  // Connection Handler
  const handleConnect = () => {
    if (connection.isConnected) {
      // Disconnect
      setConnection(prev => ({ ...prev, isConnected: false }));
      setRemoteFiles([]);
      addLog("info", language === "az" ? "Bağlantı kəsildi." : "Disconnected from server.");
      return;
    }

    if (!connection.host || !connection.user) {
      alert(language === "az" ? "Zəhmət olmasa Host və İstifadəçi adını daxil edin." : "Please enter both Host and Username.");
      return;
    }

    setConnection(prev => ({ ...prev, isConnecting: true }));
    addLog("command", `CONNECT ${connection.user}@${connection.host}:${connection.port}`);
    addLog("info", language === "az" ? "DNS ünvanı həll edilir..." : "Resolving IP address for " + connection.host + "...");

    // Simulate standard FTP negotiation stages
    setTimeout(() => {
      addLog("response", "Status: Connecting to " + connection.host + "...");
      
      setTimeout(() => {
        addLog("response", "Response: 220-Welcome to Free Hosting FTP Server.");
        addLog("command", `USER ${connection.user}`);
        
        setTimeout(() => {
          addLog("response", "Response: 331 Password required for " + connection.user);
          addLog("command", "PASS **********");
          
          setTimeout(() => {
            addLog("response", "Response: 230 User logged in, proceed.");
            addLog("command", "SYST");
            addLog("response", "Response: 215 UNIX Type: L8");
            addLog("command", "PWD");
            addLog("response", "Response: 257 \"/\" is current directory.");
            addLog("command", "TYPE I");
            addLog("response", "Response: 200 Type set to I.");
            addLog("command", "PASV");
            addLog("response", "Response: 227 Entering Passive Mode (192,168,1,104,211,43)");
            addLog("command", "LIST");
            addLog("response", "Response: 150 Opening ASCII mode data connection for file list.");
            
            // Set empty remote htdocs or simple root
            setRemoteFiles([
              { name: "htdocs", path: "/", isDirectory: true }
            ]);
            
            setConnection(prev => ({ ...prev, isConnected: true, isConnecting: false }));
            addLog("response", "Response: 226 Transfer complete. Connected successfully!");
            addLog("info", language === "az" 
              ? "Uğurla qoşuldu! İndi sol tərəfdəki faylları seçib 'Yüklə (Upload)' düyməsinə klikləyərək serverə göndərə bilərsiniz." 
              : "Connected successfully! Now select any local file and click 'Upload' to send it to the server."
            );
          }, 600);
        }, 500);
      }, 500);
    }, 800);
  };

  // Upload Handler
  const handleUpload = (file: SimulatedFile) => {
    if (!connection.isConnected) {
      addLog("error", language === "az" 
        ? "Xəta: Serverə qoşulmayıb! Zəhmət olmasa əvvəlcə 'Quick Connect' düyməsini sıxın." 
        : "Error: Not connected to any server! Please click 'Quick Connect' first."
      );
      return;
    }

    if (file.isDirectory) {
      addLog("info", language === "az" 
        ? `Qovluq yaradılır: ${file.name}` 
        : `Creating directory: ${file.name}`
      );
      // create directory in remote
      setRemoteFiles(prev => {
        if (prev.some(f => f.name === file.name && f.path === "/")) return prev;
        return [...prev, { ...file, path: "/" }];
      });
      return;
    }

    // Add to transfer queue
    setQueuedFiles(prev => [...prev, file.name]);
    setTransferringFileName(file.name);
    setTransferProgress(0);

    addLog("command", `PORT 192,168,1,104,211,44`);
    addLog("command", `STOR /htdocs/${file.name}`);
    addLog("response", `150 Opening BINARY mode data connection for /htdocs/${file.name}`);

    // Simulate transfer progress ticking
    const interval = setInterval(() => {
      setTransferProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          
          // Complete transfer
          setRemoteFiles(oldRemote => {
            const fileExists = oldRemote.some(f => f.name === file.name && f.path === "/htdocs");
            if (fileExists) {
              // Update content of existing file
              return oldRemote.map(f => f.name === file.name && f.path === "/htdocs" ? { ...file, path: "/htdocs", lastModified: "Yenicə / Just now" } : f);
            } else {
              // Insert file
              return [...oldRemote, { ...file, path: "/htdocs", lastModified: "Yenicə / Just now" }];
            }
          });

          addLog("response", `Response: 226 Transfer complete. ${file.name} successfully uploaded!`);
          setQueuedFiles(prevQueue => prevQueue.filter(name => name !== file.name));
          setTransferProgress(null);
          setTransferringFileName("");
          return null;
        }
        return prev + 25;
      });
    }, 300);
  };

  // Local File Save / Edit
  const handleSaveContent = () => {
    if (!selectedLocalFile) return;
    
    setLocalFiles(prev => prev.map(f => {
      if (f.name === selectedLocalFile.name && f.path === selectedLocalFile.path) {
        return {
          ...f,
          content: editorContent,
          size: `${(editorContent.length / 1024).toFixed(2)} KB`,
          lastModified: "Yenicə redaktə olundu / Edited just now"
        };
      }
      return f;
    }));

    // Update selected ref
    setSelectedLocalFile(prev => prev ? {
      ...prev,
      content: editorContent,
      size: `${(editorContent.length / 1024).toFixed(2)} KB`,
      lastModified: "Yenicə redaktə olundu / Edited just now"
    } : null);

    addLog("info", language === "az"
      ? `Yerli fayl yadda saxlanıldı: ${editingFileName}`
      : `Saved local file changes: ${editingFileName}`
    );
  };

  const handleLocalFileSelect = (file: SimulatedFile) => {
    if (file.isDirectory) return;
    setSelectedLocalFile(file);
    setEditorContent(file.content || "");
    setEditingFileName(file.name);
  };

  // Real-world server connection tester using `/api/ftp/check` API
  const handleTestRealServer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testHost) return;

    setIsTesting(true);
    setTestResult(null);

    try {
      const response = await fetch("/api/ftp/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host: testHost, port: testPort })
      });

      const data = await response.json();
      setTestResult({
        success: data.success,
        ip: data.ip,
        dnsStatus: data.dnsStatus,
        portStatus: data.portStatus,
        message: data.message
      });
    } catch (err) {
      setTestResult({
        success: false,
        ip: null,
        dnsStatus: "failed",
        portStatus: "failed",
        message: language === "az"
          ? "Sınaq zamanı daxili xidmət xətası baş verdi."
          : "An internal server error occurred while testing connection."
      });
    } finally {
      setIsTesting(false);
    }
  };

  // Extract simulated remote index.html to preview
  const getHostedPreviewContent = () => {
    const indexFile = remoteFiles.find(f => f.name === "index.html" && f.path === "/htdocs");
    const styleFile = remoteFiles.find(f => f.name === "style.css" && f.path === "/htdocs");

    if (!indexFile) {
      return `<div style="font-family: sans-serif; text-align: center; padding: 50px; color: #a1a1aa; background-color: #09090b; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px; color: #71717a;"><line x1="22" y1="2" x2="2" y2="22"></line><path d="M2 2h20v20H2z"></path></svg>
        <h3>${language === "az" ? "İndeks Faylı Tapılmadı" : "Index File Not Found"}</h3>
        <p style="font-size: 13px; max-width: 320px; line-height: 1.5;">${
          language === "az" 
            ? "Serverin 'htdocs' qovluğuna hələ 'index.html' faylı yükləməmisiniz. Sol tərəfdən 'index.html' seçin və 'Upload' düyməsinə basın!" 
            : "You have not uploaded 'index.html' into the 'htdocs' directory yet. Select index.html on the left and click 'Upload'!"
        }</p>
      </div>`;
    }

    // Embed CSS styles if style.css exists
    let html = indexFile.content || "";
    if (styleFile && styleFile.content) {
      const cssInsert = `<style>${styleFile.content}</style>`;
      if (html.includes("</head>")) {
        html = html.replace("</head>", `${cssInsert}</head>`);
      } else {
        html = cssInsert + html;
      }
    }

    return html;
  };

  return (
    <div className="space-y-6">
      {/* FileZilla Interactive UI Box */}
      <div className="bg-zinc-950 text-zinc-300 font-sans border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header/Connection Bar */}
        <header className="border-b border-zinc-800 bg-zinc-900/90 p-4 shrink-0 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-white via-zinc-200 to-zinc-400 rounded flex items-center justify-center text-zinc-950 font-black text-sm shadow-md shadow-zinc-400/20 border border-white/20">
              JM
            </div>
            <div>
              <span className="text-white font-black tracking-widest text-sm">JM FILEZILLA CLIENT</span>
              <span className="text-[10px] bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded ml-2 border border-zinc-700/60 font-mono font-semibold">
                {connection.isConnected ? "CONNECTED (SSL/TLS)" : "OFFLINE"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-1 max-w-4xl">
            <div>
              <label className="text-[10px] text-zinc-500 block uppercase font-bold mb-1 font-mono">Host</label>
              <input 
                type="text" 
                value={connection.host}
                onChange={(e) => setConnection(prev => ({ ...prev, host: e.target.value }))}
                placeholder="sftp.free-host.com" 
                disabled={connection.isConnected}
                className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:border-zinc-300 focus:outline-none disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block uppercase font-bold mb-1 font-mono">Username</label>
              <input 
                type="text" 
                value={connection.user}
                onChange={(e) => setConnection(prev => ({ ...prev, user: e.target.value }))}
                placeholder="ftp_user" 
                disabled={connection.isConnected}
                className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:border-zinc-300 focus:outline-none disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block uppercase font-bold mb-1 font-mono">Password</label>
              <input 
                type="password" 
                value={connection.pass}
                onChange={(e) => setConnection(prev => ({ ...prev, pass: e.target.value }))}
                placeholder="••••••••" 
                disabled={connection.isConnected}
                className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:border-zinc-300 focus:outline-none disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block uppercase font-bold mb-1 font-mono">Port</label>
              <input 
                type="text" 
                value={connection.port}
                onChange={(e) => setConnection(prev => ({ ...prev, port: e.target.value }))}
                placeholder="21" 
                disabled={connection.isConnected}
                className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:border-zinc-300 focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>

          <button 
            onClick={handleConnect}
            disabled={connection.isConnecting}
            className={`w-full xl:w-auto px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow ${
              connection.isConnected 
                ? "bg-rose-600 hover:bg-rose-500 text-white font-bold" 
                : "bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-zinc-950 hover:bg-zinc-100 font-extrabold"
            } disabled:opacity-50`}
          >
            {connection.isConnecting 
              ? (language === "az" ? "Qoşulur..." : "Connecting...")
              : connection.isConnected 
                ? (language === "az" ? "Bağlantını Kəs" : "Disconnect")
                : (language === "az" ? "Qoşul / Connect" : "Quick Connect")
            }
          </button>
        </header>

        {/* Console Log Area */}
        <section className="h-36 border-b border-zinc-800 bg-zinc-950/90 p-3 overflow-y-auto font-mono text-[11px] leading-relaxed select-text space-y-1">
          {logs.map((log) => {
            let color = "text-zinc-400";
            if (log.type === "command") color = "text-zinc-300 font-mono";
            else if (log.type === "response") color = "text-zinc-100 font-semibold";
            else if (log.type === "error") color = "text-rose-400 font-bold font-mono";
            else if (log.type === "info") color = "text-zinc-400 italic";

            return (
              <div key={log.id} className="flex gap-3">
                <span className="text-zinc-600 shrink-0 select-none">[{log.timestamp}]</span>
                <span className={color}>{log.text}</span>
              </div>
            );
          })}
          <div ref={consoleEndRef} />
        </section>

        {/* Directory Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-zinc-800 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
          
          {/* Local Directory Column */}
          <section className="flex flex-col bg-zinc-900/20 h-80 overflow-hidden">
            <div className="bg-zinc-900/60 px-4 py-2 text-xs font-mono border-b border-zinc-800 flex justify-between items-center text-zinc-400">
              <span className="truncate flex items-center gap-1.5 font-semibold text-zinc-300">
                <HardDrive className="h-3.5 w-3.5 text-zinc-500" />
                Local Site: /Users/admin/projects/freehost-app/
              </span>
            </div>

            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead className="bg-zinc-950 text-zinc-500 sticky top-0 border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">{language === "az" ? "Fayl Adı" : "Filename"}</th>
                    <th className="px-4 py-2.5 font-semibold text-right w-24">{language === "az" ? "Ölçü" : "Size"}</th>
                    <th className="px-4 py-2.5 font-semibold text-right w-36">{language === "az" ? "Dəyişmə vaxtı" : "Modified"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {localFiles.map((file) => {
                    const isSelected = selectedLocalFile?.name === file.name;
                    return (
                      <tr 
                        key={file.name}
                        onClick={() => handleLocalFileSelect(file)}
                        className={`cursor-pointer transition-colors ${
                          isSelected 
                            ? "bg-zinc-800 border-l-2 border-zinc-200 text-white font-semibold" 
                            : "hover:bg-zinc-800/40 text-zinc-300"
                        }`}
                      >
                        <td className="px-4 py-2 flex items-center gap-2">
                          {file.isDirectory ? (
                            <Folder className="h-4 w-4 text-amber-500 fill-amber-500/25 shrink-0" />
                          ) : (
                            <FileText className="h-4 w-4 text-sky-400 shrink-0" />
                          )}
                          <span className={file.isDirectory ? "font-semibold" : ""}>{file.name}</span>
                        </td>
                        <td className="px-4 py-2 text-right text-zinc-500">{file.size || "--"}</td>
                        <td className="px-4 py-2 text-right text-zinc-500 text-[10px]">{file.lastModified || "--"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Local file actions */}
            <div className="bg-zinc-900/60 p-3 border-t border-zinc-800 flex items-center justify-between gap-4">
              <span className="text-[10px] text-zinc-500 truncate">
                {selectedLocalFile ? `${selectedLocalFile.name} (${selectedLocalFile.size || "directory"})` : "No file selected"}
              </span>
              <button
                onClick={() => selectedLocalFile && handleUpload(selectedLocalFile)}
                disabled={!selectedLocalFile || !connection.isConnected}
                className="bg-gradient-to-br from-white via-zinc-200 to-zinc-300 hover:bg-zinc-100 disabled:opacity-40 text-zinc-950 font-black text-xs px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-inner"
              >
                <Upload className="h-3 w-3" />
                {language === "az" ? "Serverə Yüklə" : "Upload to Host"}
              </button>
            </div>
          </section>

          {/* Remote Directory Column */}
          <section className="flex flex-col bg-zinc-900/20 h-80 overflow-hidden">
            <div className="bg-zinc-900/60 px-4 py-2 text-xs font-mono border-b border-zinc-800 flex justify-between items-center">
              <span className="truncate flex items-center gap-1.5 font-semibold text-zinc-200">
                <Server className="h-3.5 w-3.5 text-zinc-400" />
                Remote Site: /htdocs/
              </span>
              <span className="text-[10px] text-zinc-500">
                {connection.isConnected ? connection.host : "Not connected"}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto">
              {!connection.isConnected ? (
                <div className="h-full flex flex-col justify-center items-center text-center p-6 text-zinc-600">
                  <Terminal className="h-8 w-8 mb-2 stroke-1" />
                  <p className="text-xs font-mono uppercase tracking-wider font-bold mb-1">
                    {language === "az" ? "Serverə qoşulmayıb" : "No active server connection"}
                  </p>
                  <p className="text-[11px] max-w-xs font-sans text-zinc-500 leading-normal">
                    {language === "az" 
                      ? "Faylları idarə etmək və saytı yayımlamaq üçün yuxarıda FTP məlumatlarınızı yazıb 'Quick Connect' düyməsinə basın." 
                      : "Input FTP host details and click 'Quick Connect' above to browse and manage hosted directories."}
                  </p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead className="bg-zinc-950 text-zinc-500 sticky top-0 border-b border-zinc-800">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">{language === "az" ? "Fayl Adı" : "Filename"}</th>
                      <th className="px-4 py-2.5 font-semibold text-right w-24">{language === "az" ? "Ölçü" : "Size"}</th>
                      <th className="px-4 py-2.5 font-semibold text-right w-36">{language === "az" ? "Status/Modified" : "Status/Modified"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {/* Dummy Parent Dir */}
                    <tr className="text-zinc-500 hover:bg-zinc-800/20">
                      <td className="px-4 py-2 flex items-center gap-2">
                        <Folder className="h-4 w-4 text-emerald-600/70 shrink-0" />
                        <span>.. (Parent Directory)</span>
                      </td>
                      <td className="px-4 py-2 text-right">--</td>
                      <td className="px-4 py-2 text-right">--</td>
                    </tr>

                    {/* Remote Directory list */}
                    {remoteFiles.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-zinc-600 italic">
                          {language === "az" ? "[ boş qovluq ]" : "[ empty directory ]"}
                        </td>
                      </tr>
                    ) : (
                      remoteFiles.map((file) => (
                        <tr 
                          key={file.name}
                          className="hover:bg-zinc-800/20 text-zinc-300"
                        >
                          <td className="px-4 py-2 flex items-center gap-2">
                            {file.isDirectory ? (
                              <Folder className="h-4 w-4 text-zinc-400 fill-zinc-400/10 shrink-0" />
                            ) : (
                              <FileText className="h-4 w-4 text-zinc-300 shrink-0" />
                            )}
                            <span className={file.isDirectory ? "font-semibold" : "text-zinc-100"}>
                              {file.name}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right text-zinc-500">{file.size || "--"}</td>
                          <td className="px-4 py-2 text-right text-zinc-300 text-[10px]">
                            {file.lastModified || "Uploaded"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <div className="bg-zinc-900/60 p-3 border-t border-zinc-800 text-right text-[10px] text-zinc-500">
              {language === "az" 
                ? `Fayl sayı: ${remoteFiles.length}` 
                : `Total files: ${remoteFiles.length}`
              }
            </div>
          </section>
        </div>

        {/* Live Code Editor & Hosted Site Preview Combined */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
          
          {/* Virtual File Editor */}
          <div className="p-4 bg-zinc-950 flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <Code className="h-4 w-4 text-zinc-300" />
                {language === "az" ? "Yerli Fayl Redaktoru" : "Local Code Editor"}
              </h3>
              {selectedLocalFile && (
                <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 font-mono">
                  {selectedLocalFile.name}
                </span>
              )}
            </div>

            {selectedLocalFile ? (
              <div className="space-y-3 flex-1 flex flex-col">
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="w-full h-44 bg-zinc-900 border border-zinc-700/80 rounded p-3 text-xs font-mono text-zinc-300 focus:ring-1 focus:ring-zinc-400 focus:outline-none leading-relaxed"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleSaveContent}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-xs px-3.5 py-1.5 rounded flex items-center gap-1 transition-all"
                  >
                    <Check className="h-3.5 w-3.5 text-zinc-100" />
                    {language === "az" ? "Dəyişiklikləri Saxla" : "Save Local Changes"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-44 flex items-center justify-center text-center text-zinc-600 text-xs">
                {language === "az" 
                  ? "Redaktə etmək üçün sol tərəfdəki yerli fayllardan birinə klikləyin." 
                  : "Click any file in the Local Directory column to edit its content."}
              </div>
            )}
          </div>

          {/* Interactive Live Website Preview */}
          <div className="p-4 bg-zinc-950 flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-sky-400 animate-pulse" />
                {language === "az" ? "Canlı Host Yayımı (Live Preview)" : "Live Hosted Website Preview"}
              </h3>
              {connection.isConnected && (
                <span className="text-[10px] bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-200 font-bold font-mono">
                  http://{connection.user}.infinityfreeapp.com/
                </span>
              )}
            </div>

            <div className="border border-zinc-800 rounded bg-white overflow-hidden h-44 relative">
              <iframe
                title="Simulated Host Webpage"
                srcDoc={getHostedPreviewContent()}
                className="w-full h-full bg-white border-0"
                sandbox="allow-scripts"
              />
            </div>

            <p className="text-[10px] text-zinc-500 leading-normal text-center bg-zinc-900/30 p-2 rounded">
              {language === "az"
                ? "💡 Yerli redaktorda faylı dəyişdikdən sonra 'Serverə Yüklə' (Upload) düyməsini sıxın, canlı preview saniyələr ərzində yenilənəcəkdir!"
                : "💡 After editing a file locally, upload it to the server. The live hosted preview updates instantly!"
              }
            </p>
          </div>
        </div>

        {/* Bottom Queue Status Bar */}
        <footer className="bg-zinc-900/80 px-4 py-2 border-t border-zinc-800 flex flex-wrap justify-between items-center gap-3 text-[11px] font-mono shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-zinc-500">
              {language === "az" ? "Növbədəki fayllar:" : "Queue:"}{" "}
              <strong className={queuedFiles.length > 0 ? "text-amber-400" : "text-zinc-400"}>
                {queuedFiles.length}
              </strong>
            </span>
            {transferProgress !== null && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-100 animate-pulse font-semibold">{language === "az" ? "Yüklənir:" : "Uploading:"} {transferringFileName}</span>
                <div className="w-24 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-zinc-300 h-full transition-all" style={{ width: `${transferProgress}%` }}></div>
                </div>
                <span className="text-zinc-400 font-bold">{transferProgress}%</span>
              </div>
            )}
          </div>
          <div className="text-[10px] text-zinc-500 font-sans">
            {language === "az" ? "Simulyasiya rejimi • 0 AZN pulsuz hostinq" : "Simulation mode • 0 USD free web hosting"}
          </div>
        </footer>
      </div>

      {/* Real-World Server Connection Port Tester Tool */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <RefreshCw className={`h-5 w-5 text-sky-400 ${isTesting ? "animate-spin" : ""}`} />
          <div>
            <h2 className="text-base font-bold text-slate-100">
              {language === "az" ? "Real FTP Server Bağlantı Yoxlayıcısı" : "Real FTP Server Connection Tester"}
            </h2>
            <p className="text-xs text-slate-400">
              {language === "az" 
                ? "Pulsuz aldığınız real hostinqin FTP serverinin aktiv və açıq olduğunu yoxlayın (DNS & Port TCP yoxlaması)." 
                : "Validate if your real free hosting FTP server is online and accessible (performs DNS resolve & TCP handshake)."}
            </p>
          </div>
        </div>

        <form onSubmit={handleTestRealServer} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1.5">{language === "az" ? "Server Hostu (məs. ftpupload.net):" : "FTP Server Host (e.g. ftpupload.net):"}</label>
            <input
              type="text"
              required
              value={testHost}
              onChange={(e) => setTestHost(e.target.value)}
              placeholder="ftpupload.net"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1.5">{language === "az" ? "Port (21 və ya 22):" : "Port (21 or 22):"}</label>
            <input
              type="text"
              required
              value={testPort}
              onChange={(e) => setTestPort(e.target.value)}
              placeholder="21"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isTesting}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {language === "az" ? "Yoxlanılır..." : "Testing Connection..."}
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  {language === "az" ? "Portu Yoxla" : "Test Connectivity"}
                </>
              )}
            </button>
          </div>
        </form>

        {testResult && (
          <div className={`p-4 rounded-lg border flex items-start gap-3 text-xs ${
            testResult.success 
              ? "bg-emerald-500/10 border-emerald-500/30 text-slate-200" 
              : "bg-rose-500/10 border-rose-500/30 text-slate-200"
          }`}>
            {testResult.success ? (
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <span className="font-bold block uppercase tracking-wider text-[10px]">
                {testResult.success 
                  ? (language === "az" ? "BAĞLANTI AKTİVDİR!" : "CONNECTION ACTIVE!") 
                  : (language === "az" ? "BAĞLANTI UĞURSUZ OLDU!" : "CONNECTION FAILED!")
                }
              </span>
              <p className="text-slate-300">{testResult.message}</p>
              {testResult.ip && (
                <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-mono pt-1">
                  <span>IP: {testResult.ip}</span>
                  <span>DNS: {testResult.dnsStatus.toUpperCase()}</span>
                  <span>PORT: {testResult.portStatus.toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
