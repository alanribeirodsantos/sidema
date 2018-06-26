import { Pipe } from '@angular/core';

@Pipe({
    name: 'myReportsFilter'
})
export class MyReportsFilterPipe {
    transform(reportsList:any[], myReportsIds:any[]):any {
        if(!reportsList || !myReportsIds) {
            return reportsList;
        }
        return reportsList.filter(report => {
            for(let i=0; i < myReportsIds.length; i++) {
                if(report.id == myReportsIds[i].idReport) {
                    return report;
                }
            }
        })
    }
}