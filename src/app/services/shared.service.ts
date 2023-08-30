import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Enum } from '../utils/enums';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { Constants } from '../utils/constants';

@Injectable()
export class SharedService {

	public showLoader: any = new Subject<any>();
	loaderStatus = this.showLoader.asObservable();

	constructor(private snackBar: MatSnackBar) {}

	openSnackBar(value: any, msg: string) {
		this.snackBar.openFromComponent(SnackBarComponent, {
			duration: Constants.notificationDuration,
			horizontalPosition: Enum.WindowPosition.RIGHT,
			verticalPosition: Enum.WindowPosition.TOP,
			panelClass: [value === Constants.successTxt ? Constants.successTxt : Constants.failureTxt],
			data: { message: msg, type: value },
		});
	}


}
