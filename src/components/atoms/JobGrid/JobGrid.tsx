import type { JobData } from '@/types/apiTypes';
import React from 'react';
import JobCard from '@/components/atoms/JobCard/JobCard';

interface JobGridProps {
  jobs: JobData[];
}

const JobGrid: React.FC<JobGridProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-1 2md:grid-cols-2 gap-space-12">
      {jobs.map((job: JobData) => (
        <div key={job.id}>
          <JobCard
            title={job.jobTitle}
            department={job.department?.departmentName || ''}
            location={job.job_locations?.jobLocation || job.jobLocation}
            employmentType={job.employmentType?.employmentType || ''}
            href={`/careers/${job.slug}`}
          />
        </div>
      ))}
    </div>
  );
};

export default JobGrid;
