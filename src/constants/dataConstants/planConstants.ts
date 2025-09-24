import ImageConstants from '@/constants/imageConstants/imageConstants';

export const ADD_ONS_TAG = 'ADD-ONS';
export const SCHEDULE_A_DEMO = 'Schedule a Demo';
export const VIEW_ALL_ADD_ONS = 'View all Add-ons';

export const PlanConstants = [
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
    buttonLink: '#',
  },
  {
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
    buttonLink: '#',
  },
  {
    planType: 'BUNDLED',
    planTier: 'ENCHANCEMENTS',
    planBadge: 'ADD-ONS',
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
    buttonText: 'View All CLM Add-Ons',
    buttonLink: '###',
  },
];
