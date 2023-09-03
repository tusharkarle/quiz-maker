import { Injectable } from '@angular/core';
import { Interface } from '../utils/interfaces';

@Injectable()
export class StorageService {
	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Sets the data in session storage for the given key
	 */
	setStorage(key: string, value: Interface.Question[]) {
		sessionStorage.setItem(key, JSON.stringify(value));
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Get the data stored in session storage
	 */
	getStorage(key: string) {
		const data = sessionStorage.getItem(key);
		return data && data !== 'undefined' ? JSON.parse(data) : null;
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Remove the data stored in session for given key
	 */
	removeStorage(key: string) {
		sessionStorage.removeItem(key);
	}

	/**
	 * @Created : Tushar Karle
	 * @Updated : Tushar Karle
	 * @description: Clear sessionn storage
	 */
	clearStorage() {
		sessionStorage.clear();
	}
}
