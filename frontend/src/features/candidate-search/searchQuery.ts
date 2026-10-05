export interface KeywordTag {
  id: string;
  text: string;
  isMandatory: boolean;
}

/** Preserve the demo search's existing tokenization; this is not a Boolean parser. */
export function parseSearchQuery(query: string): KeywordTag[] {
  return query
    .replace(/["()]/g, '')
    .split(/\s+AND\s+|\s+OR\s+|\s+/)
    .map((term) => term.trim().toLowerCase())
    .filter(Boolean)
    .map((text, index) => ({ id: `query-${index}`, text, isMandatory: index === 0 }));
}
