import type { JobData, PaginationMeta } from '@/types/apiTypes';
import { getCareersDataClientPaginated } from './apiService';

export interface JobSearchParams {
  page: number;
  pageSize: number;
  filters?: any[];
  searchTerm?: string;
}

export interface JobSearchResult {
  data: JobData[];
  meta: {
    pagination: PaginationMeta;
  };
}

export class JobService {
  static async searchJobs(params: JobSearchParams): Promise<JobSearchResult> {
    try {
      const response = await getCareersDataClientPaginated(
        params.page,
        params.pageSize,
        params.filters,
        params.searchTerm,
      );
      return {
        data: response.data,
        meta: {
          pagination: response.meta?.pagination || { page: 1, pageSize: params.pageSize, pageCount: 1, total: 0 },
        },
      };
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw new Error('Failed to search jobs. Please try again.');
    }
  }

  static async getJobsWithFilters(params: JobSearchParams): Promise<JobSearchResult> {
    try {
      const response = await getCareersDataClientPaginated(
        params.page,
        params.pageSize,
        params.filters,
      );
      return {
        data: response.data,
        meta: {
          pagination: response.meta?.pagination || { page: 1, pageSize: params.pageSize, pageCount: 1, total: 0 },
        },
      };
    } catch (error) {
      console.error('Error fetching jobs with filters:', error);
      throw new Error('Failed to fetch jobs with filters. Please try again.');
    }
  }

  static async getJobs(params: JobSearchParams): Promise<JobSearchResult> {
    try {
      const response = await getCareersDataClientPaginated(
        params.page,
        params.pageSize,
      );
      return {
        data: response.data,
        meta: {
          pagination: response.meta?.pagination || { page: 1, pageSize: params.pageSize, pageCount: 1, total: 0 },
        },
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs. Please try again.');
    }
  }
}
