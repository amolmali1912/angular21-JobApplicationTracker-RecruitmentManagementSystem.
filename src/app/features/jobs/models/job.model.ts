export type JobStatus = 'draft' | 'open' | 'closed';

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  experience: string;
  status: JobStatus;
  applicantsCount: number;
  postedDate: string;
}

export type JobFormValue = Pick<
  Job,
  'title' | 'department' | 'location' | 'employmentType' | 'experience' | 'status'
>;
