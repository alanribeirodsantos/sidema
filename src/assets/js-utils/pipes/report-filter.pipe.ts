import { Pipe } from '@angular/core';

@Pipe({
    name: 'reportFilter'
})
export class ReportFilterPipe {
    transform(reportsList:any[], filters:string[]):any {
        if(!reportsList || !filters) {
            return reportsList;
        }
        return reportsList.filter(report => {
            if( (report.category == filters[0] || !filters[0]) &&
                (report.subcategory == filters[1] || !filters[1]) &&
                (report.status == filters[2] || !filters[2]) ) {
                return report;
            }
        })
    }
}