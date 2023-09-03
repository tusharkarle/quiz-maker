import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Enum } from '../utils/enums';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { Constants } from '../utils/constants';
import { Interface } from '../utils/interfaces';

@Injectable()
export class SharedService {
	public showLoader: Subject<boolean> = new Subject<boolean>();
	loaderStatus = this.showLoader.asObservable();

	constructor(private snackBar: MatSnackBar) {}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Opens snackbar
	 */
	openSnackBar(value: string, msg: string) {
		this.snackBar.openFromComponent(SnackBarComponent, {
			duration: Constants.notificationDuration,
			horizontalPosition: Enum.WindowPosition.RIGHT,
			verticalPosition: Enum.WindowPosition.TOP,
			panelClass: [value === Constants.successTxt ? Constants.successTxt : Constants.failureTxt],
			data: { message: msg, type: value },
		});
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Sets the loader status
	 */
	setShowLoaderStatus(status: boolean) {
		this.showLoader.next(status);
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Calculates class which should be applied according to score obtained
	 */
	getScoreBtnClass(score: number) {
		const scoreMetaData: Interface.ScoreClass | undefined = Constants.scoreClassList.find(
			(scoreColor: Interface.ScoreClass) => scoreColor.from <= score && scoreColor.to >= score
		);
		return scoreMetaData ? scoreMetaData.class : Constants.redBtnTxt;
	}
}
