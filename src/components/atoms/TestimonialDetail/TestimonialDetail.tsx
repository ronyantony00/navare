import type { Testimonial } from '@/types/apiTypes';
import Image from 'next/image';
import Link from 'next/link';
import RichTextRenderer from '@/components/molecules/RichText/RichText';
import { getImageUrl } from '@/utils/urlConstructor';
import JobInfoItem from '../JobInfoCard/JobInfoCard';
import TextCombo from '../TextCombo/TextCombo';
import AuthorProfile from '../AuthorProfile/AuthorProfile';

interface TestimonialDetailProps {
  data?: Testimonial[];
  title?: string;
}

const TestimonialDetail = ({ data, title }: TestimonialDetailProps) => {
  let testimonial: Testimonial | null = null;

  if (data) {
    if (Array.isArray(data) && data.length > 0) {
      testimonial = data[0] || null;
    } else if (!Array.isArray(data)) {
      testimonial = data as Testimonial;
    }
  }

  // Safe media access
  const mediaUrl = testimonial?.testimonialDetailPageMedia?.url;

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return '';
    }
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  // Early return if no testimonial data
  if (!testimonial) {
    return (
      <div className="section-padding-x section-padding-y mx-auto max-w-maxwidth bg-navare-green">
        <div className="flex flex-col py-space-15 2md:py-space-30">
          <TextCombo
            title={title}
            titleClass="hero-title"
            className="md:max-w-pct-080"
          />
          <div className="w-full flex justify-center py-space-20">
            <div className="small-content text-text-placeholder">No testimonial data available.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding-x section-padding-y mx-auto max-w-maxwidth bg-navare-green">
      <div className="flex flex-col py-space-15 2md:py-space-30">
        <TextCombo
          title={title}
          titleClass="hero-title"
          className="md:max-w-pct-080"
        />
        <div className="w-full mt-space-24 md:mt-space-32 min-h-space-38 p-space-10 md:p-space-21 rounded-lg stories-card-bg flex flex-col items-center gap-space-10 z-50 border border-border-color 2md:max-h-[160px]">
          <div className="w-full flex 2md:flex-row flex-col 2md:items-center 2md:justify-between 2md:gap-space-08 gap-space-10 lg:px-space-20">
            <JobInfoItem label="Published On" value={formatDate(testimonial.publishedAt)} />
            <div className="bg-primary 2md:w-space-01 w-full 2md:h-auto h-space-01 self-stretch"></div>
            <JobInfoItem label="Written By" value={testimonial.authorName || ''} />
            <div className="bg-primary 2md:w-space-01 w-full 2md:h-auto h-space-01 self-stretch"></div>
            <JobInfoItem label="Read time" value={testimonial.studyOn || '5 min read'} />
            <div className="bg-primary 2md:w-space-01 w-full 2md:h-auto h-space-01 self-stretch"></div>
            <JobInfoItem label="Category" value="Testimonial" />
          </div>
        </div>
        <div className="border border-border-color mt-space-10 md:mt-space-20 rounded-md-3 flex flex-col gap-space-19 px-space-08 md:px-space-15 py-space-10 md:py-space-22">
          {testimonial.authorName && (
            <AuthorProfile
              avatarUrl={testimonial.authorAvatar?.url ? getImageUrl(testimonial.authorAvatar.url) : null}
              name={testimonial.authorName}
              role={testimonial.authorTitle || testimonial.authorCompany || 'Product Designer'}
            />
          )}
          <div className="flex flex-col">
            <TextCombo title={testimonial.title} titleClass="card-title" className="2xs:max-w-pct-080 2md:max-w-pct-050 w-fit" />
            {testimonial.content && (
              <RichTextRenderer content={testimonial.content} />
            )}
            {mediaUrl && (
              <div className="h-full w-full max-h-space-250 border rounded-[20px] overflow-hidden">
                <Image src={getImageUrl(mediaUrl)} alt="Testimonial Image" width={1000} height={1000} className="object-contain w-full" />
              </div>
            )}
            <Link href="/schedule-demo" className="primaty-content text-primary underline mt-space-12">
              Click here to schedule a demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialDetail;
