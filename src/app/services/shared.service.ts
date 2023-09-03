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

	public quizQuestions: Subject<Interface.Question[]> = new Subject<Interface.Question[]>();
	quizQuestionsObs = this.quizQuestions.asObservable();

	constructor(private snackBar: MatSnackBar) {}

	openSnackBar(value: string, msg: string) {
		this.snackBar.openFromComponent(SnackBarComponent, {
			duration: Constants.notificationDuration,
			horizontalPosition: Enum.WindowPosition.RIGHT,
			verticalPosition: Enum.WindowPosition.TOP,
			panelClass: [value === Constants.successTxt ? Constants.successTxt : Constants.failureTxt],
			data: { message: msg, type: value },
		});
	}

	setShowLoaderStatus(status: boolean) {
		this.showLoader.next(status);
	}

	setQuizQuestions(questions: Interface.Question[]) {
		this.quizQuestions.next(questions);
	}

	getScoreBtnClass(score: number) {
		const scoreMetaData: Interface.ScoreClass | undefined = Constants.scoreClassList.find(
			(scoreColor: Interface.ScoreClass) => scoreColor.from <= score && scoreColor.to >= score
		);
		return scoreMetaData ? scoreMetaData.class : Constants.redBtnTxt;
	}
}
