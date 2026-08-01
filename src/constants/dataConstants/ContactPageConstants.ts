interface QuoteTestimonial {
  id: number;
  variant: 'quote';
  content: string;
  author: {
    name: string;
    title: string;
    company: string;
  };
}

export const options = [
  { id: 1, label: 'Instagram', value: 'instagram' },
  { id: 2, label: 'Facebook', value: 'facebook' },
  { id: 3, label: 'LinkedIn', value: 'linkedin' },
  { id: 4, label: 'Google Search', value: 'google' },
  { id: 5, label: 'YouTube', value: 'youtube' },
  { id: 6, label: 'Friend or Colleague', value: 'referral' },
  { id: 7, label: 'Blog or Article', value: 'blog' },
  { id: 8, label: 'Other', value: 'other' },
];

export const faq = [
  {
    id: 1,
    question: 'What is container lifecycle management?',
    answer:
      'Container lifecycle management refers to the process of tracking, maintaining, and optimizing shipping containers throughout their usage lifecycle—from manufacturing and deployment to repair, reuse, and decommissioning.',
  },
  {
    id: 2,
    question: 'How can your platform help reduce container downtime?',
    answer:
      'Our platform provides real-time visibility and predictive analytics that help identify when and where containers are idle, underutilized, or in need of maintenance—allowing proactive decision-making and reduced turnaround times.',
  },
  {
    id: 3,
    question: 'Do you support integrations with existing ERP or TMS systems?',
    answer:
      'Yes, our solution is API-friendly and can integrate seamlessly with most major ERP and transportation management systems to ensure data consistency across platforms.',
  },
  {
    id: 4,
    question: 'Can I track the condition and repair history of individual containers?',
    answer:
      'Absolutely. Our system maintains a complete digital record of each container, including inspection reports, repair history, and location data—enabling better asset utilization and compliance tracking.',
  },
  {
    id: 5,
    question: 'Is your platform suitable for small shipping companies?',
    answer:
      'Yes, our platform is scalable and customizable. Whether you manage a few hundred containers or several thousand, we provide the tools you need to streamline operations efficiently.',
  },
  {
    id: 6,
    question: 'Is your platform suitable for small shipping companies?',
    answer:
      'Yes, our platform is scalable and customizable. Whether you manage a few hundred containers or several thousand, we provide the tools you need to streamline operations efficiently.',
  },
];

export const data: QuoteTestimonial[] = [
  {
    id: 1,
    variant: 'quote',
    content:
      'As a startup, we needed a solid HR foundation, and TalentBridge delivered beyond our expectations. We now have the structure we need to scale.',
    author: {
      name: 'Samantha Lee',
      title: 'Co-Founder & COO',
      company: '/assets/images/company-logo(2).png',
    },
  },
  {
    id: 2,
    variant: 'quote',
    content:
      'Working with TalentBridge streamlined our talent acquisition process immensely. Their approach is both strategic and human-centered.',
    author: {
      name: 'Michael Tan',
      title: 'HR Director',
      company: '/assets/images/company-logo(2).png',
    },
  },
  {
    id: 3,
    variant: 'quote',
    content:
      'We were struggling with employee retention until we partnered with TalentBridge. Their guidance on culture and engagement made a measurable difference.',
    author: {
      name: 'Priya Desai',
      title: 'VP of People Operations',
      company: '/assets/images/company-logo(2).png',
    },
  },
  {
    id: 4,
    variant: 'quote',
    content:
      'TalentBridge is more than a consultancy—they’re a growth partner. Their team helped us refine policies, onboard better, and boost morale.',
    author: {
      name: 'David Kim',
      title: 'CEO',
      company: '/assets/images/company-logo(2).png',
    },
  },
];

export const contactDetails = [
  {
    id: 1,
    title: 'Email address',
    info: 'info@navareglobal.com, vrn@navaresolutions.co.nz, arun@navareglobal.com',
  },
  {
    id: 2,
    title: 'Phone number',
    info: '+1 234 567 899',
  },
  {
    id: 3,
    title: 'Our location',
    info: '123 HR Solutions Street, Suite 509, Toronto, ON, Canada',
  },
];
