import React, { useState } from "react";
import { 
  Server, Globe, Terminal, HelpCircle, ArrowRight, ShieldCheck, 
  Cpu, Heart, Sparkles, Network, Layers, Code2, AlertTriangle, BookOpen, Key
} from "lucide-react";
import FileZillaSimulator from "./components/FileZillaSimulator";
import HostDirectory from "./components/HostDirectory";
import AiRecommender from "./components/AiRecommender";

export default function App() {
  const [language, setLanguage] = useState<"az" | "en">("az");
  const [activeView, setActiveView] = useState<"simulator" | "directory" | "ai">("simulator");
  const [showHelpModal, setShowHelpModal] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans flex flex-col justify-between">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-white via-zinc-200 to-zinc-400 rounded flex items-center justify-center text-zinc-950 font-black text-sm shadow-md shadow-zinc-400/20 border border-white/40">
              JM
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-1.5">
                JOZEF MEMMEDOFF
                <span className="text-[9px] bg-zinc-800 text-zinc-200 font-mono px-1.5 py-0.5 rounded font-black border border-zinc-700">
                  PLATINUM CLOUD
                </span>
              </h1>
              <p className="text-[10px] text-zinc-400 font-medium">
                {language === "az" 
                  ? "FileZilla FTP, Ödənişsiz Premium Hostinq və Pulsuz Domen Portalı" 
                  : "FileZilla FTP, Free Premium Web Hosting & Free Domains Directory"}
              </p>
            </div>
          </div>

          {/* Nav & Language Control */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* PyCharm & Help quick pill */}
            <button 
              onClick={() => setShowHelpModal(true)}
              className="text-[10px] border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded text-zinc-300 font-semibold flex items-center gap-1.5 transition-all"
            >
              <BookOpen className="h-3 w-3 text-zinc-400" />
              <span>{language === "az" ? "Kömək & Təlimat (PyCharm / Şifrə)" : "Help & Guide (PyCharm / Pass)"}</span>
            </button>

            {/* Lang Button */}
            <div className="bg-zinc-950 border border-zinc-800 rounded p-0.5 flex">
              <button
                onClick={() => setLanguage("az")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all ${
                  language === "az" ? "bg-zinc-100 text-zinc-950 font-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                AZ
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all ${
                  language === "en" ? "bg-zinc-100 text-zinc-950 font-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* GitHub Student / Info quick pill */}
            <a 
              href="https://education.github.com/pack" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[10px] border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded text-zinc-400 hover:text-zinc-200 font-semibold flex items-center gap-1 transition-all"
            >
              <ShieldCheck className="h-3 w-3 text-zinc-400" />
              <span>{language === "az" ? "Tələbə Paketi" : "Student Pack"}</span>
            </a>
          </div>

        </div>
      </header>

      {/* Hero Intro Banner */}
      <section className="bg-gradient-to-b from-zinc-900 to-zinc-950/40 border-b border-zinc-900 px-4 py-8 sm:py-12 shrink-0 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-500/5 blur-3xl rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/80 px-4 py-1.5 rounded-full text-xs text-zinc-200 font-semibold shadow-lg">
            <Layers className="h-3.5 w-3.5 text-zinc-400" />
            {language === "az" 
              ? "Jozef Memmedoff tərəfindən idarə olunan Platinum portal" 
              : "Platinum portal curated by Jozef Memmedoff"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none max-w-3xl mx-auto bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent uppercase">
            {language === "az" 
              ? "Professional Pulsuz Hostinqlər və FileZilla Təlimatı"
              : "Professional Free Cloud Hosts & FileZilla Masterclass"}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {language === "az" 
              ? "Saytını internetdə tam pulsuz yaymaq üçün heç bir ödəniş etmək lazım deyil! Burada ən yaxşı hostları seçin, FileZilla ilə faylları serverə yükləyin və süni intellektdən məsləhət alın."
              : "Discover how to deploy real dynamic & static websites at absolutely zero cost. Learn FileZilla connection steps, check server connectivity, and map free .eu.org or .pp.ua custom domains."}
          </p>

          {/* Tab Selection */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveView("simulator")}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-all ${
                activeView === "simulator"
                  ? "bg-gradient-to-br from-white via-zinc-100 to-zinc-300 border-zinc-200 text-zinc-950 shadow-lg shadow-zinc-500/10 font-extrabold"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" />
                {language === "az" ? "FileZilla Simulyatoru" : "FileZilla Simulator"}
              </span>
            </button>

            <button
              onClick={() => setActiveView("directory")}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-all ${
                activeView === "directory"
                  ? "bg-gradient-to-br from-white via-zinc-100 to-zinc-300 border-zinc-200 text-zinc-950 shadow-lg shadow-zinc-500/10 font-extrabold"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5" />
                {language === "az" ? "Host & Domen Kataloqu" : "Host & Domain Directory"}
              </span>
            </button>

            <button
              onClick={() => setActiveView("ai")}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-all ${
                activeView === "ai"
                  ? "bg-gradient-to-br from-white via-zinc-100 to-zinc-300 border-zinc-200 text-zinc-950 shadow-lg shadow-zinc-500/10 font-extrabold"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {language === "az" ? "AI Seçim Köməkçisi" : "AI Hosting Assistant"}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Direct FAQ Tips Overlay Banner */}
      {showHelpModal && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="bg-zinc-900/90 border-2 border-zinc-700/80 rounded-xl p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-3 right-3">
              <button 
                onClick={() => setShowHelpModal(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs px-2.5 py-1 rounded border border-zinc-700 font-bold font-mono"
              >
                [ X ]
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-zinc-800 p-2.5 rounded-lg border border-zinc-700 shrink-0 hidden sm:block">
                <HelpCircle className="h-6 w-6 text-zinc-200" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white text-sm font-extrabold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zinc-300 animate-ping"></span>
                    {language === "az" ? "Mühüm Suallara Cavablar (PyCharm, Canlıda Yerləşdirmə, Admin Panel)" : "Important Guide Answers (PyCharm, Deploying Live, Admin Password)"}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {language === "az" 
                      ? "Layihəni öz kompüterinizdə idarə etmək və canlı serverdə yayımlamaq barədə rəhbər:" 
                      : "Guide on how to manage this project locally and deploy your website to production live:"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                  {/* PyCharm explanation */}
                  <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 space-y-1.5">
                    <h4 className="font-bold text-zinc-100 flex items-center gap-1.5 uppercase text-[11px] tracking-wide border-b border-zinc-800 pb-1.5">
                      <Terminal className="h-3.5 w-3.5 text-zinc-300" />
                      {language === "az" ? "1. PyCharm ilə necə işlətməli?" : "1. How to run with PyCharm?"}
                    </h4>
                    <p className="text-zinc-400 leading-normal">
                      {language === "az"
                        ? "Layihəni kompüterinizə endirin. PyCharm-da açın. Aşağıdakı terminalı açıb sırası ilə bu əmrləri yazın:"
                        : "Download the project files. Open in PyCharm. Run these commands inside PyCharm terminal in order:"}
                    </p>
                    <code className="block bg-zinc-900 p-2 rounded text-[10px] text-zinc-200 font-mono space-y-1">
                      <div>npm install</div>
                      <div>npm run dev</div>
                    </code>
                    <p className="text-[10px] text-zinc-500">
                      {language === "az" ? "Sayt dərhal http://localhost:3000 ünvanında açılacaq." : "The site will load at http://localhost:3000."}
                    </p>
                  </div>

                  {/* Where to host online */}
                  <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 space-y-1.5">
                    <h4 className="font-bold text-zinc-100 flex items-center gap-1.5 uppercase text-[11px] tracking-wide border-b border-zinc-800 pb-1.5">
                      <Globe className="h-3.5 w-3.5 text-zinc-300" />
                      {language === "az" ? "2. Saytı harada online edə bilərəm?" : "2. Where to host online?"}
                    </h4>
                    <p className="text-zinc-400 leading-normal">
                      {language === "az"
                        ? "Saytınızı internetdə canlı yayımlamaq üçün 'Host & Domen Kataloqu' tabına keçin. InfinityFree (PHP/Dinamik üçün) və ya Vercel (Statik layihələr üçün) tamamilə pulsuzdur."
                        : "To host online for free, use our 'Host & Domain Directory' tab. Sign up on InfinityFree (PHP/Database) or Vercel (Static builds) at zero cost."}
                    </p>
                    <p className="text-[10px] text-zinc-500 leading-normal">
                      {language === "az"
                        ? "Domen üçün nic.eu.org qeydiyyatdan keçərək pulsuz domen ala və Cloudflare DNS ilə qoşa bilərsiniz."
                        : "For domain names, use nic.eu.org for lifetime free subdomains and map them using Cloudflare free DNS."}
                    </p>
                  </div>

                  {/* Admin panel password */}
                  <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 space-y-1.5">
                    <h4 className="font-bold text-zinc-100 flex items-center gap-1.5 uppercase text-[11px] tracking-wide border-b border-zinc-800 pb-1.5">
                      <Key className="h-3.5 w-3.5 text-zinc-300" />
                      {language === "az" ? "3. Admin Panel və Şifrə Problemi" : "3. Admin Panel Password Problem"}
                    </h4>
                    <p className="text-zinc-400 leading-normal">
                      {language === "az"
                        ? "Bu platforma öyrədici FileZilla FTP simulyatorudur! Həqiqi bir verilənlər bazası və ya qorunan admin paneli yoxdur."
                        : "This platform is an interactive FileZilla learning simulator! It is completely offline/mocked with no database."}
                    </p>
                    <p className="text-[11px] font-semibold text-zinc-200">
                      {language === "az"
                        ? "Simulyatorda istənilən istifadəçi adı / şifrə ilə daxil olub 'Quick Connect' basa bilərsiniz."
                        : "In the simulator, you can enter any username / password and click 'Quick Connect' immediately."}
                    </p>
                    <p className="text-[10px] text-zinc-500 leading-normal">
                      {language === "az"
                        ? "Real hostinq açmısınızsa, şifrənizi qeydiyyatdan keçdiyiniz InfinityFree / AwardSpace müştəri panelində (FTP Details bölməsində) tapa bilərsiniz!"
                        : "If you registered a real free host, you will find your FTP host, user, and password inside your InfinityFree or AwardSpace client panel."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {activeView === "simulator" && (
          <div className="space-y-6">
            <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-white text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-300 animate-ping"></span>
                  {language === "az" ? "FileZilla FTP Interaktiv Təlim Simulyatoru" : "FileZilla FTP Interactive Learning Simulator"}
                </h3>
                <p className="text-xs text-zinc-400 leading-normal">
                  {language === "az"
                    ? "Faylları redaktə edin, serverə qoşulun, faylları yükləyin və saytın canlı preview ilə dərhal necə yayımlandığını virtual olaraq təcrübə edin!"
                    : "Edit local files, connect virtual FTP server, upload code, and instantly witness how a website goes live with our mock-hosted preview!"
                  }
                </p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800/80 p-2.5 rounded text-[11px] text-zinc-400 font-mono flex items-center gap-2">
                <Code2 className="h-4 w-4 text-zinc-400" />
                <span>Local FTP client: SFTP/FTP Active Mode</span>
              </div>
            </div>

            <FileZillaSimulator language={language} />
          </div>
        )}

        {activeView === "directory" && (
          <div className="space-y-6">
            <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/30">
              <h3 className="text-white text-sm font-bold uppercase tracking-wide mb-1 flex items-center gap-2">
                <Globe className="h-4 w-4 text-zinc-300" />
                {language === "az" ? "Pulsuz Provayderlərin Müqayisə Paneli" : "Free Web Hosting & Domains Comparison Panel"}
              </h3>
              <p className="text-xs text-zinc-400">
                {language === "az"
                  ? "Sıfır dollar xərcləyərək 24/7 dayanıqlı, FTP, MySQL və ya Static CDN daxil olan ən yaxşı platformaları müqayisə edin və dərhal qeydiyyatdan keçin."
                  : "Explore handpicked free web hosts offering standard FTP, PHP, databases, or modern continuous deploy features for absolute 0 USD cost."
                }
              </p>
            </div>

            <HostDirectory language={language} />
          </div>
        )}

        {activeView === "ai" && (
          <div className="space-y-6">
            <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/30">
              <h3 className="text-white text-sm font-bold uppercase tracking-wide mb-1 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-zinc-300" />
                {language === "az" ? "Gemini Süni İntellekt Seçim Köməkçisi" : "Gemini AI Hosting Selection Assistant"}
              </h3>
              <p className="text-xs text-zinc-400">
                {language === "az"
                  ? "Sizin layihə üçün ən uyğun pulsuz hostinq, pulsuz domen, SSL qurulması və dərhal FileZilla konfiqurasiya yollarını Gemini generativ süni intellektindən dərhal soruşun."
                  : "Input your tech stack (NodeJS, PHP, Angular, React, WordPress) and Gemini AI will propose setup paths, free domains, and credentials guide."
                }
              </p>
            </div>

            <AiRecommender language={language} />
          </div>
        )}
      </main>

      {/* Info Boxes / Free Hosting FAQ */}
      <section className="bg-zinc-900/30 border-t border-zinc-900/80 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-zinc-950/40 border border-zinc-900 p-5 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
              <Network className="h-4 w-4 text-zinc-400" />
              {language === "az" ? "Həqiqi Pulsuz Domen Necə Alınır?" : "How to acquire free custom domains?"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {language === "az"
                ? "nic.eu.org vasitəsilə tamamilə ödənişsiz .eu.org sonluqlu domen və ya nic.ua tərəfdaşları ilə .pp.ua domeni ala bilərsiniz. Onları Cloudflare DNS üzərindən pulsuz hostinqlərinizə yönləndirmək mümkündür."
                : "You can acquire lifetime free subdomains through nic.eu.org (.eu.org) or pp.ua using telegram verification. Set Cloudflare free DNS nameservers to map them with your web hosting provider."
              }
            </p>
          </div>

          <div className="bg-zinc-950/40 border border-zinc-900 p-5 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="h-4 w-4 text-zinc-400" />
              {language === "az" ? "FileZilla Şifrəmi Haradan Alım?" : "Where do I get my FileZilla password?"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {language === "az"
                ? "Siz InfinityFree, AwardSpace və ya Freehostia-da qeydiyyatdan keçdikdən sonra müştəri panelinə daxil olmalısınız. 'FTP Details' və ya 'FTP Accounts' bölməsindən host, port (21/22), istifadəçi adı və şifrənizi kopyalaya bilərsiniz."
                : "Register a free account on InfinityFree, AwardSpace, or Freehostia. Inside their respective cPanels, open 'FTP Details' to fetch host, username, and FTP password to connect with FileZilla."
              }
            </p>
          </div>

          <div className="bg-zinc-950/40 border border-zinc-900 p-5 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-zinc-400" />
              {language === "az" ? "SSL Sertifikatı (HTTPS) Pulsuzdur?" : "Is SSL Certificate (HTTPS) free?"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {language === "az"
                ? "Bəli! Çox pulsuz hostinq avtomatik olaraq 'Let's Encrypt' SSL sertifikatı təqdim edir. Həmçinin Cloudflare pulsuz planına qoşularaq 'Flexible' SSL-i aktiv edib saytınızı tam təhlükəsiz edə bilərsiniz."
                : "Yes! Most free hosts automatically integrate 'Let's Encrypt' certificates. Alternatively, route your free domain through Cloudflare's free tier and activate 'Flexible' SSL for secure HTTPS connection."
              }
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-6 px-4 shrink-0 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-zinc-400 font-bold">
            © 2026 JOZEF MEMMEDOFF • CLOUD & FTP PLATINUM
          </p>
          <p className="flex items-center gap-1 text-zinc-400">
            <span>{language === "az" ? "Bütün hüquqlar qorunur — Jozef Memmedoff tərəfindən" : "All rights reserved by Jozef Memmedoff"}</span>
            <Heart className="h-3.5 w-3.5 text-zinc-300 fill-zinc-300" />
            <span>&</span>
            <Cpu className="h-3.5 w-3.5 text-zinc-300 animate-pulse" />
          </p>
        </div>
      </footer>

    </div>
  );
}
