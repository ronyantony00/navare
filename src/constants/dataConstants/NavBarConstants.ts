// Remove the API call and make this a pure constants file
export const NAVBAR = {
  navigation: [
    { id: 1, navItem: 'solutions', text: 'Solutions', type: 'dropdown' },
    { id: 2, navItem: 'useCases', text: 'Use Cases', type: 'dropdown' },
    { id: 3, navItem: 'resources', text: 'Resources', type: 'dropdown' },
    { id: 4, navItem: 'company', text: 'Company', type: 'dropdown' },
    { id: 5, navItem: 'Integrations', text: 'Integrations', href: '/integrations', type: 'link' },
  ],
  dropdownData: {
    solutions: {
      options: [
        { id: 1, title: 'NavOne CMS', href: '/solutions/navone', description: 'Dynamic ERD & cargo cut-off dates across all of your shipments', icon: '/assets/icons/nav-one.svg' },
        { id: 2, title: 'NavOne TMS', href: '/solutions/navone-tms', description: 'Dynamic ERD & cargo cut-off dates across all of your shipments', icon: '/assets/icons/nav-one.svg' },
        { id: 3, title: 'NavBridge', href: '/solutions/navbridge', description: 'Dynamic ERD & cargo cut-off dates across all of your shipments', icon: '/assets/icons/navbridge-new.svg' },
        { id: 4, title: 'NavScan', href: '/solutions/navscan', description: 'Dynamic ERD & cargo cut-off dates across all of your shipments', icon: '/assets/icons/nav-scan.svg' },
      ],
      promocardImage: '/assets/images/meeting.jpg',
      promocardDescription: 'test',
      buttonLink: '/testimonials',
      buttonText: 'Read Customer Success Stories',
      linkOnCard: '/testimonials',
    },
    useCases: {
      options: [
        { id: 1, title: 'Import Management', href: '/usecases/import-management', description: 'Dynamic ERD & cargo cut-off dates across all of your shipments', icon: '/assets/icons/For importers.svg' },
        { id: 2, title: 'Export Management', href: '/usecases/export-management', description: 'Dynamic ERD & cargo cut-off dates across all of your shipments', icon: '/assets/icons/For exporters.svg' },
        { id: 3, title: 'For Drayage Providers', href: '/usecases/drayage-providers', description: 'Dynamic ERD & cargo cut-off dates across all of your shipments', icon: '/assets/icons/drayage.svg' },
        { id: 4, title: 'For Navare Forwarders', href: '/usecases/navare-forwarders', description: 'Dynamic ERD & cargo cut-off dates across all of your shipments', icon: '/assets/icons/For exporters.svg' },

      ],
      promocardImage: '/assets/images/meeting.jpg',
      promocardDescription: 'Gain access to the most complete and accurate container tracking data, along with process improvement.',
      buttonLink: '/testimonials',
      buttonText: 'Read Customer Success Stories',
      linkOnCard: '/testimonials',
    },
    resources: {
      options: [
        { id: 1, title: 'News and Insights', href: '/insights', description: 'Comprehensive guides and API documentation along with process improvement', icon: '/assets/icons/news.svg' },
        { id: 2, title: 'Customer Testimonial', href: '/testimonials', description: 'Latest insights and industry updates along with process improvement', icon: '/assets/icons/testimonial.svg' },
        { id: 3, title: 'Frequesntly Asked Questions', href: '/faq', description: 'Real-world success stories along with process improvement', icon: '/assets/icons/faq.svg' },

      ],
      promocardImage: '/assets/images/meeting.jpg',
      promocardDescription: 'Stay updated with the latest industry insights and best practices.',
      buttonLink: '/testimonials',
      buttonText: 'Read Customer Success Stories',
      linkOnCard: '/testimonials',
    },
    company: {
      options: [
        { id: 1, title: 'About Us', href: '/about-us', description: 'Learn about the story behind our company and our mission', icon: '/assets/icons/about-us.svg' },
        { id: 2, title: 'Careers', href: '/careers', description: 'Learn about the story behind our company and our mission', icon: '/assets/icons/careers.svg' },
        { id: 3, title: 'Teams', href: '/team', description: 'Meet the talented people driving our vision forward and shaping the future of our company.', icon: '/assets/icons/team-logo.svg' },
        { id: 4, title: 'Contact Us', href: '/contact-us', description: 'Learn about the story behind our company and our mission', icon: '/assets/icons/contact-us.svg' },
      ],
      promocardImage: '/assets/images/meeting.jpg',
      promocardDescription: 'Discover the value of the Container Lifecycle Management® platform. Tools for calculating demurrage & detention cost savings, and more..',
      buttonLink: '/testimonials',
      buttonText: 'Read Customer Success Stories',
      linkOnCard: '###',
    },
  },
};
