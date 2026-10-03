import { Component, computed, inject, signal } from '@angular/core';
import { JobsService } from './services/jobs.service';
import { Job, JobStatus } from './models/job.model';
import { TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-jobs',
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class Jobs {
  private readonly jobsService = inject(JobsService);
  private readonly router = inject(Router);

  protected readonly jobs = signal<Job[]>([]);

  protected readonly searchTerm = signal('');

  protected readonly statusFilter = signal<JobStatus | 'all'>('all');

  protected readonly departmentFilter = signal('all');

  protected readonly successMessage = signal('');

  protected readonly jobToDelete = signal<Job | null>(null);

  protected readonly filteredJobs = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();
    const department = this.departmentFilter();

    return this.jobs().filter((job) => {
      const matchesSearch = !search || job.title.toLowerCase().includes(search);

      const matchesStatus = status === 'all' || job.status === status;

      const matchesDepartment = department === 'all' || job.department === department;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  });

  constructor() {
    this.jobs.set(this.jobsService.getJobs());

    const navigation = this.router.getCurrentNavigation();

    const message = navigation?.extras.state?.['message'];

    if (message) {
      this.successMessage.set(message);

      setTimeout(() => {
        this.successMessage.set('');
      }, 3000);
    }
  }

  protected clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('all');
    this.departmentFilter.set('all');
  }

  protected onDelete(job: Job): void {
    this.jobToDelete.set(job);
  }

  protected cancelDelete(): void {
    this.jobToDelete.set(null);
  }

  protected confirmDelete(): void {
    const job = this.jobToDelete();

    if (!job) {
      return;
    }

    const deleted = this.jobsService.deleteJob(job.id);

    if (!deleted) {
      return;
    }

    this.jobs.update((jobs) => jobs.filter((currentJob) => currentJob.id !== job.id));

    this.jobToDelete.set(null);

    this.successMessage.set('Job deleted successfully.');

    setTimeout(() => {
      this.successMessage.set('');
    }, 3000);
  }
}
