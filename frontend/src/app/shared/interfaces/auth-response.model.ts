/**
 * API response shape for authentication endpoints.
 */

import {User} from './user.model';

export interface AuthResponse{
    message: string;
    user: User;
    token : string;
}