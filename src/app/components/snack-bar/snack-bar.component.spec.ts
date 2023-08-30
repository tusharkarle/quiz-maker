
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackBarComponent } from './snack-bar.component';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SnackBarComponent', () => {
	let component: SnackBarComponent;
	let fixture: ComponentFixture<SnackBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SnackBarComponent],
			imports: [MatSnackBarModule],
			providers: [
				{ provide: MatSnackBarRef, useValue: {} },
				{ provide: MAT_SNACK_BAR_DATA, useValue: {} },
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(SnackBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
