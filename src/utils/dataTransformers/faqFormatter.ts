import type { faqType } from '@/types/interfaces';

const extractTextFromBlocksContent = (content: any): string => {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return '';
  }

  const firstBlock = content[0];
  if (!firstBlock || !firstBlock.children || !Array.isArray(firstBlock.children)) {
    return '';
  }

  const firstChild = firstBlock.children[0];
  if (!firstChild || typeof firstChild !== 'object') {
    return '';
  }

  // Handle different node types
  if (firstChild.type === 'text' && typeof firstChild.text === 'string') {
    return firstChild.text;
  }

  // If it's a list item or other complex node, try to extract text recursively
  if (firstChild.children && Array.isArray(firstChild.children)) {
    return firstChild.children
      .map((child: any) => {
        if (child.type === 'text' && typeof child.text === 'string') {
          return child.text;
        }
        return '';
      })
      .join(' ');
  }

  return '';
};

export const transformApiDataToGroupedFormat = (apiData: faqType[]) => {
  return apiData.reduce((grouped, faqItem) => {
    const tagName = faqItem.faqTags[0]?.tag;

    if (!tagName) {
      return grouped;
    }

    const transformedFaq = {
      id: faqItem.id,
      question: faqItem.Question,
      answer: extractTextFromBlocksContent(faqItem.Answer),
    };

    if (!grouped[tagName]) {
      grouped[tagName] = [];
    }

    grouped[tagName].push(transformedFaq);

    return grouped;
  }, {} as { [key: string]: { id: number; question: string; answer: string }[] });
};
