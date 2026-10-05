import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JobForm } from '../../components/job-form/job-form';
import { JobsService } from '../../services/jobs.service';
import { JobFormValue } from '../../models/job.model';

@Component({
  selector: 'app-job-create',
  imports: [JobForm],
  templateUrl: './job-create.html',
  styleUrl: './job-create.scss',
})
export class JobCreate {
  private readonly router = inject(Router);
  private readonly jobsService = inject(JobsService);

  protected onFormSubmitted(formValue: JobFormValue): void {
    const newJob = {
      id: crypto.randomUUID(),
      ...formValue,
      applicantsCount: 0,
      postedDate: new Date().toISOString(),
    };

    this.jobsService.createJob(newJob);

    this.router.navigate(['/jobs'], {
      state: {
        message: 'Job created successfully.',
      },
    });
  }

  protected onCancel(): void {
    this.router.navigate(['/jobs']);
  }
}
