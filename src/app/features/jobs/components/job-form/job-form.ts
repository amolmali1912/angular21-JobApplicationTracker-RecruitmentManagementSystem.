import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmploymentType, JobFormValue, JobStatus } from '../../models/job.model';

@Component({
  selector: 'app-job-form',
  imports: [ReactiveFormsModule],
  templateUrl: './job-form.html',
  styleUrl: './job-form.scss',
})
export class JobForm implements OnInit {
  readonly initialValue = input<JobFormValue>();

  readonly formSubmitted = output<JobFormValue>();

  readonly cancelled = output();

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

    employmentType: new FormControl<EmploymentType>('full-time', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    experience: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    status: new FormControl<JobStatus>('draft', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    const value = this.initialValue();

    if (value) {
      this.jobForm.patchValue(value);
    }
  }

  protected onSubmit(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    this.formSubmitted.emit(this.jobForm.getRawValue());
  }

  protected onCancel(): void {
    this.cancelled.emit();
  }
}
