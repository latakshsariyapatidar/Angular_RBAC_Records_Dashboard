/**
 * Record model — represents a data record in the system.
 */

export interface Record {
    _id : string;
    userId : any;
    title? : string;
    description? : string;
    createdAt: string;
    __v? : number;
}