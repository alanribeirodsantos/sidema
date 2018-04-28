import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StyleguideComponent } from './pages/styleguide/styleguide.component';
import { routing } from './app.routing';
import { SdmButtonComponent } from './components/sdm-button/sdm-button.component';
import { SdmSocialButtonComponent } from './components/sdm-social-button/sdm-social-button.component';
import { SdmFormCardComponent } from './components/sdm-form-card/sdm-form-card.component';
import { SdmFormSignUpComponent } from './components/sdm-form-card/sdm-form-sign-up/sdm-form-sign-up.component';
import { SdmFormSignInComponent } from './components/sdm-form-card/sdm-form-sign-in/sdm-form-sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    StyleguideComponent,
    SdmButtonComponent,
    SdmSocialButtonComponent,
    SdmFormCardComponent,
    SdmFormSignUpComponent,
    SdmFormSignInComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
