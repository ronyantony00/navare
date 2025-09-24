interface TitleItem {
  text: string;
  highlight: boolean;
}

export function getHighlightedTitles(
  titles: TitleItem[] | undefined,
  fallbackPrefix: string,
  fallbackHighlight: string,
): { titlePrefix: string; titleHighlight: string } {
  if (Array.isArray(titles) && titles.length >= 2) {
    const prefix = titles.find(item => !item.highlight);
    const highlight = titles.find(item => item.highlight);

    if (prefix && highlight) {
      return { titlePrefix: prefix.text, titleHighlight: highlight.text };
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'getTestimonialTitles: Invalid title data. Both items are highlighted or both are not. Using fallback logic.',
        );
      }
      return {
        titlePrefix: titles[0]?.text || fallbackPrefix,
        titleHighlight: titles[1]?.text || fallbackHighlight,
      };
    }
  }
  // Fallback to provided defaults
  return { titlePrefix: fallbackPrefix, titleHighlight: fallbackHighlight };
}
