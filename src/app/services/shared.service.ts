import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, tap } from 'rxjs';
import { Enum } from '../utils/enums';
import { SnackBarComponent } from '../modals/snack-bar/snack-bar.component';
import { Constants } from '../utils/constants';
import { Interface } from '../utils/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EndPoints } from '../utils/endpoints';

@Injectable()
export class SharedService {
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
		return this.http.get(EndPoints.categoryList).pipe(
			tap(
				(response: any) => response,
				(error: Error) =>
					this.openSnackBar(Constants.failureTxt, `Failed get response for ${EndPoints.categoryList}! due to ${error} `)
			)
		);
	}

	/**
	 * @description: Returns the list of questions as per the payload
	 */
	getQuestionsList(payload?: Interface.QuestionApiPayload): Observable<Interface.QuestionResponse> {
		const reqParams: HttpParams | undefined = this.prepareRequestParams(payload);
		return this.http
			.get(EndPoints.questionsList, {
				params: reqParams,
			})
			.pipe(
				tap(
					(response: any) => response,
					(error: Error) =>
						this.openSnackBar(Constants.failureTxt, `Failed get response for ${EndPoints.questionsList}! due to ${error} `)
				)
			);
	}

	/**
	 * @description: Prepares for the Request params
	 */
	prepareRequestParams(params: any): HttpParams | undefined {
		if (!params) {
			return undefined;
		}
		let httpParams = new HttpParams();
		Object.keys(params).forEach((key) => {
			if (params[key] instanceof Object) {
				if (Object.keys(params[key]).length) {
					httpParams = httpParams.append(key, JSON.stringify(params[key]));
				}
			} else if (params[key].toString().length) {
				httpParams = httpParams.append(key, params[key]);
			}
		});
		return httpParams;
	}

	/**
	 * @description: Sets the data in session storage for the given key
	 */
	setStorage(key: string, value: Interface.Question[]): void {
		sessionStorage.setItem(key, JSON.stringify(value));
	}

	/**
	 * @description: Get the data stored in session storage
	 */
	getStorage(key: string): Interface.Question[] | [] {
		const data = sessionStorage.getItem(key);
		return data && data !== 'undefined' ? JSON.parse(data) : [];
	}
}
