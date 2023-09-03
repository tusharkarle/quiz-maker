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
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Subcribe to loader status obserable and displays the loader accordingly
	 */
	subscribeServiceData() {
		this.handlerShowLoader = this.sharedService?.loaderStatus.subscribe((status: boolean) => {
			setTimeout(() => {
				this.isLoader = status;
			}, 0);
		});
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Unsubscribe the subscription of loader
	 */
	unSubscribeServiceData() {
		if (this.handlerShowLoader) {
			this.handlerShowLoader.unsubscribe();
		}
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: calls  unSubscribeServiceData function
	 */
	ngOnDestroy() {
		this.unSubscribeServiceData();
	}
}
