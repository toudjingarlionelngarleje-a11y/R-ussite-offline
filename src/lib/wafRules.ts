import { SecuritySeverity, SecurityThreatCategory } from '../types';

/**
 * v17.5 — CATALOGUE DE 100 PARE-FEUX (WAF) RÉELLEMENT ARMÉS
 *
 * Chaque pare-feu est adossé à une signature RegExp exécutée côté client
 * (aucun serveur, 100 % hors ligne). Les 100 signatures couvrent 18 familles
 * d'attaques : XSS, SQLi, RCE, traversée de répertoires, pollution de prototype,
 * SSRF/redirections, XXE, LDAP/NoSQL, injection de templates, injection d'en-têtes,
 * JWT, upload malveillant, fuite de secrets, évasion d'encodage, prompt injection IA,
 * bots/scanners, CSRF/clickjacking et désérialisation non sûre.
 */

export type WafFamily =
  | 'xss'
  | 'sqli'
  | 'rce'
  | 'traversal'
  | 'prototype'
  | 'ssrf'
  | 'xxe'
  | 'ldap_nosql'
  | 'ssti'
  | 'header'
  | 'token'
  | 'upload'
  | 'secrets'
  | 'encoding'
  | 'prompt'
  | 'bot'
  | 'csrf'
  | 'deserialization';

export const WAF_FAMILY_LABELS: Record<WafFamily, string> = {
  xss: 'XSS & injection HTML',
  sqli: 'Injection SQL',
  rce: 'Exécution de commandes / RCE',
  traversal: 'Traversée de répertoires & LFI',
  prototype: 'Pollution de prototype',
  ssrf: 'SSRF, URL & redirection',
  xxe: 'Injection XML / XXE',
  ldap_nosql: 'Injection LDAP & NoSQL',
  ssti: 'Injection de templates (SSTI)',
  header: 'Injection d’en-têtes / CRLF',
  token: 'Jetons JWT & sessions',
  upload: 'Uploads & fichiers dangereux',
  secrets: 'Fuite de secrets & données',
  encoding: 'Évasion d’encodage',
  prompt: 'Prompt injection (IA)',
  bot: 'Bots, scanners & automatisation',
  csrf: 'CSRF, clickjacking & CSP',
  deserialization: 'Désérialisation non sûre',
};

export interface WafRule {
  ruleId: string;
  family: WafFamily;
  category: SecurityThreatCategory;
  severity: SecuritySeverity;
  pattern: RegExp;
  description: string;
}

