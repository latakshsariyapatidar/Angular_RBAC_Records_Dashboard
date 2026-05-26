import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@shared/interfaces';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface UsersResponse {
    message : string;
    users : User[];
}

interface UserResponse {
    message : string;
    user : User;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {
    private http = inject(HttpClient);

    getUsers() {
        return this.http.get<UsersResponse>('/api/admin/users', {
            withCredentials: true,
        })
    }

    createUser(userData : {email : string; password : string; name : string}) {
        return this.http.post<UserResponse>('/api/admin/users/register', userData, {
            withCredentials: true,
        })
    }


    updateUser(userId: string, userData : {email : string; name : string}) {
        return this.http.put<UserResponse>(`/api/admin/users/${userId}`, userData, {
            withCredentials: true,
        })
    }

    deleteUser (userId: string) {
        return this.http.delete<{message : string}>(`/api/admin/users/${userId}`, {
            withCredentials: true,
        })
    }
}