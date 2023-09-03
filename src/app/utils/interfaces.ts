export namespace Interface {
	export interface TriviaCategories {
		trivia_categories: NameId[];
	}

	export interface NameId {
		id: number;
		name: string;
	}

	export interface NameValue {
		value: string;
		name: string;
	}

	export interface Question {
		title: string;
		answerList: Answer[];
		selected: boolean;
	}

	export interface Answer {
		title: string;
		selected: boolean;
		correct: boolean;
		class?: string;
	}

	export interface ScoreClass {
		class: string;
		from: number;
		to: number;
	}

	export interface Score {
		correct: number;
		class: string;
		total: number;
	}

	export interface SnackBarMeta {
		message: string;
		type: string;
	}

	export interface QuestionResponse {
		response_code: number;
		results: CategoryQuestion[];
	}

	export interface CategoryQuestion {
		category: string;
		type: string;
		difficulty: string;
		question: string;
		correct_answer: string;
		incorrect_answers: string[];
	}

	export interface QuestionApiPayload {
		amount: number;
		category: string;
		difficulty: string;
		type: string;
	}
}
