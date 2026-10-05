import { Injectable } from '@angular/core';
import { Job } from '../models/job.model';
import { MOCK_JOBS } from '../data/jobs.mock';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  getJobs(): Job[] {
    return MOCK_JOBS;
  }

  getJobById(id: string): Job | undefined {
    return MOCK_JOBS.find((job) => job.id === id);
  }

  // updateJob(updatedJob: Job): void {
  //   const jobIndex = MOCK_JOBS.findIndex((job) => job.id === updatedJob.id);

  //   if (jobIndex === -1) {
  //     return;
  //   }

  //   MOCK_JOBS[jobIndex] = updatedJob;
  // }

  updateJob(id: string, changes: Partial<Job>): Job | undefined {
    const job = MOCK_JOBS.find((job) => job.id === id);

    if (!job) {
      return undefined;
    }

    Object.assign(job, changes);

    return job;
  }

  deleteJob(id: string): boolean {
    const jobIndex = MOCK_JOBS.findIndex((job) => job.id === id);

    if (jobIndex === -1) {
      return false;
    }

    MOCK_JOBS.splice(jobIndex, 1);

    return true;
  }

  createJob(job: Job): Job {
    MOCK_JOBS.unshift(job); // we want newly added job should be displayed at first order hence using 'unshift' method
    // MOCK_JOBS.push(job); // if we want newly added job should be displayed in last then use 'push' method

    return job;
  }
}
