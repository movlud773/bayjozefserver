import { HostingProvider, DomainProvider, SimulatedFile } from "./types";

export const HOSTING_PROVIDERS: HostingProvider[] = [
  {
    id: "infinityfree",
    name: "InfinityFree",
    type: "shared",
    diskSpace: "Sınırsız / Unlimited",
    bandwidth: "Sınırsız / Unlimited (50,000 daily hits)",
    ftpSupport: true,
    dbSupport: "MySQL (400 DBs)",
    customDomainSupport: true,
    rating: 4.8,
    isPopular: true,
    pros: [
      "Tamamilə pulsuzdur, gizli ödəniş yoxdur",
      "Sınırsız disk sahəsi və ötürmə zolağı",
      "Tam FTP və cPanel (VistaPanel) dəstəyi",
      "Pulsuz SSL sertifikatları",
    ],
    cons: [
      "E-poçt göndərmə xidməti yoxdur",
      "Böyük Node.js/Python layihələri dəstəklənmir (yalnız PHP/HTML)",
      "Gündəlik 50,000 baxış limiti var",
    ],
    signUpUrl: "https://infinityfree.com",
    features: ["PHP 8.2", "MySQL", "FTP", "Free SSL", "Custom Domains", "Softaculous installer"],
    tutorialAz: "InfinityFree-də qeydiyyatdan keçin. Yeni hesab yaradın və 'FTP Details' bölməsindən Host (məs. ftpupload.net), İstifadəçi adı və Şifrənizi kopyalayın. FileZilla-da bu məlumatları daxil edərək htdocs qovluğuna fayllarınızı yükləyin.",
    tutorialEn: "Register on InfinityFree. Create a hosting account, then copy Host (e.g. ftpupload.net), Username, and Password from 'FTP Details'. Paste them into FileZilla and upload your files inside the htdocs folder."
  },
  {
    id: "github-pages",
    name: "GitHub Pages",
    type: "static",
    diskSpace: "1 GB",
    bandwidth: "100 GB / ay",
    ftpSupport: false,
    dbSupport: "None (Statik)",
    customDomainSupport: true,
    rating: 4.9,
    isPopular: true,
    pros: [
      "Ultra-sürətli CDN və mükəmməl dayanıqlıq",
      "GitHub repozitoriyaları ilə birbaşa inteqrasiya",
      "Limitsiz pulsuz saytlar (hər repoya bir dənə)",
      "Reklamsız və tamamilə təmiz interfeys",
    ],
    cons: [
      "PHP və ya dinamik backend dəstəkləmir",
      "Məlumat bazası (Database) yoxdur",
      "FTP dəstəyi yoxdur (Yalnız Git ilə yüklənir)",
    ],
    signUpUrl: "https://pages.github.com",
    features: ["HTML/CSS/JS", "Jekyll", "Custom Domains", "Free HTTPS", "Git integration"],
    tutorialAz: "GitHub hesabı açın. 'istifadeciadi.github.io' adında repozitoriya yaradın. index.html faylınızı yükləyin. Parametrlər (Settings) bölməsindən Pages menyusuna keçib saytınızı aktiv edin.",
    tutorialEn: "Open a GitHub account. Create a repository named 'username.github.io'. Upload your index.html file. Go to Settings > Pages to activate your site instantly."
  },
  {
    id: "vercel",
    name: "Vercel",
    type: "static",
    diskSpace: "Hobby limits",
    bandwidth: "100 GB / ay",
    ftpSupport: false,
    dbSupport: "Serverless (Postgres/KV/Blob)",
    customDomainSupport: true,
    rating: 4.9,
    isPopular: true,
    pros: [
      "React, Next.js, Vue, Vite layihələri üçün ən yaxşı host",
      "Avtomatik SSL və serverless funksiyalar",
      "Git 'push' zamanı saytın dərhal yenilənməsi",
    ],
    cons: [
      "FTP mövcud deyil",
      "Gündəlik serverless çalışma limiti var",
    ],
    signUpUrl: "https://vercel.com",
    features: ["Next.js", "Serverless API", "Vite", "Edge Networks", "Auto-SSL"],
    tutorialAz: "Layihənizi GitHub-a yükləyin. Vercel hesabı yaradın və GitHub ilə daxil olun. Repozitoriyanı seçərək 'Deploy' düyməsinə basın. Saytınız saniyələr içində hazır olacaq.",
    tutorialEn: "Upload your project to GitHub. Log in to Vercel via GitHub. Import your repository and click 'Deploy'. Your site will be online in seconds."
  },
  {
    id: "awardspace",
    name: "AwardSpace",
    type: "shared",
    diskSpace: "1 GB",
    bandwidth: "5 GB / ay",
    ftpSupport: true,
    dbSupport: "MySQL (1 DB)",
    customDomainSupport: true,
    rating: 4.2,
    isPopular: false,
    pros: [
      "1 Pulsuz Subdomain daxildir",
      "Zeta cPanel idarəetmə paneli",
      "PHP və MySQL dəstəyi",
      "Reklamsız pulsuz plan",
    ],
    cons: [
      "Yalnız 1 məlumat bazası yaradıla bilər",
      "Bandwidth limiti azdır (aylıq 5 GB)",
    ],
    signUpUrl: "https://www.awardspace.com",
    features: ["PHP", "MySQL", "FTP", "Email Account", "Joomla/WordPress Installer"],
    tutorialAz: "AwardSpace hesabı açın. 'Hosting Manager' bölməsindən pulsuz alt-domen (subdomain) seçin. FTP bölməsindən istifadəçi məlumatlarını götürərək FileZilla ilə faylları serverə yükləyin.",
    tutorialEn: "Create an AwardSpace account. Choose a free subdomain in 'Hosting Manager'. Go to 'FTP Manager' to grab connection details, and use FileZilla to upload files."
  },
  {
    id: "freehostia",
    name: "Freehostia (Chocolate Plan)",
    type: "shared",
    diskSpace: "250 MB",
    bandwidth: "6 GB / ay",
    ftpSupport: true,
    dbSupport: "MySQL (1 DB, 10MB limit)",
    customDomainSupport: true,
    rating: 4.1,
    isPopular: false,
    pros: [
      "100% pulsuz, reklam yerləşdirilmir",
      "3 pulsuz e-poçt hesabı yaradılması",
      "Möhtəşəm 24/7 dəstək bileti xidməti",
    ],
    cons: [
      "Disk sahəsi olduqca azdır (250 MB)",
      "Verilənlər bazası limiti çox kiçikdir (10 MB)",
    ],
    signUpUrl: "https://freehostia.com",
    features: ["PHP 8", "MySQL", "FTP", "3 Email Accounts", "1-Click App Installer"],
    tutorialAz: "Freehostia-da Chocolate planına üzv olun. cPanel-ə daxil olaraq Domen menecerində domen qeyd edin. FTP idarəetməsindən aldığınız IP və istifadəçi adını FileZilla-ya yazıb qoşulun.",
    tutorialEn: "Sign up for Freehostia Chocolate Plan. Use cPanel to create a subdomain. Find FTP details in cPanel, enter them into FileZilla to manage your space."
  },
  {
    id: "oracle-cloud",
    name: "Oracle Cloud Always Free",
    type: "cloud",
    diskSpace: "200 GB (Block Storage)",
    bandwidth: "10 TB / ay",
    ftpSupport: true,
    dbSupport: "Tam sərbəst (MySQL, Postgres, SQL Server quraşdıra bilərsiniz)",
    customDomainSupport: true,
    rating: 4.7,
    isPopular: false,
    pros: [
      "4 nüvəli ARM Prosessor və 24 GB RAM imkanı!",
      "Həqiqi bulud server (VPS) üstünlüyü",
      "Nəhəng 200 GB pulsuz disk sahəsi",
    ],
    cons: [
      "Qeydiyyat zamanı kredit/debet kartı tələb olunur (0.00 USD ödənişsiz yoxlama)",
      "İdarə edilməsi Linux və şəbəkə bilikləri tələb edir",
    ],
    signUpUrl: "https://www.oracle.com/cloud/free/",
    features: ["Ubuntu/Oracle Linux VPS", "4 ARM Cores / 24GB RAM", "Full Root Access", "10 TB Traffic"],
    tutorialAz: "Oracle Cloud Always Free qeydiyyatını tamamlayın. 'Compute Instance' yaradın (Ubuntu seçin). SSH və ya SFTP (Port 22) vasitəsilə FileZilla ilə serverə qoşularaq saytınızı yerləşdirin.",
    tutorialEn: "Complete Oracle Cloud Always Free registration. Create an Ubuntu Compute Instance. Connect via SFTP (Port 22) in FileZilla using your SSH private key to deploy."
  }
];

