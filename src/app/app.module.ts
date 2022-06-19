import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderModule } from './header/header.module';

// material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderModule,
    //material imports
    MatToolbarModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 100000,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
