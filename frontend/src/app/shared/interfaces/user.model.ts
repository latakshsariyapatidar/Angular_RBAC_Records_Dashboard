/**
 * User model — represents an authenticated user in the system.
 */

export interface User{
    _id : string;
    email : string;
    name : string;
    role : 'General User' | 'Admin';
}