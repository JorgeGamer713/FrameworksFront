import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
