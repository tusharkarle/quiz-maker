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

	ngOnInit() {
		this.questionsAnsList = this.storageService.getStorage(Constants.questionAnsListTxt);
		this.processQuestions();
	}

	processQuestions() {
		this.scoreData.correct = 0;
		this.scoreData.total = this.questionsAnsList?.length;
		this.questionsAnsList.map((questionData: Interface.Question) => {
			questionData.answerList.map((answer: Interface.Answer) => {
				if (answer.correct && answer.selected) {
					answer.class = Constants.greenBtnTxt;
					this.scoreData.correct += 1;
				} else if (!answer.correct && answer.selected) {
					answer.class = Constants.redBtnTxt;
				} else if (answer.correct && !answer.selected) {
					answer.class = Constants.greenBtnTxt;
				}
			});
		});
		this.scoreData.class = this.sharedService.getScoreBtnClass(this.scoreData.correct);
	}

	createQuiz() {
		this.router.navigate([Constants.createQuizRoute]);
	}

	ngOnDestroy() {
		this.storageService.setStorage(Constants.questionAnsListTxt, []);
		this.questionsAnsList = [];
	}
}
