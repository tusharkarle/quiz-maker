import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './services/shared.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	isLoader: boolean = false;
	handlerShowLoader: Subscription = new Subscription();

	constructor(private sharedService: SharedService) {
		this.subscribeServiceData();
	}

	/**
	 * @description: Subcribe to loader status obserable and displays the loader accordingly
	 */
	subscribeServiceData(): void {
		this.handlerShowLoader = this.sharedService?.loaderStatus.subscribe((status: boolean) => {
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
