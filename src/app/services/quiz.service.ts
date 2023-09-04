import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, tap } from 'rxjs';
import { Enum } from '../utils/enums';
import { SnackBarComponent } from '../modals/snack-bar/snack-bar.component';
import { Constants } from '../utils/constants';
import { Interface } from '../utils/interfaces';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from 'src/environments/environment';

@Injectable()
export class QuizService {
	public showLoader: Subject<boolean> = new Subject<boolean>();
	loaderStatus = this.showLoader.asObservable();

	constructor(
		private snackBar: MatSnackBar,
		private http: HttpClient
	) {}

	/**
	 * @description: Opens snackbar
	 */
	openSnackBar(value: string, msg: string): void {
		this.snackBar.openFromComponent(SnackBarComponent, {
			duration: Constants.notificationDuration,
			horizontalPosition: Enum.WindowPosition.RIGHT,
			verticalPosition: Enum.WindowPosition.TOP,
			panelClass: [value === Constants.successTxt ? Constants.successTxt : Constants.failureTxt],
			data: { message: msg, type: value },
		});
	}

	/**
	 * @description: Sets the loader status
	 */
	setShowLoaderStatus(status: boolean): void {
		this.showLoader.next(status);
	}

	/**
	 * @description: Calculates class which should be applied according to score obtained
	 */
	getScoreBtnClass(score: number): string {
		const scoreMetaData: Interface.ScoreClass | undefined = Constants.scoreClassList.find(
			(scoreColor: Interface.ScoreClass) => scoreColor.from <= score && scoreColor.to >= score
		);
		return scoreMetaData ? scoreMetaData.class : Constants.redBtnTxt;
	}

	/**
	 * @description: Returns the list of categories
	 */
	getAllCategories(): Observable<Interface.TriviaCategories> {
		return this.http.get<Interface.TriviaCategories>(ENVIRONMENT?.categoryList).pipe(
			tap(
				(response: Interface.TriviaCategories) => response,
				(error: Error) =>
					this.openSnackBar(Constants.failureTxt, `Failed get response for ${ENVIRONMENT?.categoryList}! due to ${error} `)
			)
		);
	}

	/**
	 * @description: Returns the list of questions as per the payload
	 */
	getQuestionsList(reqParams: string): Observable<Interface.QuestionResponse> {
		return this.http.get<Interface.QuestionResponse>(`${ENVIRONMENT?.questionsList}?${reqParams}`).pipe(
			tap(
				(response: Interface.QuestionResponse) => response,
				(error: Error) =>
					this.openSnackBar(Constants.failureTxt, `Failed get response for ${ENVIRONMENT?.questionsList}! due to ${error} `)
			)
		);
	}

	/**
	 * @description: Sets the data in session storage for the given key
	 */
	setQustionsInSessionStorage(value: Interface.Question[]): void {
		sessionStorage.setItem(Constants.questionAnsListTxt, JSON.stringify(value));
	}

	/**
	 * @description: Get the data stored in session storage
	 */
	getQustionsFromSessionStorage(): Interface.Question[] | [] {
		const data = sessionStorage.getItem(Constants.questionAnsListTxt);
		return data ? JSON.parse(data) : [];
	}
}
