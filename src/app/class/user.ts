import { Report } from './report';
export class User{
    constructor(
        id: number,
        name: string,
        email: string,
        passoword: string,
        picture: any,
        report: Array<Report>,
    ){}
}