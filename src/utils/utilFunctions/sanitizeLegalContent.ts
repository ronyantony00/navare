import type { BlocksContent } from '@strapi/blocks-react-renderer';

/** Fix migrated / corrupted third-party leftovers in legal CMS copy. */
const LEGAL_TEXT_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Gnosis Companies,\s*Inc\.?/gi, 'Navare Solutions Ltd'],
  [/\bGnosis Freight\b/gi, 'Navare'],
  [/\bGnosis\b/gi, 'Navare'],
  [/\bwww\.gnosisfreight\.com\b/gi, 'www.navareglobal.com'],
  [/\bgnosisfreight\.com\b/gi, 'navareglobal.com'],
  [/\bgnosisright\.com\b/gi, 'navareglobal.com'],
  [/\bwww\.navare\.com\b/gi, 'www.navareglobal.com'],
  // Trademark symbol ™ often corrupted to trailing "T" during CMS migration
  [/\bNAVONET\b/g, 'NAVONE™'],
  [/\bNAVBRIDGET\b/g, 'NAVBRIDGE™'],
  [/\bNAVSCANT\b/g, 'NAVSCAN™'],
  [/\bNavareT\b/g, 'Navare™'],
  [/trademark symbol \(T\)/gi, 'trademark symbol (™)'],
  [/\bthe T symbol\b/g, 'the ™ symbol'],
  [/\bInclude the T symbol\b/g, 'Include the ™ symbol'],
  [/\bwith the T symbol\b/g, 'with the ™ symbol'],
  [/\bThe T symbol\b/g, 'The ™ symbol'],
];

function sanitizeLegalString(value: string): string {
  return LEGAL_TEXT_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    value,
  );
}

function sanitizeNode(node: unknown): unknown {
  if (Array.isArray(node)) {
    return node.map(sanitizeNode);
  }

  if (!node || typeof node !== 'object') {
    return node;
  }

  const record = node as Record<string, unknown>;
  const next: Record<string, unknown> = { ...record };

  if (typeof next.text === 'string') {
    next.text = sanitizeLegalString(next.text);
  }

  if (next.children) {
    next.children = sanitizeNode(next.children);
  }

  return next;
}

export function sanitizeLegalContent(content?: BlocksContent | null): BlocksContent {
  if (!content || !Array.isArray(content)) {
    return [];
  }

  return sanitizeNode(content) as BlocksContent;
}

export function sanitizeLegalPlainText(value?: string | null): string {
  if (!value) {
    return '';
  }

  return sanitizeLegalString(value);
}
