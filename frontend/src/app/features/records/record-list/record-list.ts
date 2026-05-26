import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordService } from '@core/services/record.service';
import { AuthService } from '@core/services/auth.service';
import { Record } from '@shared/interfaces/record.model';
import { Table } from '@shared/components/table/table';

@Component({
  selector: 'app-record-list',
  imports: [CommonModule, Table],
  templateUrl: './record-list.html',
  styleUrl: './record-list.scss',
})
export class RecordList implements OnInit {
  private recordService = inject(RecordService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  records: Record[] = [];
  isLoading = false;
  errorMessage = '';

  columns = [
    { label: 'User', key: 'userId.name', width: '150px' },
    { label: 'Title', key: 'title', width: '200px' },
    { label: 'Description', key: 'description', width: '300px' },
    { label: 'Created', key: 'createdAt', width: '150px' },

  ];

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords() {
    this.isLoading = true;
    this.errorMessage = '';

    this.recordService.getRecords().subscribe({
      next: (response) => {
        this.records = response.records;
        this.isLoading = false;
        this.cdr.detectChanges();

        console.log(response);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load records. Please try again later.';
        this.isLoading = false;
        this.cdr.detectChanges();

        console.log(err);
      },
    });
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  get currentUserName() {
    return this.authService.currentUser()?.name || 'Unknown User';
  }
}
