import { Address } from './address.model';

export class User {
    
    public id: number;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public address: Address;
    public email: string;
    public countryCode: string;
    public phone: string;
    public position: string;
    public startDate: string;
    public resumeDbPath: string;
}