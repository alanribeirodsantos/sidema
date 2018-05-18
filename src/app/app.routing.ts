import { Routes, RouterModule } from '@angular/router';

import { StyleguideComponent } from './pages/styleguide/styleguide.component';
import { HomeComponent } from './pages/home/home.component';
import { SystemComponent } from './pages/system/system.component';
import { ReportsListComponent } from './pages/system/reports-list/reports-list.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ReportingComponent } from './pages/system/reporting/reporting.component';
import { EditProfileComponent } from './pages/system/edit-profile/edit-profile.component';
import { ReportDetailsComponent } from './pages/system/report-details/report-details.component';

const APP_ROUTES: Routes = [
    {path: "", redirectTo: "/styleguide", pathMatch: "full"},
    {path: "styleguide", component: StyleguideComponent},
    {path: "home", component: HomeComponent},
    {path: "sobre-nos", component: AboutUsComponent},
    {path: "FAQ", component: FaqComponent},
    {path: "sistema", component: SystemComponent, children:[
        {path: "", redirectTo: "denuncias", pathMatch: "full"},
        {path: "denuncias", component: ReportsListComponent},
        {path: "denunciar", component: ReportingComponent},
        {path: "perfil", component: EditProfileComponent},
        {path: "denuncia", component: ReportDetailsComponent}
    ]},
];

export const routing = RouterModule.forRoot(APP_ROUTES);