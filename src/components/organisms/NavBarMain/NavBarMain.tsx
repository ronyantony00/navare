import Navbar from '@/components/molecules/Navbar/Navbar';
import { getArticleToShowNavDataServer, getResourceCompanyNavbarDataServer, getSolutionsNavbarDataServer, getUseCaseNavbarDataServer } from '@/services/apiService';

export const revalidate = 10;

const NavBarMain = async () => {
  const [solutionsNavbarDataResponse, useCaseNavbarDataResponse, articleToShowNavDataResponse, resourceCompanyNavbarDataResponse] = await Promise.all([
    getSolutionsNavbarDataServer(),
    getUseCaseNavbarDataServer(),
    getArticleToShowNavDataServer(),
    getResourceCompanyNavbarDataServer(),
  ]);

  const solutionsNavbarData = solutionsNavbarDataResponse.data;
  const useCaseNavbarData = useCaseNavbarDataResponse.data;
  const articleToShowNavData = articleToShowNavDataResponse.data;
  const resourceCompanyNavbarData = resourceCompanyNavbarDataResponse.data;
  if (!solutionsNavbarData || solutionsNavbarData.length === 0) {
    console.warn('No solutions navbar data available');
    return null;
  }

  return (
    <Navbar
      solutionsNavbarData={solutionsNavbarData}
      useCaseNavbarData={useCaseNavbarData}
      articleToShowNavData={articleToShowNavData}
      resourceCompanyNavbarData={resourceCompanyNavbarData}
    />
  );
};

export default NavBarMain;
