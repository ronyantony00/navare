import Button from '@/components/atoms/CustomButton/Button';
import TestimonialHeader from '@/components/atoms/TestimonialHeader/TestimonialHeader';

type TestimonialVariant = 'quote' | 'review' | 'case-study';

interface BaseTestimonial {
  id?: number;
  variant?: TestimonialVariant;
  headline?: string;
}

interface QuoteTestimonial extends BaseTestimonial {
  variant?: 'quote';
  content: string;
  author: {
    name: string;
    title: string;
    company: string;
  };
}

interface ReviewTestimonial extends BaseTestimonial {
  variant?: 'review';
  content: string;
  reviewLink: {
    text: string;
    url: string;
  };
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

interface CaseStudyTestimonial extends BaseTestimonial {
  variant?: 'case-study';
  category?: string;
  categoryDescription?: string;
  metric: string;
  link: {
    text: string;
    url: string;
  };
}

type TestimonialData = QuoteTestimonial | ReviewTestimonial | CaseStudyTestimonial;

interface TestimonialCardProps {
  data: TestimonialData;
  category?: string;
}

const TestimonialPageCard = ({ data, category }: TestimonialCardProps) => {
  const getWrapperClasses = () => {
    const baseClasses = 'border border-subtle-border rounded-md-3 p-space-12 bg-secondary h-full';
    return baseClasses;
  };

  return (
    <div className="h-full">
      {data.variant === 'case-study' && (
        <div className={getWrapperClasses()}>
          <div className="flex flex-col justify-between h-full gap-space-20">
            <div className="flex flex-col gap-space-10">
              <div className="flex flex-col text-size-3xs">
                <div className="font-normal text-secondary-text">{data.category || category}</div>
                <div className="text-subtle-text">{data.categoryDescription}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-primary text-size-lg-2 font-semibold -mb-space-15">“</div>
                <div className="text-[36px] text-secondary-text font-medium">{data.metric}</div>
              </div>
            </div>
            <div>
              <Button variant="linkButton" mainClass="rounded-xs-2 px-space-03 w-fit" link={data.link.url} text={data.link.text} />
            </div>
          </div>
        </div>
      )}
      {data.variant === 'quote' && (
        <div className={getWrapperClasses()}>
          <div className="flex flex-col justify-between h-full gap-space-12">
            <div className="flex flex-col gap-space-05">
              <div className="text-primary text-size-2md font-semibold -mb-space-15">“</div>
              <div className="text-size-sm text-secondary-text font-medium">{data.headline}</div>
              <div className="text-size-3xs text-subtle-text font-normal leading-7">{data.content}</div>
            </div>
            <TestimonialHeader name={data.author.name} description={data.author.title} image={data.author.company} />
          </div>
        </div>
      )}
      {data.variant === 'review' && (
        <div className={getWrapperClasses()}>
          <div className="flex flex-col justify-between h-full gap-space-12">
            <div className="flex flex-col gap-space-05">
              <div className="text-primary text-size-2md font-semibold -mb-space-15">“</div>
              <div className="text-size-sm text-secondary-text font-medium">{data.headline}</div>
              <div className="text-size-3xs text-subtle-text font-normal leading-7">{data.content}</div>
            </div>
            <a href={data.reviewLink.url} className="text-link text-size-4xs underline">{data.reviewLink.text}</a>
            <TestimonialHeader image={data.author.avatar} imageType="avatar" name={data.author.name} description={data.author.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialPageCard;
