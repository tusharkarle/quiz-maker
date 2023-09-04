import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'textFormatter',
})
export class TextFormatterPipe implements PipeTransform {
	transform(value: string): string | null {
		const parser: DOMParser = new DOMParser();
		const decodedValue: string | null = parser.parseFromString(value, 'text/html').body.textContent;
		return decodedValue;
	}
}
