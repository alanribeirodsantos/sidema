import { Routes, RouterModule } from '@angular/router';

import { StyleguideComponent } from './pages/styleguide/styleguide.component';
import { HomeComponent } from './pages/home/home.component';
import { SystemComponent } from './pages/system/system.component';

const APP_ROUTES: Routes = [
    {path: "", redirectTo: "/styleguide", pathMatch: "full"},
    {path: "styleguide", component: StyleguideComponent},
    {path: "home", component: HomeComponent},
    {path: "system", component: SystemComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);