import { Report } from './report';
export class Organ{
    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        picture: any,
        reports: Array<Report>,
    ){}
}