import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { SnackBarComponent } from './modals/snack-bar/snack-bar.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { ResultQuizComponent } from './components/result-quiz/result-quiz.component';

import { SharedService } from './services/shared.service';

@NgModule({
	declarations: [AppComponent, SnackBarComponent, CreateQuizComponent, ResultQuizComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatSnackBarModule,
		MatIconModule,
		HttpClientModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatProgressSpinnerModule,
	],
	providers: [SharedService],
	bootstrap: [AppComponent],
})
export class AppModule {}
