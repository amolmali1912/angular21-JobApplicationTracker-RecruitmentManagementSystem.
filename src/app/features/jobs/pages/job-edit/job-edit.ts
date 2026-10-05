import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job, JobFormValue } from '../../models/job.model';
import { JobForm } from '../../components/job-form/job-form';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-job-edit',
  imports: [JobForm],
  templateUrl: './job-edit.html',
  styleUrl: './job-edit.scss',
})
export class JobEdit {
  private readonly route = inject(ActivatedRoute);
  private readonly jobsService = inject(JobsService);
  private readonly router = inject(Router);

  protected readonly initialValue: JobFormValue | undefined;

  constructor() {
    const jobId = this.route.snapshot.paramMap.get('id');

    const job = this.jobsService.getJobById(jobId ?? '');

    if (job) {
      this.initialValue = {
        title: job.title,
        department: job.department,
        location: job.location,
        employmentType: job.employmentType,
        experience: job.experience,
        status: job.status,
      };
    }
  }

  protected onFormSubmitted(formValue: JobFormValue): void {
    const jobId = this.route.snapshot.paramMap.get('id');

    if (!jobId) {
      return;
    }

    const updatedJob = this.jobsService.updateJob(jobId, formValue);

    if (!updatedJob) {
      return;
    }

    this.router.navigate(['/jobs'], {
      state: {
        message: 'Job updated successfully.',
      },
    });
  }

  protected onCancel(): void {
    this.router.navigate(['/jobs']);
  }
}
