import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
