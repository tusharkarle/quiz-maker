import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { Constants } from '../utils/constants';

@Injectable()
export class ApiService {
	constructor(
		private http: HttpClient,
		private sharedService: SharedService
	) {}

	handleResponse(response: any) {
		return response;
	}

	handleErrorResponse(error: any, url?: string) {
		this.sharedService.openSnackBar(Constants.failureTxt, `Failed get response for ${url}! due to ${error} `);
	}

	callGetApi(apiurl: string, reqParams?: HttpParams) {
		return this.http
			.get(apiurl, {
				params: reqParams,
				headers: {},
			})
			.pipe(
				tap(
					(data: any) => this.handleResponse(data),
					(error: Error) => this.handleErrorResponse(error, apiurl)
				)
			);
	}

	prepareRequestParams(params: any) {
		if (!params) {
			return null;
		}
		let httpParams = new HttpParams();
		Object.keys(params).forEach((key) => {
			if (params[key] instanceof Object) {
				if (Object.keys(params[key]).length) {
					httpParams = httpParams.append(key, JSON.stringify(params[key]));
				}
			} else if (params[key].toString().length) {
				httpParams = httpParams.append(key, params[key]);
			}
		});
		return httpParams;
	}
}
