import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StyleguideComponent } from './pages/styleguide/styleguide.component';
import { routing } from './app.routing';
import { SdmButtonComponent } from './components/sdm-button/sdm-button.component';
import { SdmSocialButtonComponent } from './components/sdm-social-button/sdm-social-button.component';


@NgModule({
  declarations: [
    AppComponent,
    StyleguideComponent,
    SdmButtonComponent,
    SdmSocialButtonComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
