import React, { useState } from "react";
import { Sparkles, Send, RefreshCw, AlertCircle, HelpCircle, CheckCircle, HelpCircle as HelpIcon } from "lucide-react";

interface AiRecommenderProps {
  language: "az" | "en";
}

export default function AiRecommender({ language }: AiRecommenderProps) {
  const [projectType, setProjectType] = useState("react");
  const [requirements, setRequirements] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<{ type: string; message: string } | null>(null);

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendation(null);
    setErrorState(null);

    try {
      const response = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType,
          requirements,
          language
        })
      });

      const data = await response.json();
      if (data.error === "missing_api_key") {
        setErrorState({
          type: "key_missing",
          message: data.message
        });
      } else if (data.success && data.recommendation) {
        setRecommendation(data.recommendation);
      } else {
        setErrorState({
          type: "api_error",
          message: data.message || (language === "az" ? "Tövsiyə alınarkən xəta baş verdi." : "An error occurred while fetching suggestions.")
        });
      }
    } catch (err: any) {
      setErrorState({
        type: "network_error",
        message: err?.message || (language === "az" ? "Serverlə əlaqə kəsildi." : "Lost connection to the server.")
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPresetRequirements = (type: string) => {
    if (type === "react") {
      setRequirements(language === "az" 
        ? "Mən React / Vite və Tailwind CSS istifadə edərək hazırladığım portfoliomu tamamilə pulsuz yerləşdirmək istəyirəm." 
        : "I want to host my portfolio build with React, Vite, and Tailwind CSS entirely for free."
      );
    } else if (type === "php") {
      setRequirements(language === "az" 
        ? "Mənə daxilində MySQL verilənlər bazası və FTP olan, PHP 8 dəstəkləyən tam ödənişsiz bir paylaşılan (shared) hostinq lazımdır." 
        : "I need a 100% free shared hosting that supports PHP 8, has MySQL database, and supports FTP."
      );
    } else if (type === "nodejs") {
      setRequirements(language === "az" 
        ? "Mən Node.js / Express backend serveri və ya Python API xidmətini 0 dollar xərcləyərək 24/7 işlək saxlamaq istəyirəm." 
        : "I want to deploy a Node.js / Express backend server or Python API running 24/7 with zero costs."
      );
    } else {
      setRequirements("");
    }
  };

  return (
    <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-white via-zinc-200 to-zinc-400 p-2 rounded-lg shadow-md shadow-zinc-500/10">
          <Sparkles className="h-5 w-5 text-zinc-950" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-100">
            {language === "az" ? "AI Pulsuz Host Recommender" : "AI Free Hosting Assistant"}
          </h2>
          <p className="text-xs text-slate-400">
            {language === "az" 
              ? "Layihənizin texnologiyalarını qeyd edin, süni intellekt sizə ən uyğun pulsuz hostinq və pulsuz domen birləşməsini tapsın!" 
              : "Specify your project details, and Gemini AI will propose the perfect free host + free domain stack for 0 USD cost!"}
          </p>
        </div>
      </div>

      <form onSubmit={handleRecommend} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1.5">
              {language === "az" ? "Layihə növü (Texnologiya):" : "Project Type (Stack):"}
            </label>
            <select
              value={projectType}
              onChange={(e) => {
                setProjectType(e.target.value);
                getPresetRequirements(e.target.value);
              }}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-zinc-400 focus:outline-none"
            >
              <option value="react">React / Vue / Vite / Static SPA</option>
              <option value="php">PHP / WordPress / MySQL</option>
              <option value="nodejs">Node.js / Express / Python / VPS</option>
              <option value="custom">Custom requirements</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1.5">
              {language === "az" ? "Hazır şablonlardan seçin:" : "Quick Preset templates:"}
            </label>
            <div className="flex flex-wrap gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => { setProjectType("react"); getPresetRequirements("react"); }}
                className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                  projectType === "react" ? "bg-zinc-800 border-zinc-300 text-white font-bold" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                React/Static
              </button>
              <button
                type="button"
                onClick={() => { setProjectType("php"); getPresetRequirements("php"); }}
                className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                  projectType === "php" ? "bg-zinc-800 border-zinc-300 text-white font-bold" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                PHP/WordPress
              </button>
              <button
                type="button"
                onClick={() => { setProjectType("nodejs"); getPresetRequirements("nodejs"); }}
                className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                  projectType === "nodejs" ? "bg-zinc-800 border-zinc-300 text-white font-bold" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Node.js/VPS
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 font-semibold block mb-1.5">
            {language === "az" ? "Layihə tələbləri və əlavə qeydləriniz:" : "What do you want to host? Describe details:"}
          </label>
          <textarea
            required
            rows={3}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder={
              language === "az"
                ? "Məsələn: MySQL bazası, limitsiz trafik və FileZilla ilə fayl ötürməsi mütləqdir."
                : "E.g. I need MySQL backend, unlimited traffic, and FileZilla FTP support."
            }
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-600 focus:ring-1 focus:ring-zinc-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-br from-white via-zinc-200 to-zinc-400 hover:bg-zinc-100 disabled:opacity-50 text-zinc-950 font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-zinc-500/20"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              {language === "az" ? "Generasiya olunur..." : "Analyzing Requirements..."}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {language === "az" ? "Tövsiyə Al" : "Generate Recommendations"}
            </>
          )}
        </button>
      </form>

      {/* Recommendations display */}
      {recommendation && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <CheckCircle className="h-4 w-4 text-zinc-300" />
            <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-widest">
              {language === "az" ? "SÜNİ İNTELLEKT TÖVSİYƏLƏRİ" : "AI RECOMMENDATIONS & SETUP STEPS"}
            </h3>
          </div>
          <div className="prose prose-invert prose-xs text-xs text-slate-300 leading-relaxed font-sans max-w-none space-y-3">
            {recommendation.split("\n").map((line, i) => {
              if (line.startsWith("### ")) {
                return <h4 key={i} className="text-slate-100 font-bold text-sm pt-2">{line.replace("### ", "")}</h4>;
              } else if (line.startsWith("## ")) {
                return <h3 key={i} className="text-zinc-100 font-bold text-sm pt-3 border-t border-slate-900">{line.replace("## ", "")}</h3>;
              } else if (line.startsWith("- ") || line.startsWith("* ")) {
                return <li key={i} className="ml-4 list-disc text-slate-300">{line.replace(/^[-*]\s+/, "")}</li>;
              } else if (line.trim() === "") {
                return <div key={i} className="h-1" />;
              } else {
                return <p key={i}>{line}</p>;
              }
            })}
          </div>
        </div>
      )}

      {/* Error state */}
      {errorState && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-3 text-xs text-slate-300">
          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <span className="font-bold text-rose-400 block uppercase tracking-wider text-[10px]">
              {language === "az" ? "MƏLUMAT" : "INFORMATION"}
            </span>
            <p className="leading-relaxed">{errorState.message}</p>
            {errorState.type === "key_missing" && (
              <div className="bg-slate-950 p-3 rounded border border-slate-800 text-[11px] font-mono space-y-1.5">
                <p className="text-slate-400 font-sans">
                  {language === "az" 
                    ? "Süni intellekt xidmətindən istifadə etmək üçün sol/üst paneldən Secrets menyusundan Gemini API açarını təyin edin:" 
                    : "To connect Gemini AI, specify your GEMINI_API_KEY in the Secrets panel inside the developer interface:"}
                </p>
                <code className="text-amber-400 block">GEMINI_API_KEY = "Sizin_Açarnız"</code>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
