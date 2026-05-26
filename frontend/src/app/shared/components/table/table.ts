import { Component, input, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
})
export class Table {

  @Input() columns: Array <{label: string; key: string; width?: string}> = [];

  @Input() rows: any[] = [];

  @Input() isLoading = false;

  @Input() emptyMessage = 'No data available';

  getNestedValue(obj: any, key:string): any {
    return key.split('.').reduce((acc, part) => acc?.[part], obj);
  }


  formatValue(value : any) : string {
    if (value === null || value === undefined) return '-';
    if (value instanceof Date) return value.toLocaleDateString();
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  }
}
