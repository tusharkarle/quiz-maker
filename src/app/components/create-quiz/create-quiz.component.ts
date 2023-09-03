import { HttpParams } from '@angular/common/http';
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

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Calls  getCategoryList function to get list of categories
	 */
	ngOnInit() {
		this.getCategoryList();
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: It call the get Api for categories and assign the response to categoriesList
	 */
	getCategoryList() {
		this.sharedService.setShowLoaderStatus(true);
		this.apiService.callGetApi(EndPoints.categoryList).subscribe(
			(response: Interface.TriviaCategories) => {
				this.sharedService.setShowLoaderStatus(false);
				if (response?.trivia_categories?.length) {
					this.categoriesList = response.trivia_categories;
				}
			},
			() => {
				this.sharedService.setShowLoaderStatus(false);
			}
		);
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Checks for questionTypeForm validation and gets list of questions as per the selected options and intializes the data accordingly and shuffles the list of answers randomly
	 */
	getQuestionsList() {
		this.questionsAnsList = [];
		if (this.questionTypeForm?.valid) {
			this.questionsApiPayload.category = String(this.questionTypeForm.value.category);
			this.questionsApiPayload.difficulty = String(this.questionTypeForm.value.difficulty);

			this.sharedService.setShowLoaderStatus(true);
			const queryParms: HttpParams | null = this.apiService.prepareRequestParams(this.questionsApiPayload);
			if (queryParms) {
				this.apiService.callGetApi(EndPoints.questionsList, queryParms).subscribe(
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
								// Shuffle list of answers randomly
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
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: On click of answer button , it updates the array of questions and answers accordingly and updates the selectedAnsCount variable to check if all the questions have answers selected
	 */
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

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Stores the list of questions and answers in session storage and navigates to results component
	 */
	submit() {
		this.storageService.setStorage(Constants.questionAnsListTxt, this.questionsAnsList);
		this.router.navigate([Constants.quizResultRoute]);
	}
}
