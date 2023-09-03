import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
	setStorage(key: string, value: any) {
		sessionStorage.setItem(key, JSON.stringify(value));
	}

	getStorage(key: string) {
		const data = sessionStorage.getItem(key);
		return data && data !== 'undefined' ? JSON.parse(data) : null;
	}

	removeStorage(key: string) {
		sessionStorage.removeItem(key);
	}

	clearStorage() {
		sessionStorage.clear();
	}
}
