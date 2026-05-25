import {Injectable, signal} from '@angular/core';
import {User} from '@shared/interfaces/user.model';

@Injectable({
    providedIn: 'root'
})


export class AuthService {
    currentUser = signal <User | null > (null);

    constructor (){}


    setUser(user : User) {
        this.currentUser.set(user);
    }

    getUser() {
        return this.currentUser();
    }

    isLoggedIn(){
        return this.currentUser() !== null;
    }

    logout(){
        this.currentUser.set(null);
    }

}