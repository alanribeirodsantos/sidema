import { Routes, RouterModule } from '@angular/router';

import { StyleguideComponent } from './pages/styleguide/styleguide.component';
import { HomeComponent } from './pages/home/home.component';
import { SystemComponent } from './pages/system/system.component';
import { ReportsListComponent } from './pages/system/reports-list/reports-list.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const APP_ROUTES: Routes = [
    {path: "", redirectTo: "/styleguide", pathMatch: "full"},
    {path: "styleguide", component: StyleguideComponent},
    {path: "home", component: HomeComponent},
    {path: "about-us", component: AboutUsComponent},
    {path: "sistema", component: SystemComponent, children:[
        {path: "", redirectTo: "denuncias", pathMatch: "full"},
        {path: "denuncias", component: ReportsListComponent}
    ]},
];

export const routing = RouterModule.forRoot(APP_ROUTES);