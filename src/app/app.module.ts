import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

@NgModule({
	declarations: [AppComponent,SnackBarComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule,MatSnackBarModule, MatIconModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
