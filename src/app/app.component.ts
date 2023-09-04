import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from './services/quiz.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	isLoader: boolean = false;
	handlerShowLoader: Subscription = new Subscription();

	constructor(private quizService: QuizService) {
		this.subscribeServiceData();
	}

	/**
	 * @description: Subcribe to loader status obserable and displays the loader accordingly
	 */
	subscribeServiceData(): void {
		this.handlerShowLoader = this.quizService?.loaderStatus.subscribe((status: boolean) => {
			this.isLoader = status;
		});
	}

	/**
	 * @description: Unsubscribe the subscription of loader
	 */
	ngOnDestroy(): void {
		if (this.handlerShowLoader) {
			this.handlerShowLoader.unsubscribe();
		}
	}
}
