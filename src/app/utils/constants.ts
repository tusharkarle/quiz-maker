import { Interface } from './interfaces';

export class Constants {
	public static readonly failureTxt: string = 'Failure';
	public static readonly successTxt: string = 'Success';
	public static readonly questionAnsListTxt: string = 'questionsAnsList';
	public static readonly greenBtnTxt: string = 'green-btn';
	public static readonly redBtnTxt: string = 'red-btn';
	public static readonly notificationDuration: number = 2000;

	public static readonly createQuizRoute: string = 'create-quiz';
	public static readonly quizResultRoute: string = 'result-quiz';

	public static readonly difficultyLevelList: Interface.NameValue[] = [
		{
			name: 'Easy',
			value: 'easy',
		},
		{
			name: 'Medium',
			value: 'medium',
		},
		{
			name: 'Hard',
			value: 'hard',
		},
	];

	public static readonly scoreClassList: Interface.ScoreClass[] = [
		{
			class: 'red-btn',
			from: 0,
			to: 1,
		},
		{
			class: 'yellow-btn',
			from: 2,
			to: 3,
		},
		{
			class: 'green-btn',
			from: 4,
			to: 5,
		},
	];

	public static readonly questionsApiPayload: Interface.QuestionApiPayload = {
		amount: 5,
		category: '',
		difficulty: '',
		type: 'multiple',
	};

	public static readonly defaultScore: Interface.Score = {
		correct: 0,
		total: 0,
		class: 'red-btn',
	};
}
