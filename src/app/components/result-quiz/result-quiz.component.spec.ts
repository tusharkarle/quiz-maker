import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultQuizComponent } from './result-quiz.component';

describe('ResultQuizComponent', () => {
	let component: ResultQuizComponent;
	let fixture: ComponentFixture<ResultQuizComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ResultQuizComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ResultQuizComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
