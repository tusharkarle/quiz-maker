import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Constants } from 'src/app/utils/constants';
import { Interface } from 'src/app/utils/interfaces';

@Component({
	selector: 'app-create-quiz',
	templateUrl: './create-quiz.component.html',
	styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
	categoriesList: Interface.NameId[] = [];
	difficultyList: Interface.NameValue[] = Constants.difficultyLevelList;
	questionTypeForm: FormGroup = new FormGroup({
		category: new FormControl('', [Validators.required]),
		difficulty: new FormControl('', [Validators.required]),
	});
	questionsAnsList: Interface.Question[] = [];
	selectedAnsCount: number = 0;
	questionsApiPayload: Interface.QuestionApiPayload = { ...Constants.questionsApiPayload };

	constructor(
		private quizService: QuizService,
		private router: Router
	) {}

	/**
	 * @description: Calls  getCategoryList function to get list of categories
	 */
	ngOnInit(): void {
		this.getCategoryList();
	}

	/**
	 * @description: It call the get Api for categories and assign the response to categoriesList
	 */
	getCategoryList(): void {
		this.quizService.setShowLoaderStatus(true);
		this.quizService.getAllCategories().subscribe(
			(response: Interface.TriviaCategories) => {
				this.quizService.setShowLoaderStatus(false);
				if (response?.trivia_categories?.length) {
					this.categoriesList = response.trivia_categories;
				}
			},
			() => {
				this.quizService.setShowLoaderStatus(false);
			}
		);
	}

	/**
	 * @description: Checks for questionTypeForm validation and gets list of questions as per the selected options and intializes the data accordingly and shuffles the list of answers randomly
	 */
	getQuestionsList(): void {
		this.questionsAnsList = [];
		if (this.questionTypeForm?.valid) {
			this.quizService.setShowLoaderStatus(true);
			this.quizService.getQuestionsList(this.generateQuestionsParams()).subscribe(
				(response: Interface.QuestionResponse) => {
					this.quizService.setShowLoaderStatus(false);
					if (response?.results?.length) {
						response.results.forEach((questionData: Interface.CategoryQuestion) => {
							const answersList: Interface.Answer[] = [
								...this.prepareAnswersList([questionData?.correct_answer], true),
								...this.prepareAnswersList(questionData?.incorrect_answers, false),
							];
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
					this.quizService.setShowLoaderStatus(false);
				}
			);
		}
	}

	/**
	 * @description: On click of answer button , it updates the array of questions and answers accordingly and updates the selectedAnsCount variable to check if all the questions have answers selected
	 */
	selectAnswer(selectedQuestion: Interface.Question, selectedAns: Interface.Answer): void {
		this.selectedAnsCount = 0;
		if (selectedQuestion && selectedAns) {
			this.questionsAnsList.map((question: Interface.Question) => {
				if (selectedQuestion?.title === question?.title) {
					question.selected = true;
					question.answerList.map((answer: Interface.Answer) => {
						answer.selected = answer?.title === selectedAns?.title;
					});
				}
				if (question?.selected) {
					this.selectedAnsCount += 1;
				}
			});
		}
	}

	/**
	 * @description: Stores the list of questions and answers in session storage and navigates to results component
	 */
	submit(): void {
		this.quizService.setQustionsInSessionStorage(this.questionsAnsList);
		this.router.navigate([Constants.quizResultRoute]);
	}

	/**
	 * @description: Prepare Answers list from the answers title list
	 */
	prepareAnswersList(answerTitleList: string[], isCorrect: boolean): Interface.Answer[] {
		const answersList: Interface.Answer[] = [];
		if (answerTitleList?.length) {
			answerTitleList.forEach((answerTitle: string) => {
				answersList.push({
					title: answerTitle,
					selected: false,
					correct: isCorrect,
				});
			});
		}
		return answersList;
	}

	generateQuestionsParams(): string {
		this.questionsApiPayload.category = this.questionTypeForm.value.category;
		this.questionsApiPayload.difficulty = this.questionTypeForm.value.difficulty;
		return `amount=${this.questionsApiPayload?.amount}&category=${this.questionsApiPayload?.category}&difficulty=${this.questionsApiPayload?.difficulty}&type=${this.questionsApiPayload?.type}`;
	}
}
