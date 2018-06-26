import { Pipe } from '@angular/core';

@Pipe({
    name: 'reportSearch'
})
export class ReportSearchPipe {
    transform(reportsList:any[], search:string):any {
        if(!reportsList || !search) {
            return reportsList;
        }
        return reportsList.filter(report => {
            let SearchTag = search.toLowerCase();
            let title = report.title.toLowerCase();
            let description = report.description.toLowerCase();
            let location = report.location.toLowerCase();

            if(title.indexOf(SearchTag) !== -1 || description.indexOf(SearchTag) !== -1 || location.indexOf(SearchTag) !== -1) {
                return report;
            }
        })
    }
}