export const WAF_RULES: WafRule[] = [
  // ============ 1. XSS & injection HTML (17 pare-feux) ============
  {
    ruleId: 'WAF-XSS-001',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'critical',
    pattern: /<\s*script\b/i,
    description: 'Pare-feu anti-balise <script> ouvrante (XSS stocké ou réfléchi)',
  },
  {
    ruleId: 'WAF-XSS-002',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /<\s*\/\s*script\s*>/i,
    description: 'Pare-feu anti-balise </script> de fermeture injectée',
  },
  {
    ruleId: 'WAF-XSS-003',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /\bon(?:error|load|click|mouseover|focus|submit|input|animationstart|toggle|pointerdown)\s*=/i,
    description: 'Pare-feu anti-gestionnaires d’événements inline (onerror, onload…)',
  },
  {
    ruleId: 'WAF-XSS-004',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /(?:javascript|vbscript|livescript)\s*:/i,
    description: 'Pare-feu anti-protocoles exécutables (javascript:, vbscript:)',
  },
  {
    ruleId: 'WAF-XSS-005',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /data\s*:\s*text\/html/i,
    description: 'Pare-feu anti-URI data:text/html (chargement de page piégée)',
  },
  {
    ruleId: 'WAF-XSS-006',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /<\s*(?:iframe|object|embed|applet)\b/i,
    description: 'Pare-feu anti-cadres et objets actifs (iframe, object, embed, applet)',
  },
  {
    ruleId: 'WAF-XSS-007',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /<\s*svg\b[^>]*\bon\w+\s*=/i,
    description: 'Pare-feu anti-SVG porteur d’un gestionnaire d’événement',
  },
  {
    ruleId: 'WAF-XSS-008',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /\b(?:document\s*\.\s*cookie|localStorage\s*\.\s*(?:getItem|setItem)|sessionStorage\s*\.\s*getItem)/i,
    description: 'Pare-feu anti-vol de session (cookie / stockage local)',
  },
  {
    ruleId: 'WAF-XSS-009',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'critical',
    pattern: /\b(?:eval|new\s+Function|setTimeout|setInterval)\s*\(\s*['"`]/i,
    description: 'Pare-feu anti-exécution dynamique de chaîne (eval / new Function)',
  },
  {
    ruleId: 'WAF-XSS-010',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /<\s*img\b[^>]*\b(?:onerror|src\s*=\s*['"]?\s*x\s*['"]?)/i,
    description: 'Pare-feu anti-image piégée (<img onerror>)',
  },
  {
    ruleId: 'WAF-XSS-011',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'medium',
    pattern: /<\s*(?:body\b[^>]*onload|meta\b[^>]*http-equiv\s*=\s*['"]?refresh)/i,
    description: 'Pare-feu anti-redirection meta refresh / body onload',
  },
  {
    ruleId: 'WAF-XSS-012',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /(?:expression\s*\(|url\s*\(\s*['"]?\s*javascript:)/i,
    description: 'Pare-feu anti-injection CSS (expression(), url(javascript:))',
  },
  {
    ruleId: 'WAF-XSS-013',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /&(?:#x?0*3c|lt)\s*;?\s*script/i,
    description: 'Pare-feu anti-script encodé en entités HTML (&#x3C;script)',
  },
  {
    ruleId: 'WAF-XSS-014',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /\b(?:srcdoc|formaction)\s*=\s*['"]?\s*(?:javascript:|<\s*script)/i,
    description: 'Pare-feu anti-injection via srcdoc / formaction',
  },
  {
    ruleId: 'WAF-XSS-015',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /\.(?:innerHTML|outerHTML)\s*=|document\s*\.\s*(?:write|writeln)\s*\(/i,
    description: 'Pare-feu anti-écriture DOM directe (innerHTML, document.write)',
  },
  {
    ruleId: 'WAF-XSS-016',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'medium',
    pattern: /postMessage\s*\([^)]*['"]\*['"]|window\s*\.\s*name\s*=/i,
    description: 'Pare-feu anti-fuite cross-origin (postMessage *, window.name)',
  },
  {
    ruleId: 'WAF-XSS-017',
    family: 'xss',
    category: 'WAF_XSS',
    severity: 'high',
    pattern: /\b(?:atob|btoa)\s*\(\s*['"][A-Za-z0-9+/=]{16,}/i,
    description: 'Pare-feu anti-charge utile encodée Base64 (atob/btoa)',
  },

  // ============ 2. Injection SQL (13 pare-feux) ============
  {
    ruleId: 'WAF-SQLI-001',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'critical',
    pattern: /\bunion\s+(?:all\s+)?select\b/i,
    description: 'Pare-feu anti-injection SQL par UNION SELECT',
  },
  {
    ruleId: 'WAF-SQLI-002',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'critical',
    pattern: /;\s*(?:drop|truncate|alter|delete|update|insert)\s+(?:table|from|into|database|schema)\b/i,
    description: 'Pare-feu anti-injection SQL destructive (DROP / TRUNCATE / ALTER)',
  },
  {
    ruleId: 'WAF-SQLI-003',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'high',
    pattern: /(?:'|")\s*(?:or|and)\s+(?:'1'\s*=\s*'1'|1\s*=\s*1|true\b)/i,
    description: 'Pare-feu anti-tautologie SQL (OR 1=1)',
  },
  {
    ruleId: 'WAF-SQLI-004',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'medium',
    pattern: /(?:--\s|\/\*!\d*)/,
    description: 'Pare-feu anti-commentaires SQL de contournement (--, /*!)',
  },
  {
    ruleId: 'WAF-SQLI-005',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'high',
    pattern: /\b(?:sleep|pg_sleep|benchmark|waitfor\s+delay|dbms_pipe\.receive_message)\s*\(/i,
    description: 'Pare-feu anti-injection SQL temporelle (SLEEP, BENCHMARK)',
  },
  {
    ruleId: 'WAF-SQLI-006',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'high',
    pattern: /\b(?:information_schema|sysobjects|pg_catalog|sqlite_master)\b/i,
    description: 'Pare-feu anti-énumération des métadonnées de base',
  },
  {
    ruleId: 'WAF-SQLI-007',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'critical',
    pattern: /\b(?:xp_cmdshell|load_file|into\s+outfile|sp_executesql|openrowset)\b/i,
    description: 'Pare-feu anti-exécution et exfiltration via le SGBD',
  },
  {
    ruleId: 'WAF-SQLI-008',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'high',
    pattern: /\b(?:char|chr|concat|group_concat)\s*\(\s*(?:0x|[0-9]+\s*,)/i,
    description: 'Pare-feu anti-obfuscation SQL par fonctions CHAR/CONCAT',
  },
  {
    ruleId: 'WAF-SQLI-009',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'medium',
    pattern: /\border\s+by\s+\d+\s*(?:--|#|,|\basc\b|\bdesc\b)/i,
    description: 'Pare-feu anti-sondage du nombre de colonnes (ORDER BY n)',
  },
  {
    ruleId: 'WAF-SQLI-010',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'medium',
    pattern: /\blimit\s+\d+\s*(?:,\s*\d+|offset\s+\d+)\s*(?:--|#)/i,
    description: 'Pare-feu anti-injection dans les clauses LIMIT / OFFSET',
  },
  {
    ruleId: 'WAF-SQLI-011',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'critical',
    pattern: /\b(?:sqlmap|nikto|acunetix|nessus|havij|sqlninja)\b/i,
    description: 'Pare-feu anti-outils automatisés d’injection SQL (sqlmap, nikto…)',
  },
  {
    ruleId: 'WAF-SQLI-012',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'high',
    pattern: /;\s*(?:select|exec|execute|declare)\b[^;]{0,120}(?:--|#|\/\*)/i,
    description: 'Pare-feu anti-requêtes empilées (stacked queries)',
  },
  {
    ruleId: 'WAF-SQLI-013',
    family: 'sqli',
    category: 'WAF_SQLI',
    severity: 'high',
    pattern: /(?:'|")\s*(?:or|and)\s+[^'"\s]{1,40}\s*(?:--|#|\/\*)/i,
    description: 'Pare-feu anti-injection booléenne suivie d’un commentaire',
  },

  // ============ 3. Command injection & RCE (10 pare-feux) ============
  {
    ruleId: 'WAF-RCE-001',
    family: 'rce',
    category: 'WAF_COMMAND_RCE',
    severity: 'critical',
    pattern: /\bpowershell(?:\.exe)?\s+(?:-|–|—)?(?:e|enc|encodedcommand|nop|w)\b/i,
    description: 'Pare-feu anti-PowerShell encodé (EncodedCommand)',
  },
  {
    ruleId: 'WAF-RCE-002',
    family: 'rce',
    category: 'WAF_COMMAND_RCE',
    severity: 'critical',
    pattern: /\bcmd(?:\.exe)?\s*\/[ck]\b/i,
    description: 'Pare-feu anti-commande Windows cmd.exe /c ou /k',
  },
  {
    ruleId: 'WAF-RCE-003',
    family: 'rce',
    category: 'WAF_COMMAND_RCE',
    severity: 'critical',
    pattern: /\|\s*(?:bash|sh|zsh|nc|netcat|curl|wget|telnet)\b/i,
    description: 'Pare-feu anti-pipe vers un interpréteur ou outil réseau',
  },
  {
    ruleId: 'WAF-RCE-004',
    family: 'rce',
    category: 'WAF_COMMAND_RCE',
    severity: 'high',
    pattern: /`[^`\r\n]{1,80}`|\$\([^)\r\n]{1,80}\)/i,
    description: 'Pare-feu anti-substitution de commande (`…` ou $(…))',
  },
  {
    ruleId: 'WAF-RCE-005',
    family: 'rce',
    category: 'WAF_COMMAND_RCE',
    severity: 'high',
    pattern: /\$\{?IFS\}?/,
    description: 'Pare-feu anti-contournement par variable IFS',
  },
  {
    ruleId: 'WAF-RCE-006',
    family: 'rce',
    category: 'WAF_COMMAND_RCE',
    severity: 'high',
    pattern: /\b(?:chmod|chown)\s+[+0-7]/,
    description: 'Pare-feu anti-modification de permissions (chmod/chown)',
  },
  {
    ruleId: 'WAF-RCE-007',
    family: 'rce',
    category: 'WAF_COMMAND_RCE',
    severity: 'critical',
    pattern: /\b(?:nc|ncat|bash|socat)\b[^\r\n]{0,40}-[el]\s+\/bin\/(?:ba|z|da)?sh/i,
    description: 'Pare-feu anti-shell inversé (reverse shell)',
  },
  {
    ruleId: 'WAF-RCE-008',
    family: 'rce',
    category: 'WAF_COMMAND_RCE',
    severity: 'high',
    pattern: /\b(?:python[23]?|perl|ruby|node)\s+-[ce]\s+['"]/i,
    description: 'Pare-feu anti-commande inline Python/Perl/Ruby/Node',
  },
  {
    ruleId: 'WAF-RCE-009',
    family: 'rce',
    category: 'WAF_COMMAND_RCE',
    severity: 'critical',
    pattern: /\b(?:certutil\s+-urlcache|mshta\s+(?:https?|javascript)|bitsadmin\s+\/transfer)/i,
    description: 'Pare-feu anti-téléchargement furtif (certutil, mshta, bitsadmin)',
  },
  {
    ruleId: 'WAF-RCE-010',
    family: 'rce',
    category: 'WAF_COMMAND_RCE',
    severity: 'critical',
    pattern: /base64\s+(?:-d|--decode)[^\r\n]{0,24}\|\s*(?:sh|bash|zsh)/i,
    description: 'Pare-feu anti-payload Base64 exécuté par le shell',
  },

  // ============ 4. Traversée de répertoires & LFI (7 pare-feux) ============
  {
    ruleId: 'WAF-TRAV-001',
    family: 'traversal',
    category: 'WAF_CMD_TRAVERSAL',
    severity: 'high',
    pattern: /(?:\.\.[\\/]){2,}/,
    description: 'Pare-feu anti-séquence de remontée de répertoire (../..)',
  },
  {
    ruleId: 'WAF-TRAV-002',
    family: 'traversal',
    category: 'WAF_CMD_TRAVERSAL',
    severity: 'high',
    pattern: /%2e%2e(?:%2f|%5c)|%252e%252e/i,
    description: 'Pare-feu anti-traversée encodée en URL (double encodage inclus)',
  },
  {
    ruleId: 'WAF-TRAV-003',
    family: 'traversal',
    category: 'WAF_CMD_TRAVERSAL',
    severity: 'critical',
    pattern: /\/etc\/(?:passwd|shadow|hosts)|\/proc\/self\/environ/i,
    description: 'Pare-feu anti-lecture de fichiers système Unix sensibles',
  },
  {
    ruleId: 'WAF-TRAV-004',
    family: 'traversal',
    category: 'WAF_CMD_TRAVERSAL',
    severity: 'high',
    pattern: /[a-z]:\\+(?:windows|winnt|boot\.ini)\\/i,
    description: 'Pare-feu anti-accès aux chemins système Windows',
  },
  {
    ruleId: 'WAF-TRAV-005',
    family: 'traversal',
    category: 'WAF_CMD_TRAVERSAL',
    severity: 'high',
    pattern: /\b(?:php|zip|phar|expect|compress\.zlib):\/\//i,
    description: 'Pare-feu anti-wrappers PHP (php://, phar://, zip://)',
  },
  {
    ruleId: 'WAF-TRAV-006',
    family: 'traversal',
    category: 'WAF_CMD_TRAVERSAL',
    severity: 'high',
    pattern: /\bfile:\/\/\//i,
    description: 'Pare-feu anti-URI file:// (lecture locale arbitraire)',
  },
  {
    ruleId: 'WAF-TRAV-007',
    family: 'traversal',
    category: 'WAF_CMD_TRAVERSAL',
    severity: 'high',
    pattern: /%00|\u0000/,
    description: 'Pare-feu anti-octet nul (contournement d’extension de fichier)',
  },

  // ============ 5. Pollution de prototype (4 pare-feux) ============
  {
    ruleId: 'WAF-PROTO-001',
    family: 'prototype',
    category: 'WAF_PROTOTYPE_POLLUTION',
    severity: 'high',
    pattern: /__proto__/,
    description: 'Pare-feu anti-clé __proto__ (pollution de prototype)',
  },
  {
    ruleId: 'WAF-PROTO-002',
    family: 'prototype',
    category: 'WAF_PROTOTYPE_POLLUTION',
    severity: 'high',
    pattern: /constructor\s*(?:\[|\.)\s*['"]?prototype/i,
    description: 'Pare-feu anti-accès constructor.prototype',
  },
  {
    ruleId: 'WAF-PROTO-003',
    family: 'prototype',
    category: 'WAF_PROTOTYPE_POLLUTION',
    severity: 'high',
    pattern: /prototype\s*(?:\[|\.)\s*(?:polluted|isAdmin|admin|role)/i,
    description: 'Pare-feu anti-élévation de privilèges par prototype',
  },
  {
    ruleId: 'WAF-PROTO-004',
    family: 'prototype',
    category: 'WAF_PROTOTYPE_POLLUTION',
    severity: 'medium',
    pattern: /\b(?:Object\s*\.\s*assign|deepmerge|merge)\s*\([^)]{0,80}__proto__/i,
    description: 'Pare-feu anti-fusion d’objet contenant __proto__',
  },

  // ============ 6. SSRF, URL & redirections (6 pare-feux) ============
  {
    ruleId: 'WAF-SSRF-001',
    family: 'ssrf',
    category: 'WAF_SSRF',
    severity: 'high',
    pattern: /(?:^|[\s(=])[/\\]{2}[a-z0-9-]{2,}\.[a-z]{2,}/i,
    description: 'Pare-feu anti-URL relative au protocole (//domaine-externe)',
  },
  {
    ruleId: 'WAF-SSRF-002',
    family: 'ssrf',
    category: 'URL_POISONING',
    severity: 'medium',
    pattern: /[?&](?:url|redirect|next|return|continue|target)=https?:\/\//i,
    description: 'Pare-feu anti-redirection ouverte (paramètre url/redirect)',
  },
  {
    ruleId: 'WAF-SSRF-003',
    family: 'ssrf',
    category: 'WAF_SSRF',
    severity: 'critical',
    pattern: /\b169\.254\.169\.254\b|\bmetadata\.google\.internal\b/i,
    description: 'Pare-feu anti-SSRF vers les métadonnées Cloud',
  },
  {
    ruleId: 'WAF-SSRF-004',
    family: 'ssrf',
    category: 'WAF_SSRF',
    severity: 'high',
    pattern: /\b(?:localhost|127\.0\.0\.1|0\.0\.0\.0|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})\b/i,
    description: 'Pare-feu anti-SSRF vers le réseau local ou la boucle locale',
  },
  {
    ruleId: 'WAF-SSRF-005',
    family: 'ssrf',
    category: 'WAF_SSRF',
    severity: 'high',
    pattern: /\b(?:gopher|dict|ftp|ldap|tftp):\/\//i,
    description: 'Pare-feu anti-protocoles réseau détournés (gopher, dict, ftp)',
  },
  {
    ruleId: 'WAF-SSRF-006',
    family: 'ssrf',
    category: 'URL_POISONING',
    severity: 'medium',
    pattern: /https?:\/\/[^\s/@]{1,60}@[a-z0-9.-]+\.[a-z]{2,}/i,
    description: 'Pare-feu anti-astuce user@host (URL trompeuse)',
  },

  // ============ 7. Injection XML / XXE (4 pare-feux) ============
  {
    ruleId: 'WAF-XXE-001',
    family: 'xxe',
    category: 'WAF_XXE',
    severity: 'critical',
    pattern: /<!DOCTYPE[^>]{0,80}<!ENTITY/i,
    description: 'Pare-feu anti-déclaration d’entité XML (XXE)',
  },
  {
    ruleId: 'WAF-XXE-002',
    family: 'xxe',
    category: 'WAF_XXE',
    severity: 'critical',
    pattern: /<!ENTITY\s+%?\s*\w+\s+SYSTEM\s+['"](?:file|https?):/i,
    description: 'Pare-feu anti-entité externe SYSTEM (lecture de fichier)',
  },
  {
    ruleId: 'WAF-XXE-003',
    family: 'xxe',
    category: 'WAF_XXE',
    severity: 'high',
    pattern: /<!ENTITY\s+\w+\s+PUBLIC\s+['"]/i,
    description: 'Pare-feu anti-DTD externe PUBLIC',
  },
  {
    ruleId: 'WAF-XXE-004',
    family: 'xxe',
    category: 'WAF_XXE',
    severity: 'high',
    pattern: /<!ENTITY\s+%\s*\w+|&(?:lol|a)\d+;/i,
    description: 'Pare-feu anti-attaque « billion laughs » / entités paramètres',
  },

  // ============ 8. LDAP & NoSQL (4 pare-feux) ============
  {
    ruleId: 'WAF-NOSQL-001',
    family: 'ldap_nosql',
    category: 'WAF_LDAP_NOSQL',
    severity: 'high',
    pattern: /\(\s*\|\s*\(\s*\w+\s*=\s*\*|\*\)\s*\(\s*(?:uid|cn)=/i,
    description: 'Pare-feu anti-injection de filtre LDAP (OU + joker)',
  },
  {
    ruleId: 'WAF-NOSQL-002',
    family: 'ldap_nosql',
    category: 'WAF_LDAP_NOSQL',
    severity: 'high',
    pattern: /\(\s*(?:uid|cn|samaccountname)=\*\)/i,
    description: 'Pare-feu anti-joker LDAP d’énumération d’utilisateurs',
  },
  {
    ruleId: 'WAF-NOSQL-003',
    family: 'ldap_nosql',
    category: 'WAF_LDAP_NOSQL',
    severity: 'high',
    pattern: /\$(?:ne|gt|gte|lt|lte|regex|where|exists|in)\b/i,
    description: 'Pare-feu anti-opérateurs NoSQL ($ne, $gt, $where, $regex)',
  },
  {
    ruleId: 'WAF-NOSQL-004',
    family: 'ldap_nosql',
    category: 'WAF_LDAP_NOSQL',
    severity: 'high',
    pattern: /"\$(?:ne|gt|regex|where)"\s*:/i,
    description: 'Pare-feu anti-injection JSON MongoDB ($ne / $regex)',
  },

  // ============ 9. Injection de templates SSTI (3 pare-feux) ============
  {
    ruleId: 'WAF-SSTI-001',
    family: 'ssti',
    category: 'WAF_TEMPLATE_INJECTION',
    severity: 'high',
    pattern: /\{\{[^}]{0,60}(?:\*|\+|\bconfig\b|\bself\b|\bclass\b)/i,
    description: 'Pare-feu anti-injection de template {{…}} (Jinja/Twig)',
  },
  {
    ruleId: 'WAF-SSTI-002',
    family: 'ssti',
    category: 'WAF_TEMPLATE_INJECTION',
    severity: 'high',
    pattern: /\$\{[^}]{0,60}(?:\*|\+|\bclass\b|\bruntime\b)/i,
    description: 'Pare-feu anti-injection d’expression ${…} (JSP/EL)',
  },
  {
    ruleId: 'WAF-SSTI-003',
    family: 'ssti',
    category: 'WAF_TEMPLATE_INJECTION',
    severity: 'high',
    pattern: /<%.{0,60}%>|#\{[^}]{0,60}\}/i,
    description: 'Pare-feu anti-balises serveur <% %> et #{…}',
  },

  // ============ 10. Injection d’en-têtes / CRLF (3 pare-feux) ============
  {
    ruleId: 'WAF-HDR-001',
    family: 'header',
    category: 'WAF_HEADER_INJECTION',
    severity: 'high',
    pattern: /%0d%0a|%0a%0d|%0d|%0a(?=(?:set-cookie|location))/i,
    description: 'Pare-feu anti-injection CRLF encodée (réponse HTTP scindée)',
  },
  {
    ruleId: 'WAF-HDR-002',
    family: 'header',
    category: 'WAF_HEADER_INJECTION',
    severity: 'high',
    pattern: /\r\n(?:Set-Cookie|Location|Content-Length|X-[A-Za-z-]+)\s*:/i,
    description: 'Pare-feu anti-en-tête HTTP injecté en clair',
  },
  {
    ruleId: 'WAF-HDR-003',
    family: 'header',
    category: 'WAF_HEADER_INJECTION',
    severity: 'medium',
    pattern: /\b(?:x-forwarded-for|x-forwarded-host|x-original-url)\s*:/i,
    description: 'Pare-feu anti-usurpation d’en-têtes proxy (X-Forwarded-*)',
  },

  // ============ 11. Jetons JWT & sessions (4 pare-feux) ============
  {
    ruleId: 'WAF-JWT-001',
    family: 'token',
    category: 'WAF_TOKEN',
    severity: 'critical',
    pattern: /"alg"\s*:\s*"(?:none|None|NONE)"/,
    description: 'Pare-feu anti-JWT non signé (alg: none)',
  },
  {
    ruleId: 'WAF-JWT-002',
    family: 'token',
    category: 'WAF_TOKEN',
    severity: 'medium',
    pattern: /[?&](?:token|access_token|id_token|jwt)=/i,
    description: 'Pare-feu anti-jeton exposé dans l’URL',
  },
  {
    ruleId: 'WAF-JWT-003',
    family: 'token',
    category: 'WAF_TOKEN',
    severity: 'high',
    pattern: /eyJ[a-zA-Z0-9_-]{8,}\.[a-zA-Z0-9_-]{8,}\.[a-zA-Z0-9_-]{0,}/,
    description: 'Pare-feu anti-JWT en clair dans une entrée utilisateur',
  },
  {
    ruleId: 'WAF-JWT-004',
    family: 'token',
    category: 'WAF_TOKEN',
    severity: 'high',
    pattern: /"kid"\s*:\s*"[^"]{0,80}(?:\.\.\/|https?:)/i,
    description: 'Pare-feu anti-injection d’en-tête kid (JWT key traversal)',
  },

  // ============ 12. Uploads & fichiers dangereux (5 pare-feux) ============
  {
    ruleId: 'WAF-UPLOAD-001',
    family: 'upload',
    category: 'WAF_UPLOAD',
    severity: 'critical',
    pattern: /\.(?:pdf|docx?|xlsx?|jpe?g|png|mp4)\.(?:exe|bat|cmd|scr|vbs|js|jar|ps1)\b/i,
    description: 'Pare-feu anti-double extension exécutable (.pdf.exe)',
  },
  {
    ruleId: 'WAF-UPLOAD-002',
    family: 'upload',
    category: 'WAF_UPLOAD',
    severity: 'high',
    pattern: /\.(?:php\d?|phtml|jspx?|aspx?|ashx|cgi|pl|py)\b/i,
    description: 'Pare-feu anti-upload de script serveur (.php, .jsp, .asp)',
  },
  {
    ruleId: 'WAF-UPLOAD-003',
    family: 'upload',
    category: 'WAF_UPLOAD',
    severity: 'high',
    pattern: /\bcontent-type\s*:\s*(?:application\/x-(?:php|sh)|text\/x-shellscript)/i,
    description: 'Pare-feu anti-type MIME exécutable déclaré',
  },
  {
    ruleId: 'WAF-UPLOAD-004',
    family: 'upload',
    category: 'WAF_UPLOAD',
    severity: 'high',
    pattern: /\b(?:\.htaccess|web\.config|\.user\.ini|php\.ini)\b/i,
    description: 'Pare-feu anti-configuration serveur piégée (.htaccess)',
  },
  {
    ruleId: 'WAF-UPLOAD-005',
    family: 'upload',
    category: 'WAF_UPLOAD',
    severity: 'medium',
    pattern: /\b(?:zip\s?bomb|decompression\s+bomb)\b/i,
    description: 'Pare-feu anti-bombe de décompression (zip bomb)',
  },

  // ============ 13. Fuite de secrets & données sensibles (5 pare-feux) ============
  {
    ruleId: 'WAF-SECRET-001',
    family: 'secrets',
    category: 'WAF_SECRET_LEAK',
    severity: 'critical',
    pattern: /\bAKIA[0-9A-Z]{16}\b/,
    description: 'Pare-feu anti-fuite de clé d’accès AWS',
  },
  {
    ruleId: 'WAF-SECRET-002',
    family: 'secrets',
    category: 'WAF_SECRET_LEAK',
    severity: 'critical',
    pattern: /-----BEGIN\s+(?:RSA\s+|EC\s+|OPENSSH\s+|PGP\s+)?PRIVATE KEY-----/,
    description: 'Pare-feu anti-exposition de clé privée cryptographique',
  },
  {
    ruleId: 'WAF-SECRET-003',
    family: 'secrets',
    category: 'WAF_SECRET_LEAK',
    severity: 'high',
    pattern: /\b(?:password|passwd|pwd|secret|api[_-]?key|token)\s*[:=]\s*['"][^'"]{6,}/i,
    description: 'Pare-feu anti-mot de passe ou secret en clair',
  },
  {
    ruleId: 'WAF-SECRET-004',
    family: 'secrets',
    category: 'WAF_SECRET_LEAK',
    severity: 'high',
    pattern: /\bBearer\s+[A-Za-z0-9._-]{20,}/,
    description: 'Pare-feu anti-jeton Bearer exposé dans un contenu',
  },
  {
    ruleId: 'WAF-SECRET-005',
    family: 'secrets',
    category: 'WAF_SECRET_LEAK',
    severity: 'medium',
    pattern: /\b(?:4\d{12}(?:\d{3})?|5[1-5]\d{14}|3[47]\d{13})\b|\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/,
    description: 'Pare-feu anti-exposition de numéro de carte ou d’IBAN',
  },

  // ============ 14. Évasion d’encodage (4 pare-feux) ============
  {
    ruleId: 'WAF-ENC-001',
    family: 'encoding',
    category: 'WAF_ENCODING_EVASION',
    severity: 'high',
    pattern: /\\u003c|\\u003e|\\x3c|\\x3e/i,
    description: 'Pare-feu anti-chevaux encodés en Unicode/hexadécimal',
  },
  {
    ruleId: 'WAF-ENC-002',
    family: 'encoding',
    category: 'WAF_ENCODING_EVASION',
    severity: 'medium',
    pattern: /&#x?0*6a;|&#x?0*3c;/i,
    description: 'Pare-feu anti-identifiants HTML encodés (&#x6A;)',
  },
  {
    ruleId: 'WAF-ENC-003',
    family: 'encoding',
    category: 'WAF_ENCODING_EVASION',
    severity: 'high',
    pattern: /%c0%ae|%c0%af|%e0%80%ae/i,
    description: 'Pare-feu anti-séquence UTF-8 surlongue (contournement IDS)',
  },
  {
    ruleId: 'WAF-ENC-004',
    family: 'encoding',
    category: 'WAF_ENCODING_EVASION',
    severity: 'medium',
    pattern: /(?:%25){3,}|%2525%25/i,
    description: 'Pare-feu anti-double/triple encodage URL répété',
  },

  // ============ 15. Prompt injection IA (3 pare-feux) ============
  {
    ruleId: 'WAF-PROMPT-001',
    family: 'prompt',
    category: 'WAF_PROMPT_INJECTION',
    severity: 'high',
    pattern: /\b(?:ignore|disregard|forget)\s+(?:all\s+)?(?:previous|above|prior)\s+(?:instructions|prompts|rules)\b/i,
    description: 'Pare-feu anti-prompt injection « ignore previous instructions »',
  },
  {
    ruleId: 'WAF-PROMPT-002',
    family: 'prompt',
    category: 'WAF_PROMPT_INJECTION',
    severity: 'high',
    pattern: /\b(?:reveal|show|print|repeat)\s+(?:your\s+)?(?:system\s+prompt|hidden\s+instructions|initial\s+prompt)\b/i,
    description: 'Pare-feu anti-extraction du prompt système de l’IA',
  },
  {
    ruleId: 'WAF-PROMPT-003',
    family: 'prompt',
    category: 'WAF_PROMPT_INJECTION',
    severity: 'medium',
    pattern: /\b(?:jailbreak|developer\s+mode|do\s+anything\s+now|DAN\s+mode)\b/i,
    description: 'Pare-feu anti-tentative de jailbreak / mode développeur',
  },

  // ============ 16. Bots, scanners & automatisation (3 pare-feux) ============
  {
    ruleId: 'WAF-BOT-001',
    family: 'bot',
    category: 'WAF_BOT',
    severity: 'high',
    pattern: /\b(?:nmap|masscan|zgrab|dirbuster|gobuster|wpscan|whatweb)\b/i,
    description: 'Pare-feu anti-scanners de ports et de répertoires',
  },
  {
    ruleId: 'WAF-BOT-002',
    family: 'bot',
    category: 'WAF_BOT',
    severity: 'medium',
    pattern: /\b(?:headlesschrome|puppeteer|playwright|phantomjs|selenium)\b/i,
    description: 'Pare-feu anti-navigateurs automatisés (headless)',
  },
  {
    ruleId: 'WAF-BOT-003',
    family: 'bot',
    category: 'WAF_BOT',
    severity: 'low',
    pattern: /\b(?:python-requests|curl\/\d|wget\/\d|go-http-client|libwww-perl)\b/i,
    description: 'Pare-feu anti-clients scriptés (curl, wget, python-requests)',
  },

  // ============ 17. CSRF, clickjacking & CSP (3 pare-feux) ============
  {
    ruleId: 'WAF-CSRF-001',
    family: 'csrf',
    category: 'WAF_CSRF',
    severity: 'medium',
    pattern: /<form[^>]*>[\s\S]{0,200}<input[^>]*type\s*=\s*['"]?hidden/i,
    description: 'Pare-feu anti-formulaire caché auto-soumis (CSRF)',
  },
  {
    ruleId: 'WAF-CSRF-002',
    family: 'csrf',
    category: 'WAF_CSRF',
    severity: 'medium',
    pattern: /\b(?:top|parent|self)\s*\.\s*location\s*=\s*['"]https?:/i,
    description: 'Pare-feu anti-frame busting / détournement de fenêtre',
  },
  {
    ruleId: 'WAF-CSRF-003',
    family: 'csrf',
    category: 'WAF_CSRF',
    severity: 'low',
    pattern: /\b(?:unsafe-inline|unsafe-eval)\b/i,
    description: 'Pare-feu anti-affaiblissement de la Content-Security-Policy',
  },

  // ============ 18. Désérialisation non sûre (2 pare-feux) ============
  {
    ruleId: 'WAF-DESER-001',
    family: 'deserialization',
    category: 'WAF_DESERIALIZATION',
    severity: 'critical',
    pattern: /rO0AB|aced0005/,
    description: 'Pare-feu anti-flux Java sérialisé (rO0AB / aced0005)',
  },
  {
    ruleId: 'WAF-DESER-002',
    family: 'deserialization',
    category: 'WAF_DESERIALIZATION',
    severity: 'high',
    pattern: /\bO:\d+:"[A-Za-z_\\]{2,80}":\d+:\{/,
    description: 'Pare-feu anti-objet PHP sérialisé (O:…:{})',
  },
];

/** Nombre total de pare-feux WAF armés (100). */
export const FIREWALL_COUNT = WAF_RULES.length;

/** Regroupe les signatures par famille pour l’affichage du centre de sécurité. */
export const WAF_RULES_BY_FAMILY: Record<WafFamily, WafRule[]> = WAF_RULES.reduce(
  (acc, rule) => {
    acc[rule.family] = acc[rule.family] ?? [];
    acc[rule.family].push(rule);
    return acc;
  },
  {} as Record<WafFamily, WafRule[]>
);
