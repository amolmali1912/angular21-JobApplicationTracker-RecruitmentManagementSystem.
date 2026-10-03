import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-job-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './job-edit.html',
  styleUrl: './job-edit.scss',
})
export class JobEdit {
  private readonly route = inject(ActivatedRoute);
  private readonly jobsService = inject(JobsService);
  private readonly router = inject(Router);

  private readonly jobId = this.route.snapshot.paramMap.get('id') ?? '';

  protected readonly jobForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),

    department: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    location: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    // const jobId = this.route.snapshot.paramMap.get('id');

    const job = this.jobsService.getJobById(this.jobId ?? '');

    if (job) {
      this.jobForm.patchValue({
        title: job.title,
        department: job.department,
        location: job.location,
      });
    }
  }

  protected onSubmit(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    // const jobId = this.route.snapshot.paramMap.get('id');

    if (!this.jobId) {
      return;
    }

    console.log('this.jobForm.getRawValue()');
    console.log(this.jobForm.getRawValue());

    const updatedJob = this.jobsService.updateJob(this.jobId, this.jobForm.getRawValue());

    if (!updatedJob) {
      return;
    }

    this.router.navigate(['/jobs'], {
      state: {
        message: 'Job updated successfully.',
      },
    });
    console.log('Updated Job:', updatedJob);
  }

  protected onCancel(): void {
    this.router.navigate(['/jobs']);
  }
}
