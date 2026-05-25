/**
 * Generic API response wrapper
 */

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
}