export const DOMAIN_PROVIDERS: DomainProvider[] = [
  {
    id: "eu-org",
    name: "EU.org",
    extension: ".eu.org (Həqiqi Pulsuz Domen)",
    cost: "Həmişə pulsuz / Free Forever",
    requirements: "Qeydiyyat formu doldurmaq (Təsdiqlənmə 2 gün - 2 həftə çəkə bilər)",
    duration: "Ömürlük / Lifetime",
    dnsControl: true,
    stepsAz: [
      "nic.eu.org saytına daxil olub hesab yaradın.",
      "'New Domain' düyməsinə klikləyin.",
      "İstədiyiniz domeni (məsələn: saytim.eu.org) daxil edin.",
      "Pulsuz DNS (Cloudflare) Nameserver-lərini (məsələn: ns1.cloudflare.com, ns2.cloudflare.com) yazın.",
      "Müraciətinizin təsdiqlənməsini gözləyin. Tamamilə pulsuz ömürlük domeniniz aktiv olacaq!",
    ],
    stepsEn: [
      "Go to nic.eu.org and register a user handle.",
      "Click on 'New Domain' to request a new subdomain.",
      "Input your desired domain (e.g., mysite.eu.org).",
      "Enter DNS Nameservers from a free DNS provider like Cloudflare (e.g., ns1.cloudflare.com, ns2.cloudflare.com).",
      "Wait for manual approval. Once approved, you have a completely free lifetime domain!"
    ],
    url: "https://nic.eu.org"
  },
  {
    id: "pp-ua",
    name: "PP.UA",
    extension: ".pp.ua (Ukrayna Pulsuz Domeni)",
    cost: "Pulsuz / Free",
    requirements: "SMS və ya Telegram vasitəsilə mobil nömrə təsdiqlənməsi",
    duration: "1 il (Hər il pulsuz yenilənir)",
    dnsControl: true,
    stepsAz: [
      "Nic.ua və ya pp.ua qeydiyyat tərəfdaşlarından birinə daxil olun.",
      "Arzuladığınız domeni (.pp.ua sonluğu ilə) axtarın və səbətə əlavə edin (qiyməti 0 AZN olacaq).",
      "Sifarişi tamamladıqdan sonra pp.ua saytından Telegram botuna yönləndiriləcəksiniz.",
      "Telegram botuna daxil olaraq telefon nömrənizi təsdiqləyin və domeni aktivləşdirin.",
      "Domeninizi pulsuz Cloudflare və ya hostinq DNS NS parametrlərinə yönləndirin.",
    ],
    stepsEn: [
      "Go to nic.ua or any other registrar that supports PP.UA.",
      "Search for your desired domain with '.pp.ua' extension and checkout for free.",
      "You will receive an activation request link or a Telegram bot command.",
      "Connect with the Telegram bot using your phone number to authorize domain creation.",
      "Point your domain to your hosting nameservers or Cloudflare free DNS."
    ],
    url: "https://nic.ua"
  },
  {
    id: "duckdns",
    name: "DuckDNS",
    extension: ".duckdns.org (Dinamik DNS)",
    cost: "Həmişə pulsuz / Free Forever",
    requirements: "Google, GitHub və ya Twitter ilə daxil olmaq",
    duration: "Limitsiz / Unlimited",
    dnsControl: false,
    stepsAz: [
      "duckdns.org saytına daxil olun və sosial hesabınızla daxil olun.",
      "Alt-domen (subdomain) sahəsinə istədiyiniz adı yazıb 'Add domain' düyməsini sıxın.",
      "Domenin qarşısındakı IP ünvanını öz serverinizin və ya hostinqinizin İP ünvanı ilə əvəz edin.",
      "Ev serverləri, Routerlər və ya VPS üçün ən sürətli DNS yönləndirmə sistemidir.",
    ],
    stepsEn: [
      "Go to duckdns.org and log in with Google, GitHub, or Twitter.",
      "Input your preferred subdomain and click 'Add domain'.",
      "Set your current IP address (or VPS IP) in the domain row.",
      "Excellent choice for direct home hosting, dynamic VPS setups, and small server testing."
    ],
    url: "https://www.duckdns.org"
  },
  {
    id: "github-student-pack",
    name: "GitHub Student Developer Pack",
    extension: ".me, .tech, .live (1 illik Tam Pulsuz Domenlər)",
    cost: "1 il Pulsuz / 1 Year Free",
    requirements: "Tələbə olduğunuzu təsdiqləyən e-poçt (.edu) və ya tələbə bileti",
    duration: "1 il (Sonra standart qiymət)",
    dnsControl: true,
    stepsAz: [
      "education.github.com saytına daxil olub Tələbə Paketini aktivləşdirin.",
      "Tələbə statusunuz təsdiqləndikdən sonra 'Benefits' bölməsinə keçin.",
      "Namecheap (1 il pulsuz .me domen + SSL) və ya Name.com (1 il pulsuz .tech domen) partnyorluğundan istifadə edin.",
      "Kodu kopyalayın və müvafiq saytlarda domeni tamamilə pulsuz qeydiyyatdan keçirin.",
    ],
    stepsEn: [
      "Apply for the GitHub Student Developer Pack on education.github.com.",
      "Once approved, explore your dashboard benefits.",
      "Claim a free 1-year .me domain from Namecheap (with SSL) or a free .tech domain from Name.com.",
      "Use the promo code provided at checkout to register your custom professional domain for 0 USD."
    ],
    url: "https://education.github.com/pack"
  }
];

