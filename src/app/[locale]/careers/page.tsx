import React from 'react';
import CareerForm from '@/components/molecules/CareerForm/CareerForm';
import CareersJobListing from '@/components/molecules/CareersJobListing/CareersJobListing';
import CareersSection from '@/components/organisms/CareersSection/CareersSection';
import { getAllCareersDataServer, getCareersDataServerPaginated, getCareersPageDataServer } from '@/services/apiService';

export const revalidate = 10;

const Page = async () => {
  const [careersPageResponse, careersResponse, allCareersResponse] = await Promise.all([
    getCareersPageDataServer(),
    getCareersDataServerPaginated(1, 4),
    getAllCareersDataServer(),
  ]);

  const { data: careersPageData, meta: _careersPageMeta } = careersPageResponse;
  const { data: careersData, meta: _careersDataMeta } = careersResponse;
  const { data: allCareersData } = allCareersResponse;

  return (
    <div className="w-full flex flex-col items-center">
      <CareersSection carerrHeroData={careersPageData} />
      <div className="w-full max-w-maxwidth flex flex-col items-center justify-center bg-landing-hero-bg-color">
        <CareersJobListing sectionTitle={careersPageData?.job_list_section_title} allCareersData={allCareersData} careersData={careersData} paginationMeta={_careersDataMeta?.pagination} />
        <div id="career-form-section">
          <CareerForm
            title={careersPageData?.formTitle}
            description={careersPageData?.formDescription}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
