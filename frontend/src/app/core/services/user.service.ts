import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@shared/interfaces';
import {environment} from '../../../environments/environment';

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
        return this.http.get<UsersResponse>(`${environment.apiUrl}/admin/users`, {
            withCredentials: true,
        })
    }

    createUser(userData : {email : string; password : string; name : string}) {
        return this.http.post<UserResponse>(`${environment.apiUrl}/admin/users/register`, userData, {
            withCredentials: true,
        })
    }


    updateUser(userId: string, userData : {email : string; name : string}) {
        return this.http.patch<UserResponse>(`${environment.apiUrl}/admin/users/update/${userId}`, userData, {
            withCredentials: true,
        })
    }

    deleteUser (userId: string) {
        return this.http.delete<{message : string}>(`${environment.apiUrl}/admin/users/delete/${userId}`, {
            withCredentials: true,
        })
    }
}