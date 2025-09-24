import CareerDetailPage from '@/components/molecules/CareerDetailPage/CareerDetailPage';
import { getCareerDeatilDataServer } from '@/services/apiService';

interface PageProps {
  params: Promise<{ jobType: string }>;
}

const Page = async (props: PageProps) => {
  const params = await props.params;

  const careerDetailDataResponse = await getCareerDeatilDataServer(params.jobType);
  const careerDetailData = careerDetailDataResponse?.data;

  const job = careerDetailData?.[0];

  return (
    <CareerDetailPage job={job} />
  );
};

export default Page;
