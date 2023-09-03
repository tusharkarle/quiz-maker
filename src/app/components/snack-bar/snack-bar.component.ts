import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Interface } from 'src/app/utils/interfaces';

@Component({
	selector: 'app-snack-bar',
	templateUrl: './snack-bar.component.html',
	styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
	constructor(
		@Inject(MAT_SNACK_BAR_DATA) public data: Interface.SnackBarMeta,
		public snackBarRef: MatSnackBarRef<SnackBarComponent>
	) {}
}
