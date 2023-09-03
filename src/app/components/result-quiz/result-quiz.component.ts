import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';
import { Constants } from 'src/app/utils/constants';
import { Interface } from 'src/app/utils/interfaces';

@Component({
	selector: 'app-result-quiz',
	templateUrl: './result-quiz.component.html',
	styleUrls: ['./result-quiz.component.scss'],
})
export class ResultQuizComponent implements OnInit, OnDestroy {
	questionsAnsList: Interface.Question[] = [];
	scoreData: Interface.Score = { ...Constants.defaultScore };

	constructor(
		private router: Router,
		private storageService: StorageService,
		private sharedService: SharedService
	) {}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Gets the list of questions and answers from session storage and calls processQuestions function
	 */
	ngOnInit() {
		this.questionsAnsList = this.storageService.getStorage(Constants.questionAnsListTxt);
		if (this.questionsAnsList?.length) {
			this.processQuestions();
		}
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Proccess the questions and answers list assigns the class to them based on correct , incorrect ans
	 */
	processQuestions() {
		this.scoreData.correct = 0;
		this.scoreData.total = this.questionsAnsList?.length;
		this.questionsAnsList.map((questionData: Interface.Question) => {
			questionData.answerList.map((answer: Interface.Answer) => {
				// if selected answer is correct
				if (answer.correct && answer.selected) {
					answer.class = Constants.greenBtnTxt;
					this.scoreData.correct += 1;
					// if correct answer is not selected
				} else if (!answer.correct && answer.selected) {
					answer.class = Constants.redBtnTxt;
					// if answer is neither correct nor selected
				} else if (answer.correct && !answer.selected) {
					answer.class = Constants.greenBtnTxt;
				}
			});
		});
		this.scoreData.class = this.sharedService.getScoreBtnClass(this.scoreData.correct);
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Navigate to create quiz page
	 */
	createQuiz() {
		this.router.navigate([Constants.createQuizRoute]);
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: It empties the list of questions and answer saved in session storage
	 */
	ngOnDestroy() {
		this.storageService.setStorage(Constants.questionAnsListTxt, []);
		this.questionsAnsList = [];
	}
}
