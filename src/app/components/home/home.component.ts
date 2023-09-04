import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
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
