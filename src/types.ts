export interface HostingProvider {
  id: string;
  name: string;
  type: "shared" | "static" | "cloud" | "container";
  diskSpace: string;
  bandwidth: string;
  ftpSupport: boolean;
  dbSupport: string; // e.g. "MySQL", "None", "Postgres"
  customDomainSupport: boolean;
  rating: number; // 1-5
  pros: string[];
  cons: string[];
  signUpUrl: string;
  isPopular: boolean;
  tutorialAz: string;
  tutorialEn: string;
  features: string[];
}

export interface DomainProvider {
  id: string;
  name: string;
  extension: string;
  cost: string; // "Ödənişsiz / Free"
  requirements: string;
  duration: string;
  dnsControl: boolean;
  stepsAz: string[];
  stepsEn: string[];
  url: string;
}

export interface FtpLogLine {
  id: string;
  type: "info" | "command" | "response" | "error";
  text: string;
  timestamp: string;
}

export interface SimulatedFile {
  name: string;
  path: string;
  content?: string;
  isDirectory: boolean;
  size?: string;
  lastModified?: string;
}

export interface FtpConnectionState {
  host: string;
  user: string;
  pass: string;
  port: string;
  isConnected: boolean;
  isConnecting: boolean;
}