export const SIMULATED_FILES_TEMPLATES: SimulatedFile[] = [
  {
    name: "htdocs",
    path: "/",
    isDirectory: true,
  },
  {
    name: "index.html",
    path: "/htdocs",
    isDirectory: false,
    size: "1.2 KB",
    lastModified: "Yenicə / Just now",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mənim Pulsuz Saytım / My Free Website</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            color: #f1f5f9;
            min-height: 100vh;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        .container {
            max-width: 600px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        h1 {
            color: #38bdf8;
            margin-bottom: 10px;
            font-size: 2.5rem;
        }
        p {
            color: #94a3b8;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        .success-badge {
            background-color: #22c55e;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
            display: inline-block;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }
        .footer {
            margin-top: 30px;
            font-size: 0.8rem;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success-badge">🚀 Saytınız Uğurla Yükləndi! / Uploaded Successfully!</div>
        <h1>Xoş Gəlmisiniz!</h1>
        <p>Təbriklər! Bu sayt virtual FileZilla client tərəfindən htdocs qovluğuna yüklənmiş və canlı olaraq yayımlanmışdır.</p>
        <p>Sol tərəfdəki kod redaktorundan bu index.html-i dərhal redaktə edib nəticəni görə bilərsiniz!</p>
        <div class="footer">FTP & Free Host Explorer Simulator</div>
    </div>
</body>
</html>`
  },
  {
    name: "style.css",
    path: "/htdocs",
    isDirectory: false,
    size: "340 B",
    lastModified: "Yenicə / Just now",
    content: `/* Bu stil faylı xüsusi olaraq index.html üçün nəzərdə tutulub */
body {
    transition: all 0.3s ease;
}
h1:hover {
    transform: scale(1.05);
    text-shadow: 0 0 10px #38bdf8;
}`
  },
  {
    name: "assets",
    path: "/htdocs",
    isDirectory: true,
  },
  {
    name: "config.json",
    path: "/htdocs/assets",
    isDirectory: false,
    size: "120 B",
    lastModified: "Dünən / Yesterday",
    content: `{
  "appName": "Free FTP App",
  "theme": "dark",
  "version": "1.0.0"
}`
  }
];
