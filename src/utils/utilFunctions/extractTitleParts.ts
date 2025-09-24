export const extractTitleParts = (postHeroTitle: any) => {
  if (!postHeroTitle || !Array.isArray(postHeroTitle)) {
    return { titlePrefix: '', titleHighlight: '', titleSuffix: '' };
  }

  const nonHighlighted = postHeroTitle.filter(item => !item.highlight);
  const highlighted = postHeroTitle.filter(item => item.highlight);

  return {
    titlePrefix: nonHighlighted[0]?.text || '',
    titleHighlight: highlighted[0]?.text || '',
    titleSuffix: nonHighlighted[1]?.text || '',
  };
};
