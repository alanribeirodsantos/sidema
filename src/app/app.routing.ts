import { Routes, RouterModule } from '@angular/router';

import { StyleguideComponent } from './pages/styleguide/styleguide.component';

const APP_ROUTES: Routes = [
    {path: "", redirectTo: "/styleguide", pathMatch: "full"},
    {path: "styleguide", component: StyleguideComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);