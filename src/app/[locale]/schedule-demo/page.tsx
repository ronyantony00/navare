import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import BookDemoForm from '@/components/organisms/BookDemoForm/BookDemoForm';
import DemoPageTitleSection from '@/components/organisms/DemoPageTitleSection/DemoPageTitleSection';
import { getDemoPageDataServer } from '@/services/apiService';

export const revalidate = 10;

export default async function Page() {
  const demoPageResponse = await getDemoPageDataServer();

  const demoPageData = Array.isArray(demoPageResponse.data) ? demoPageResponse.data[0] : demoPageResponse.data;

  return (
    <div className="bg-navare-green">
      <div className="relative z-10 section-padding-y section-padding-x max-w-maxwidth mx-auto">
        <div className="flex flex-col gap-space-20 md:gap-space-36 justify-center items-center text-secondary-text">
          <TextCombo
            title={demoPageData?.pageMainTitle || ''}
            titleClass="hero-title"
            className="text-center max-w-pct-095 2md:max-w-pct-90"
          />
          <div className="flex flex-col 2md:flex-row gap-space-22">
            <div className="2md:max-w-space-240">
              <DemoPageTitleSection
                titleDescription={demoPageData?.description || ''}
                bullet_section_heading={demoPageData?.bullet_section_heading || ''}
                bulletPoints={demoPageData?.bullet_point}
              />
            </div>
            <BookDemoForm
              formSectionDescription={demoPageData?.form_section_description || ''}
              formSectionTitle={demoPageData?.form_section_title || []}
              buttonLabel={demoPageData?.submit_button?.button_label || ''}
              buttonLink={demoPageData?.button_link || ''}
              policyText={demoPageData?.policyText || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
