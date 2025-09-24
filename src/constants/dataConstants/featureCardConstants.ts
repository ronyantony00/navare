import ImageConstants from '../imageConstants/imageConstants';

export const AUTO_ADVANCE_TIME = 5000;
export const FeatureCardConstants = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    description: 'Configure dashboards that are built around your supply chain.',
    icon: ImageConstants.ReportingIcon,
    image: ImageConstants.Dashboard,
    color: 'green',
  },
  {
    id: 'shipments',
    title: 'Shipments',
    description: 'Live view of all your shipments with container-level details.',
    icon: ImageConstants.ReportingIcon,
    image: ImageConstants.Shipment,
    color: 'red',
  },
  {
    id: 'rail-tracking',
    title: 'Rail Tracking',
    description: 'View all rail updates pulled directly from Class 1 railroads.',
    icon: ImageConstants.ReportingIcon,
    image: ImageConstants.AlarmMain,
    color: 'blue',
  },
  {
    id: 'dd-alarms',
    title: 'D&D Alarms',
    description: 'Avoid fees with real-time demurrage & detention alerts.',
    icon: ImageConstants.ReportingIcon,
    image: ImageConstants.RailTracking,
    color: 'orange',
  },
  {
    id: 'global-map',
    title: 'Global Map',
    description: 'Visualize your shipments with an interactive map.',
    icon: ImageConstants.ReportingIcon,
    image: ImageConstants.MapMain,
    color: 'purple',
  },
];

export const FeatureTextConstants = [
  {
    icon: ImageConstants.UserIcon,
    title: 'All-in-one Platform.',
    description: 'Collaborate with all your logistics partners in one place.',
  },
  {
    icon: ImageConstants.UserIcon,
    title: 'Filters and custom views.',
    description: 'See only what\'s relevant for each platform user.',
  },
  {
    icon: ImageConstants.UserIcon,
    title: 'Customizable.',
    description: 'Built and designed around the way you do business.',
  },
  {
    icon: ImageConstants.UserIcon,
    title: 'Execution Capabilities.',
    description: 'From booking until empty returned.',
  },
  {
    icon: ImageConstants.UserIcon,
    title: 'User Savings.',
    description: 'Start saving time and put time back in your day with Gnosis.',
  },
  {
    icon: ImageConstants.UserIcon,
    title: 'Scalable.',
    description: 'Designed to support your expanding supply chain operations.',
  },
];

export const FeatureCardConstantsWithText = [
  {
    smallText: 'Use Case',
    title: 'For Importers',
    description: 'Track and manage your containers from the cargo ready date until the container is empty returned',
    image: ImageConstants.SmallIcon,
  },
  {
    smallText: 'Use Case',
    title: 'For Importers',
    description: 'Track and manage your containers from the cargo ready date until the container is empty returned',
    image: ImageConstants.SmallIcon,
  },
  {
    smallText: 'Use Case',
    title: 'For Importers',
    description: 'Track and manage your containers from the cargo ready date until the container is empty returned',
    image: ImageConstants.SmallIcon,
  },
  {
    smallText: 'Use Case',
    title: 'For Importers',
    description: 'Track and manage your containers from the cargo ready date until the container is empty returned',
    image: ImageConstants.SmallIcon,
  },
];
