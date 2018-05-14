import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { StyleguideComponent } from './pages/styleguide/styleguide.component';
import { routing } from './app.routing';
import { SdmButtonComponent } from './components/sdm-button/sdm-button.component';
import { SdmSocialButtonComponent } from './components/sdm-social-button/sdm-social-button.component';
import { SdmFormCardComponent } from './components/sdm-form-card/sdm-form-card.component';
import { SdmFormSignUpComponent } from './components/sdm-form-card/sdm-form-sign-up/sdm-form-sign-up.component';
import { SdmFormSignInComponent } from './components/sdm-form-card/sdm-form-sign-in/sdm-form-sign-in.component';
import { UserService } from './backend/services/user.service';
import { SdmSectionComponent } from './components/sdm-section/sdm-section.component';
import { HomeComponent } from './pages/home/home.component';
import { SdmDownArrowComponent } from './components/sdm-down-arrow/sdm-down-arrow.component';
import { SdmLogoComponent } from './components/sdm-logo/sdm-logo.component';
import { SdmSideMenuComponent } from './components/sdm-side-menu/sdm-side-menu.component';
import { SystemComponent } from './pages/system/system.component';
import { SdmReportCardComponent } from './components/sdm-report-card/sdm-report-card.component';
import { ReportsListComponent } from './pages/system/reports-list/reports-list.component';
import { SdmHeaderComponent } from './components/sdm-header/sdm-header.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { SdmFaqQuestionComponent } from './components/sdm-faq-question/sdm-faq-question.component';
import { SdmBoostReportComponent } from './components/sdm-report-card/sdm-boost-report/sdm-boost-report.component';
import { SdmReportCategoryComponent } from './components/sdm-report-card/sdm-report-category/sdm-report-category.component';
import { SdmReportStatusComponent } from './components/sdm-report-card/sdm-report-status/sdm-report-status.component';
import { SdmMyReportComponent } from './components/sdm-report-card/sdm-my-report/sdm-my-report.component';
import { ReportingComponent } from './pages/system/reporting/reporting.component';
 
export const firebaseConfig = {
  apiKey: "AIzaSyASY7GlvEimsp0Gqv1H6qvwdX_w6AI0m6Y",
  authDomain: "sidema-dd795.firebaseapp.com",
  databaseURL: "https://sidema-dd795.firebaseio.com",
  storageBucket: "sidema-dd795.appspot.com",
  messagingSenderId: "874627684852"
}

@NgModule({
  declarations: [
    AppComponent,
    StyleguideComponent,
    SdmButtonComponent,
    SdmSocialButtonComponent,
    SdmFormCardComponent,
    SdmFormSignUpComponent,
    SdmFormSignInComponent,
    SdmSectionComponent,
    HomeComponent,
    SdmDownArrowComponent,
    SdmLogoComponent,
    SdmSideMenuComponent,
    SystemComponent,
    SdmReportCardComponent,
    ReportsListComponent,
    SdmHeaderComponent,
    AboutUsComponent,
    FaqComponent,
    SdmFaqQuestionComponent,
    SdmBoostReportComponent,
    SdmReportCategoryComponent,
    SdmReportStatusComponent,
    SdmMyReportComponent,
    ReportingComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }