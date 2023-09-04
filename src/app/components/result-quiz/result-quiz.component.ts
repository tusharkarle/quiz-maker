import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
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
		private sharedService: SharedService
	) {}

	/**
	 * @description: Gets the list of questions and answers from session storage and calls processQuestions function
	 */
	ngOnInit(): void {
		this.questionsAnsList = this.sharedService.getStorage(Constants.questionAnsListTxt);
		if (this.questionsAnsList?.length) {
			this.processQuestions();
		}
	}

	/**
	 * @description: Proccess the questions and answers list assigns the class to them based on correct , incorrect ans
	 */
	processQuestions(): void {
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
	 * @description: Navigate to create quiz page
	 */
	createQuiz(): void {
		this.router.navigate([Constants.createQuizRoute]);
	}

	/**
	 * @description: It empties the list of questions and answer saved in session storage
	 */
	ngOnDestroy(): void {
		this.sharedService.setStorage(Constants.questionAnsListTxt, []);
		this.questionsAnsList = [];
	}
}
