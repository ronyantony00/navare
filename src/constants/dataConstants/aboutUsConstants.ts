export const aboutUsConstants = {
  title: 'The story behind our company',
  heroSection: {
    shortIntro: 'Founded in 2017 in Charleston, SC, Gnosis Freight started its journey through deep collaboration with key partners in the supply chain industry – tasked with understanding supply chain’s most critical pain points and addressing them head-on. Today, Gnosis Freight is the industry leader in Container Lifecycle Management, providing end-to-end supply chain visibility and automation solutions to logistics companies worldwide.',
    coverImage: '/assets/images/hero-image.jpg',
  },
  Statements: [
    {
      id: 1,
      title: 'Who we are',
      body: 'We are a team of data scientists, software engineers, and logistics specialists based in Charleston, South Carolina. Our mission is simple: Help logistics companies work together better. We are doing this by providing an ecosystem that allows partners in the supply chain industry to collaborate more efficiently and effectively.',
    },
    {
      id: 2,
      title: 'Our mission',
      body: 'Our customers told us they were tired of countless spreadsheets and emails, and we listened! The Container Lifecycle Management™ platform gives our customers one place to seamlessly collaborate and share data with their partners. Gnosis Freight removes data out of its previous ‘silos’, opening the floodgates for improved ways of doing business. Each module and feature of the Container Lifecycle Management™ platform was inspired by a specific customer’s request or pain point.',
    },
  ],
  testimonial: {
    title: 'Long Time User and Customer',
    content: '"Gnosis can provide a tailored platform for any part of your supply chain. The team there works hard and also I have found they bring solutions to problems that I did not even know I had. The team is responsive and explains complex issues to me in a manner that I can understand and relay to my team in an ever changing logistics world"',
    companyLogo: '/assets/images/company-logo(8).png',
    authorName: 'Chandler Bing',
    authorTitle: 'Director of Procurement',
  },
};

export const COMPANY_STATS = [
  {
    id: 1,
    value: '14Y',
    label: 'Experience in IT Sector',
  },
  {
    id: 2,
    value: '10M+',
    label: 'Satisfied Client',
  },
  {
    id: 3,
    value: '100+',
    label: 'Dedicated Employee',
  },
  {
    id: 4,
    value: '1500+',
    label: 'Project Completed',
  },
];

export const ABOUT_US_TESTIMONIAL = {
  title: [
    {
      text: 'What Our Clients Say',
      tag: 'h2', // assuming `title[]` means an array of objects with heading tags
    },
  ],
  testimonial: {
    title: 'Exceptional Service & Support',
    author: {
      name: 'John Doe',
      designation: 'CEO, Tech Solutions Inc.',
      image: '/images/testimonials/john-doe.jpg',
    },
    testimonial:
      'We’ve been working with this team for over 3 years and the experience has been absolutely outstanding. From start to finish, their professionalism and communication have been top-notch.',
  },
  media: {
    url: '/videos/client-review.mp4',
  },
  bgImage: '/images/about-us/testimonialCardBg.jpg',
};
