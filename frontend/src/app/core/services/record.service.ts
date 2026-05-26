import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Record} from '@shared/interfaces/record.model';

interface RecordsResponse {
    message : string;
    records: Record[];
}

@Injectable ({
    providedIn: 'root'
})


export class RecordService {
    private http = inject(HttpClient);

    getRecords() {
        return this.http.get<RecordsResponse>('/api/records/', {
            withCredentials: true
        });
    }
}