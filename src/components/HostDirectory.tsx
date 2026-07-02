import React, { useState } from "react";
import { HOSTING_PROVIDERS, DOMAIN_PROVIDERS } from "../data";
import { HostingProvider, DomainProvider } from "../types";
import { 
  Search, Shield, Server, Globe, CheckCircle, AlertTriangle, 
  ChevronRight, ExternalLink, Star, ListFilter, HelpCircle, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HostDirectoryProps {
  language: "az" | "en";
}

export default function HostDirectory({ language }: HostDirectoryProps) {
  const [activeTab, setActiveTab] = useState<"hosting" | "domains">("hosting");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);

  const filteredHosting = HOSTING_PROVIDERS.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "all" || provider.type === selectedType;
    return matchesSearch && matchesType;
  });

  const filteredDomains = DOMAIN_PROVIDERS.filter((provider) => {
    return provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.extension.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleProviderClick = (id: string) => {
    setSelectedProviderId(selectedProviderId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/40 p-1.5 rounded-xl border border-zinc-800">
        <div className="flex w-full sm:w-auto p-1 bg-zinc-950/60 rounded-lg">
          <button
            onClick={() => { setActiveTab("hosting"); setSelectedProviderId(null); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === "hosting"
                ? "bg-gradient-to-br from-white via-zinc-200 to-zinc-400 text-zinc-950 font-bold shadow-lg shadow-zinc-500/20"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Server className="h-4 w-4" />
            {language === "az" ? "Pulsuz Hostinqlər" : "Free Web Hosting"}
          </button>
          <button
            onClick={() => { setActiveTab("domains"); setSelectedProviderId(null); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === "domains"
                ? "bg-gradient-to-br from-white via-zinc-200 to-zinc-400 text-zinc-950 font-bold shadow-lg shadow-zinc-500/20"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Globe className="h-4 w-4" />
            {language === "az" ? "Pulsuz Domenlər" : "Free Domains"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder={
              language === "az" 
                ? "Axtarış (ad və ya xüsusiyyət)..." 
                : "Search (name or features)..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {activeTab === "hosting" && (
        <div className="space-y-6">
          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1.5 mr-2">
              <ListFilter className="h-3 w-3" />
              {language === "az" ? "Növə görə süzgəc:" : "Filter by type:"}
            </span>
            {[
              { id: "all", labelAz: "Hamısı", labelEn: "All" },
              { id: "shared", labelAz: "Shared (PHP/MySQL)", labelEn: "Shared (PHP/MySQL)" },
              { id: "static", labelAz: "Statik (React/HTML)", labelEn: "Static (React/HTML)" },
              { id: "cloud", labelAz: "Bulud / Cloud VPS", labelEn: "Cloud VPS" }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedType(filter.id)}
                className={`px-3 py-1.5 rounded-full border transition-all ${
                  selectedType === filter.id
                    ? "bg-zinc-800 border-zinc-300 text-white font-bold"
                    : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                {language === "az" ? filter.labelAz : filter.labelEn}
              </button>
            ))}
          </div>

          {/* Hosting Provider Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHosting.map((provider) => {
              const isExpanded = selectedProviderId === provider.id;
              return (
                <motion.div
                  key={provider.id}
                  layout
                  className={`bg-zinc-900/60 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    isExpanded 
                      ? "border-zinc-500 shadow-xl shadow-zinc-500/10 ring-1 ring-zinc-500/20 md:col-span-2 lg:col-span-3" 
                      : "border-zinc-800 hover:border-zinc-700/80 hover:bg-zinc-800/20"
                  }`}
                >
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-100">{provider.name}</h3>
                          {provider.isPopular && (
                            <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
                              {language === "az" ? "Populyar" : "Popular"}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-zinc-300 font-bold uppercase tracking-wider">
                          {provider.type === "shared" ? "Shared Web Hosting" : provider.type === "static" ? "Static CDN Hosting" : "Cloud Instance"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-lg">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-200">{provider.rating}</span>
                      </div>
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-3 bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/60 text-xs">
                      <div>
                        <span className="text-slate-500 block mb-0.5">{language === "az" ? "Disk Sahəsi:" : "Disk Space:"}</span>
                        <span className="text-slate-200 font-semibold">{provider.diskSpace}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">{language === "az" ? "Ötürmə (Bandwidth):" : "Bandwidth:"}</span>
                        <span className="text-slate-200 font-semibold max-w-full truncate block">{provider.bandwidth}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">{language === "az" ? "FTP / SFTP:" : "FTP / SFTP:"}</span>
                        <span className={`font-semibold flex items-center gap-1 ${provider.ftpSupport ? "text-emerald-400" : "text-rose-400"}`}>
                          {provider.ftpSupport ? "Var / Active" : "Yoxdur / No"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">{language === "az" ? "Məlumat Bazası (DB):" : "Database (DB):"}</span>
                        <span className="text-slate-200 font-semibold">{provider.dbSupport}</span>
                      </div>
                    </div>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {provider.features.map((feature, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded-md border border-slate-700/40 font-mono">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Expanded Detail Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 border-t border-slate-800/80 space-y-6 overflow-hidden"
                        >
                          {/* Pros & Cons */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2.5">
                              <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                {language === "az" ? "Müsbət tərəfləri (Pros)" : "Advantages (Pros)"}
                              </h4>
                              <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
                                {provider.pros.map((pro, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-500 mt-0.5">•</span>
                                    <span>{pro}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-2.5">
                              <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                {language === "az" ? "Mənfi tərəfləri (Cons)" : "Disadvantages (Cons)"}
                              </h4>
                              <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
                                {provider.cons.map((con, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-rose-500 mt-0.5">•</span>
                                    <span>{con}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Connection Setup Guide */}
                          <div className="bg-zinc-950/60 p-4 rounded-lg border border-zinc-800 space-y-2">
                            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-widest flex items-center gap-1.5">
                              <HelpCircle className="h-4 w-4" />
                              {language === "az" ? "QURAŞDIRMA VƏ QOŞULMA TƏLİMATI" : "HOW TO CONNECT & DEPLOY"}
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                              {language === "az" ? provider.tutorialAz : provider.tutorialEn}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions Bar */}
                  <div className="bg-slate-950/40 p-4 border-t border-slate-800/60 rounded-b-xl flex items-center justify-between gap-3 text-sm">
                    <button
                      onClick={() => handleProviderClick(provider.id)}
                      className="text-slate-400 hover:text-white font-medium flex items-center gap-1 text-xs"
                    >
                      {isExpanded 
                        ? (language === "az" ? "Gizlə" : "Hide Details")
                        : (language === "az" ? "Təlimatı & Müqayisəni Göstər" : "Show Setup Guide")
                      }
                      <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-90 text-zinc-100" : ""}`} />
                    </button>

                    <a
                      href={provider.signUpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-white via-zinc-200 to-zinc-400 hover:bg-zinc-100 text-zinc-950 font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-200 shadow-md shadow-zinc-500/20"
                    >
                      {language === "az" ? "Sayta keç" : "Visit Site"}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredHosting.length === 0 && (
            <div className="text-center py-12 bg-slate-900/20 rounded-xl border border-slate-800/80">
              <Server className="h-10 w-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">
                {language === "az" ? "Axtarışa uyğun pulsuz hostinq tapılmadı." : "No free hosting found matching your query."}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "domains" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDomains.map((provider) => {
              const isExpanded = selectedProviderId === provider.id;
              return (
                <div
                  key={provider.id}
                  className={`bg-zinc-900/60 rounded-xl border flex flex-col justify-between transition-all duration-300 ${
                    isExpanded 
                      ? "border-zinc-500 shadow-xl shadow-zinc-500/10 ring-1 ring-zinc-500/20 md:col-span-2" 
                      : "border-zinc-800 hover:border-zinc-700/80 hover:bg-zinc-800/20"
                  }`}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-100">{provider.name}</h3>
                        <p className="text-xs text-zinc-300 font-bold font-mono mt-0.5">{provider.extension}</p>
                      </div>
                      <span className="bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                        {provider.cost}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/60 text-xs">
                      <div>
                        <span className="text-slate-500 block mb-0.5">{language === "az" ? "Müddət:" : "Duration:"}</span>
                        <span className="text-slate-200 font-semibold">{provider.duration}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">{language === "az" ? "Tələblər:" : "Requirements:"}</span>
                        <span className="text-slate-200 font-semibold">{provider.requirements}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">{language === "az" ? "DNS İdarəetməsi:" : "Full DNS Control:"}</span>
                        <span className={`font-semibold flex items-center gap-1 ${provider.dnsControl ? "text-emerald-400" : "text-amber-400"}`}>
                          {provider.dnsControl ? (language === "az" ? "Tam dəstəklənir" : "Yes (NS/A/CNAME)") : (language === "az" ? "Yalnız IP yönləndirmə" : "Only IP forwarding")}
                        </span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 border-t border-slate-800/80 space-y-3.5 overflow-hidden"
                        >
                          <h4 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            {language === "az" ? "Addım-addım qeydiyyat təlimatı:" : "Step-by-step registration guide:"}
                          </h4>
                          <div className="space-y-2.5 pl-1.5">
                            {(language === "az" ? provider.stepsAz : provider.stepsEn).map((step, idx) => (
                              <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                                <span className="bg-slate-800 border border-slate-700 text-slate-300 w-5 h-5 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="pt-0.5 leading-relaxed">{step}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="bg-slate-950/40 p-4 border-t border-slate-800/60 rounded-b-xl flex items-center justify-between gap-3 text-sm">
                    <button
                      onClick={() => handleProviderClick(provider.id)}
                      className="text-slate-400 hover:text-white font-medium flex items-center gap-1 text-xs"
                    >
                      {isExpanded 
                        ? (language === "az" ? "Gizlə" : "Hide Guide")
                        : (language === "az" ? "Qeydiyyat Təlimatını Göstər" : "Show Registration Steps")
                      }
                      <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-90 text-zinc-100" : ""}`} />
                    </button>

                    <a
                      href={provider.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-white via-zinc-200 to-zinc-400 hover:bg-zinc-100 text-zinc-950 font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-200 shadow-md shadow-zinc-500/20"
                    >
                      {language === "az" ? "Domeni Al" : "Get Free Domain"}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDomains.length === 0 && (
            <div className="text-center py-12 bg-slate-900/20 rounded-xl border border-slate-800/80">
              <Globe className="h-10 w-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">
                {language === "az" ? "Axtarışa uyğun pulsuz domen provayderi tapılmadı." : "No free domains found matching your query."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
