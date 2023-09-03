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

	subscribeServiceData() {
		this.handlerShowLoader = this.sharedService?.loaderStatus.subscribe((status: boolean) => {
			setTimeout(() => {
				this.isLoader = status;
			}, 0);
		});
	}

	unSubscribeServiceData() {
		if (this.handlerShowLoader) {
			this.handlerShowLoader.unsubscribe();
		}
	}

	ngOnDestroy() {
		this.unSubscribeServiceData();
	}
}
