import React from 'react';

export const NAVBAR_OFFSET = 110;
export const DOM_RENDER_DELAY = 100;

export const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export const findHeadingElement = (title: string): HTMLElement | null => {
  const headingId = generateHeadingId(title);

  let targetElement = document.getElementById(headingId);

  if (!targetElement) {
    const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (const heading of allHeadings) {
      if (heading.textContent?.trim() === title.trim()) {
        targetElement = heading as HTMLElement;
        break;
      }
    }
  }

  return targetElement;
};

export const scrollToElement = (element: HTMLElement): void => {
  const rect = element.getBoundingClientRect();
  const currentTop = rect.top + window.scrollY;
  const targetPosition = currentTop - NAVBAR_OFFSET;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};

export const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => {
        if (typeof child === 'string') {
          return child;
        }
        if (React.isValidElement(child)) {
          const childProps = child.props as { children?: React.ReactNode };
          if (typeof childProps.children === 'string') {
            return childProps.children;
          }
          if (Array.isArray(childProps.children)) {
            return childProps.children
              .map((grandChild: any) =>
                typeof grandChild === 'string' ? grandChild : '',
              )
              .join('');
          }
        }
        return '';
      })
      .join('');
  }

  return '';
};

export const extractTitlesFromBlog = (blog: any): string[] => {
  if (!blog?.blogSection) {
    return [];
  }

  return blog.blogSection
    .filter((section: any) => section.__component === 'shared.richtext-blocks')
    .flatMap((section: any) =>
      section.rich_text
        .filter((item: any) => item.type === 'heading')
        .map((item: any) =>
          item.children.map((child: any) => child.text || '').join('').trim(),
        ),
    );
};
