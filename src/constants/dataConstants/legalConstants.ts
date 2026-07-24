import ImageConstants from '../imageConstants/imageConstants';

/** Legacy hub stubs — live Legal Hub loads categories/docs from Strapi. */
export const LegalConstants = [
  {
    image: ImageConstants.DataProtectionIcon,
    title: 'Data Protection',
    links: [
      {
        title: 'Cookie Policy',
        href: '/website-terms-of-use?slug=cookie-policy-1',
      },
      {
        title: 'Privacy Policy',
        href: '/privacy-policy',
      },
      {
        title: 'Website Terms of Use',
        href: '/website-terms-of-use?slug=terms-of-use',
      },
    ],
  },
  {
    image: ImageConstants.PropertyIcon,
    title: 'Intellectual Property',
    links: [
      {
        title: 'Trademark Usage Guidelines',
        href: '/website-terms-of-use?slug=trademark-usage',
      },
    ],
  },
  {
    image: ImageConstants.LegalIcon,
    title: 'Terms of Service',
    links: [
      {
        title: 'Master Service Agreement',
        href: '/website-terms-of-use?slug=master-service-agreement',
      },
    ],
  },
];
