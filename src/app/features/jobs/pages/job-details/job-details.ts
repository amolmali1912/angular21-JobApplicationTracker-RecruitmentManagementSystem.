import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-details',
  imports: [DatePipe, RouterLink],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss',
})
export class JobDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly jobsService = inject(JobsService);

  protected readonly job = this.jobsService.getJobById(
    this.route.snapshot.paramMap.get('id') ?? '',
  );
}
