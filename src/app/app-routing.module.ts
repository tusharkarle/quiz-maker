import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { ResultQuizComponent } from './components/result-quiz/result-quiz.component';

const routes: Routes = [
    { path: '', redirectTo: 'create-quiz', pathMatch: 'full' },
    {
        path: 'create-quiz',
        component: CreateQuizComponent,
    },
    {
        path: 'result-quiz',
        component: ResultQuizComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
