import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
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
		private quizService: QuizService
	) {}

	/**
	 * @description: Gets the list of questions and answers from session storage and calls processQuestions function
	 */
	ngOnInit(): void {
		this.questionsAnsList = this.quizService.getQustionsFromSessionStorage();
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
		this.questionsAnsList?.map((questionData: Interface.Question) => {
			questionData?.answerList.map((answer: Interface.Answer) => {
				if (answer?.selected) {
					answer.class = answer.correct ? Constants.greenBtnTxt : Constants.redBtnTxt;
					if (answer.correct) {
						this.scoreData.correct += 1;
					}
				} else if (answer?.correct) {
					answer.class = Constants.greenBtnTxt;
				}
			});
		});
		this.scoreData.class = this.quizService.getScoreBtnClass(this.scoreData.correct);
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
		this.quizService.setQustionsInSessionStorage([]);
		this.questionsAnsList = [];
	}
}
