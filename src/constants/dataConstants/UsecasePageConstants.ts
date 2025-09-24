import type { AnalyticsCardData } from '@/types/usecase';
import ImageConstants from '../imageConstants/imageConstants';

export const UsecaseConstants = [
  {
    id: 1,
    slug: 'import-management',
    pageIntro: {
      titlePrefix: 'A Smarter Way to Track & Manage your',
      titleHighlight: 'Import Containers',
      description: 'Gain access to the most complete and accurate container tracking data, along with process improvement and automation tools, enabling seamless collaboration with all of your logistics partners on a single platform.',
      tagText: 'CLM for Importers',
      image: '/assets/images/container-demo.jpg',
    },
    CardSection: {
      titlePrefix: 'CLM For',
      titleHighlight: 'Importers',
      description: 'As importers, you need complete container tracking and tools to manage by exceptions and optimize logistics processes.',
      cardData: [
        {
          id: 1,
          icon: '/assets/icons/click-icon.svg',
          title: 'Enhanced Visibility & Control',
          description: 'Centralize all your container tracking and management needs. Make more informed decisions and manage your containers more effectively than ever with granular milestones throughout every step of the containers journey.',
        },
        {
          id: 2,
          icon: '/assets/icons/calender.svg',
          title: 'Significant Time Savings',
          description: 'Stop copying & pasting container data into spreadsheets, spending hours searching carrier websites, and sending emails about container tracking data. Gain real-time container insights all in one platform.',
        },
        {
          id: 3,
          icon: '/assets/icons/settings-icon.svg',
          title: 'Reduced Logistics Costs',
          description: 'With tools built specifically for logistics professionals, our customers report average savings of more than $100 per container, with some saving millions yearly on demurrage & detention alone.',
        },
      ],
    },
    AnalyticsSection: {
      cardData: [
        {
          id: 1,
          variant: 'textRight',
          title: {
            titlePrefix: 'Initiate tracking with just the',
            titleHighlight: 'Master Bill of Lading',
          },
          // description: 'Zero integrations required. Track the entire lifecycle of all your containers from in-gate at origin until returned empty to the terminal, with just the Master Bill of Lading (MBL) number.',
          image: '/assets/images/demo-image(1).png',
        },
        {
          id: 2,
          variant: 'textLeft',
          title: {
            titlePrefix: 'One platform for all your',
            titleHighlight: 'Container Tracking Data',
          },
          // description: 'Track every container throughout its entire lifecycle, regardless of the carrier or freight forwarder, and access every milestone and data point you need across ports, terminals, ocean carriers, rail, air, AIS satellite, and customs.',
          // image: '/assets/images/demo-image(2).png',
        },
        {
          id: 3,
          variant: 'textRight',
          title: {
            titlePrefix: 'Avoid unnecessary charges with',
            titleHighlight: 'Demurrage & Detention Alarms®',
          },
          // description: 'Avoid charges with granular milestones such as Last Free Day, Available for Pickup, Rail Notify, and more, directly from both ocean and rail terminals, helping prioritize containers at the highest risk of per diem charges.',
          image: '/assets/images/demo-image(3).png',
        },
        {
          id: 4,
          variant: 'textLeft',
          title: {
            titlePrefix: 'Access to line-item & purchase order data across',
            titleHighlight: 'Containers',
          },
          // description: 'Advanced supply chain visibility into purchase order & line item details across all of your containers such as SKUs, quantities, values, and more.',
          image: '/assets/images/demo-image(4).png',
        },
      ] as AnalyticsCardData[],
    },
    TestimonialSection: [
      {
        id: 1,
        rating: 5,
        title: '$12,000,000+ Savings in Demurrage & Detention',
        testimonial: 'Learn how one top 50 US importer reduced monthly demurrage and detention charges by 85% with a custom demurrage management system within the Gnosis Freight Platform. Want to learn more about how Gnosis can help solve any challenges you’re facing with your supply chain?',
        buttonText: 'Read Customer Success Story',
        buttonLink: '###',
      },
      {
        id: 2,
        rating: 5,
        title: 'Saving $15,000+ per week on Drayage Costs',
        testimonial: 'Raymour & Flanigan is the largest furniture retailer in the Northeast, and the 7th largest in the United States. Gnosis Freight allowed Sauer, a Global Logistics Manager for Raymour & Flanigan, and his team to bring their drayage operations completely in-house while saving them $15,000/week.',
        buttonText: 'Read Customer Success Story',
        buttonLink: '###',
      },
      {
        id: 3,
        author: 'Pieter Potgieter',
        position: 'Corporate Transportation Manager, Hubbell Incorporated',
        companylogo: '/assets/images/company-logo(2).png',
        title: 'Eliminating hundreds of emails a day!',
        testimonial: '"As Transportation Manager I have two types of customers. I have our internal customers, Hubbell’s 16,000 employees worldwide, and external customers, which are our transportation partners, and they all need to know exactly what’s going on. With Gnosis Freight I’m able to give my internal and external customers direct access to the information that’s relevant to them eliminating hundreds of emails a day so I do my job, which is to manage by exception."',
      },
      {
        id: 4,
        author: 'Pieter Potgieter',
        position: 'Corporate Transportation Manager, Hubbell Incorporated',
        companylogo: '/assets/images/company-logo(2).png',
        title: 'Eliminating hundreds of emails a day!',
        testimonial: '"As Transportation Manager I have two types of customers. I have our internal customers, Hubbell’s 16,000 employees worldwide, and external customers, which are our transportation partners, and they all need to know exactly what’s going on. With Gnosis Freight I’m able to give my internal and external customers direct access to the information that’s relevant to them eliminating hundreds of emails a day so I do my job, which is to manage by exception."',
      },
      {
        id: 5,
        author: 'Pieter Potgieter',
        position: 'Corporate Transportation Manager, Hubbell Incorporated',
        companylogo: '/assets/images/company-logo(2).png',
        title: 'Eliminating hundreds of emails a day!',
        testimonial: '"As Transportation Manager I have two types of customers. I have our internal customers, Hubbell’s 16,000 employees worldwide, and external customers, which are our transportation partners, and they all need to know exactly what’s going on. With Gnosis Freight I’m able to give my internal and external customers direct access to the information that’s relevant to them eliminating hundreds of emails a day so I do my job, which is to manage by exception."',
      },
    ],
    PlansSection: {
      title: {
        titlePrefix: 'Discover the Right Plan for',
        titleHighlight: 'Your Business',
      },
      buttonLink: '###',
      buttonText: 'Custom Plan',
      planData: [
        {
          id: 1,
          planType: 'BUNDLED',
          planBadge: 'ESSENTIALS',
          planTypeName: 'CLM',
          planImage: ImageConstants.PlanImage,
          description:
            'Integrate with your ERP and other systems for more advanced supply chain visibility. Gain visibility into the PO/line-item details.',
          features: [
            'All CLM Features',
            'ERP Integration',
            'SKUs, Value, Quantity, Item Description, & More',
            'Purchase Order Visibility & Analytics',
            'Line-Item Visibility & Analytics',
            'Inbound Forecasting',
          ],
          buttonText: 'Schedule a Demo',
          buttonLink: '###',
        },
        {
          id: 2,
          planType: 'BUNDLED',
          planTier: 'PLUS',
          planBadge: 'MOST POPULAR',
          planTypeName: 'CLM',
          description:
            'Integrate with your ERP and other systems for more advanced supply chain visibility. Gain visibility into the PO/line-item details.',
          features: [
            'All CLM Features',
            'ERP Integration',
            'SKUs, Value, Quantity, Item Description, & More',
            'Purchase Order Visibility & Analytics',
            'Line-Item Visibility & Analytics',
            'Inbound Forecasting',
          ],
          buttonText: 'Schedule a Demo',
          buttonLink: '###',
        },
        {
          id: 3,
          planType: 'BUNDLED',
          planTier: 'ENHANCEMENTS',
          planBadge: 'add-ons',
          planTypeName: 'CLM',
          description:
            'Integrate with your ERP and other systems for more advanced supply chain visibility. Gain visibility into the PO/line-item details.',
          features: [
            'All CLM Features',
            'ERP Integration',
            'SKUs, Value, Quantity, Item Description, & More',
            'Purchase Order Visibility & Analytics',
            'Line-Item Visibility & Analytics',
            'Inbound Forecasting',
          ],
          buttonText: 'Schedule a Demo',
          buttonLink: '###',
        },
      ],
    },
  },
];
