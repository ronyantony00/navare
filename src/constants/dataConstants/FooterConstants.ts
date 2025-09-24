export const footerLinks = [
  {
    id: 1,
    title: 'Product',
    links: [
      { id: 1, linkText: 'NavOne', path: '/solutions/navone' },
      { id: 2, linkText: 'NavScan', path: '/solutions/navscan' },
      { id: 3, linkText: 'NavBridge', path: '/solutions/navbridge' },
      // { id: 4, linkText: 'NavLogic', path: '/###' },
      { id: 5, linkText: 'NavAir & Ocean', path: '/solutions/navairandocean' },
    ],
  },
  {
    id: 2,
    title: 'Use cases',
    links: [
      { id: 1, linkText: 'Importers', path: '/usecases/import-management' },
      { id: 2, linkText: 'Exporters', path: '/usecases/export-management' },
      { id: 3, linkText: 'Drayage Providers ', path: '/usecases/drayage-providers' },
      { id: 4, linkText: 'Navare Forwarders', path: '/usecases/navare-forwarders' },
    ],
  },
  {
    id: 3,
    title: 'Resources',
    links: [
      { id: 1, linkText: 'New  & Insight', path: '/insights' },
      { id: 2, linkText: 'Testimonials', path: '/testimonials' },
      { id: 4, linkText: 'FAQ', path: '/faq' },
    ],
  },
  {
    id: 4,
    title: 'Company',
    links: [
      { id: 1, linkText: 'About Us', path: '/about-us' },
      { id: 2, linkText: 'Careers', path: '/careers' },
      { id: 4, linkText: 'Contact Us', path: '/contact-us' },
      { id: 5, linkText: 'Teams', path: '/team' },
    ],
  },
  {
    id: 5,
    title: 'Social',
    links: [
      { id: 1, linkText: 'LinkedIn', path: 'https://www.linkedin.com/company/navare-solutions-limited/', icon: '/assets/icons/footer-linkedin.svg' },
      { id: 2, linkText: 'Instagram', path: 'https://www.instagram.com', icon: '/assets/icons/footer-insta.svg' },
      { id: 3, linkText: 'Facebook', path: 'https://www.facebook.com', icon: '/assets/icons/footer-fb.svg' },
    ],
  },
];

// Transformer function to convert footerLinks to expected output format
export const transformFooterLinks = () => {
  return footerLinks.map(section => ({
    id: section.id,
    title: section.title,
    links: section.links.map(link => ({
      id: link.id,
      linkText: link.linkText,
      path: link.path,
    })),
  }));
};

// Alternative transformer that returns a flat array of all links
export const transformToFlatLinks = () => {
  const flatLinks: Array<{ id: number; linkText: string; path: string; sectionTitle: string }> = [];

  footerLinks.forEach((section) => {
    section.links.forEach((link) => {
      flatLinks.push({
        id: link.id,
        linkText: link.linkText,
        path: link.path,
        sectionTitle: section.title,
      });
    });
  });

  return flatLinks;
};

export const footerTexts = [
  { id: 1, footerText: '© 2024 Navare Solution.' },
  { id: 2, footerText: 'All rights reserved.', path: '/website-terms-of-use?slug=terms-of-use' },
  { id: 3, footerText: 'Legal Hub.', path: '/legal' },
];

export const linkPaths = {
  resource: [{ text: 'News and Insights', path: '/insights' }, { text: 'Customer Testimonial', path: '/testimonials' }, { text: 'FAQ', path: '/faq' }],
  company: [{ text: 'About Us', path: '/about-us' }, { text: 'Careers', path: '/careers' }, { text: 'Contact Us', path: '/contact-us' }, { text: 'Teams', path: '/team' }],
};
