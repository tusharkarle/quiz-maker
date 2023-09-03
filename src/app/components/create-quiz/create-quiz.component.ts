import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';
import { Constants } from 'src/app/utils/constants';
import { EndPoints } from 'src/app/utils/endpoints';
import { Interface } from 'src/app/utils/interfaces';

@Component({
	selector: 'app-create-quiz',
	templateUrl: './create-quiz.component.html',
	styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
	categoriesList: Interface.NameId[] = [];
	difficultyList: Interface.NameValue[] = Constants.difficultyLevelList;
	questionTypeForm = new FormGroup({
		category: new FormControl('', [Validators.required]),
		difficulty: new FormControl('', [Validators.required]),
	});
	questionsAnsList: Interface.Question[] = [];
	selectedAnsCount: number = 0;
	questionsApiPayload: Interface.QuestionApiPayload = { ...Constants.questionsApiPayload };

	constructor(
		private apiService: ApiService,
		private sharedService: SharedService,
		private storageService: StorageService,
		private router: Router
	) {}

	ngOnInit() {
		this.sharedService.setQuizQuestions([]);
		this.getCategoryList();
	}

	getCategoryList() {
		this.apiService.callGetApi(EndPoints.categoryList).subscribe(
			(response: Interface.TriviaCategories) => {
				if (response?.trivia_categories?.length) {
					this.categoriesList = response.trivia_categories;
				}
			},
			() => {
				this.sharedService.setShowLoaderStatus(false);
			}
		);
	}

	getQuestionsList() {
		this.questionsAnsList = [];
		if (this.questionTypeForm?.valid) {
			this.questionsApiPayload.category = String(this.questionTypeForm.value.category);
			this.questionsApiPayload.difficulty = String(this.questionTypeForm.value.difficulty);

			this.sharedService.setShowLoaderStatus(true);
			this.apiService.callGetApi(EndPoints.questionsList, this.apiService.prepareRequestParams(this.questionsApiPayload)).subscribe(
				(response: Interface.QuestionResponse) => {
					this.sharedService.setShowLoaderStatus(false);
					if (response?.results?.length) {
						response.results.forEach((questionData: Interface.CategoryQuestion) => {
							const answersList: Interface.Answer[] = [
								{
									title: questionData?.correct_answer,
									selected: false,
									correct: true,
								},
							];
							if (Array.isArray(questionData?.incorrect_answers) && questionData?.incorrect_answers?.length) {
								questionData.incorrect_answers.forEach((answerTitle: string) => {
									answersList.push({
										title: answerTitle,
										selected: false,
										correct: false,
									});
								});
							}
							const randomAnswerList: Interface.Answer[] = answersList.sort(() => {
								return 0.5 - Math.random();
							});
							this.questionsAnsList.push({
								title: questionData?.question,
								answerList: randomAnswerList,
								selected: false,
							});
						});
					}
				},
				() => {
					this.sharedService.setShowLoaderStatus(false);
				}
			);
		}
	}

	selectAnswer(selectedQuestion: Interface.Question, selectedAns: Interface.Answer) {
		this.selectedAnsCount = 0;
		if (selectedQuestion && selectedAns) {
			this.questionsAnsList.map((question: Interface.Question) => {
				if (selectedQuestion?.title === question?.title) {
					question.selected = true;
					question.answerList.map((answer: Interface.Answer) => {
						if (answer?.title === selectedAns?.title) {
							answer.selected = true;
						} else {
							answer.selected = false;
						}
					});
				}
				if (question?.selected) {
					this.selectedAnsCount += 1;
				}
			});
		}
	}

	submit() {
		this.storageService.setStorage(Constants.questionAnsListTxt, this.questionsAnsList);
		this.router.navigate([Constants.quizResultRoute]);
	}
}
