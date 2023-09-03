import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { ResultQuizComponent } from './components/result-quiz/result-quiz.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{ path: '', redirectTo: 'create-quiz', pathMatch: 'full' },
			{
				path: 'create-quiz',
				component: CreateQuizComponent,
			},
			{
				path: 'result-quiz',
				component: ResultQuizComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
