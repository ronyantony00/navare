import TestimonialHeader from '../TestimonialHeader/TestimonialHeader';

interface AboutPageTestimonialProps {
  title: string;
  testimonial: string;
  companyLogo: string;
  authorName: string;
  authorPosition: string;
}

const AboutPageTestimonial = ({ title, testimonial, companyLogo, authorName, authorPosition }: AboutPageTestimonialProps) => {
  return (
    <div className="flex flex-col mt-space-05 text-secondary-text">
      <div className="text-size-sm font-medium mb-space-06">
        {title}
      </div>
      <div className="text-size-3xs text-subtle-text">
        {testimonial}
      </div>
      <div className="mt-space-10 2xs:mb-space-05"><TestimonialHeader image={companyLogo} name={authorName} description={authorPosition} /></div>
    </div>
  );
};

export default AboutPageTestimonial;
