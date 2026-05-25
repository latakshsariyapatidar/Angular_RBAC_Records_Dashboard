/**
 * Record model — represents a data record in the system.
 */

export interface Record {
    _id : string;
    userId : string;
    data : any;
    createdAt: string;
}