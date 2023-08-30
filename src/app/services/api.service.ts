import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { Constants } from '../utils/constants';

@Injectable()
export class ApiService {
	failure: string = Constants.failureTxt;

	token:string = 'test_token';

	constructor(private http: HttpClient, private sharedService: SharedService) {}


	handleResponse(response: any) {
		return response;
	}

	handleErrorResponse(error: any, url?: string) {
		this.sharedService.openSnackBar(this.failure, `Failed get response for ${url}!`);
	}

	callGetApi(apiurl: string, reqParams?: any) {
		return this.http
			.get(apiurl, {
				params: reqParams,
				headers: {
					authorization: this.token,
				},
			})
			.pipe(
				tap(
					(data: any) => this.handleResponse(data),
					(error: Error) => this.handleErrorResponse(error, apiurl)
				)
			);
	}

	callPostApi(apiurl: string, body: any, headers?: any) {
		let header = {
			authorization: this.token,
		};
		if (headers) {
			header = headers;
		}
		return this.http
			.post(apiurl, body, {
				headers: header,
			})
			.pipe(
				tap(
					(data: any) => this.handleResponse(data),
					(error: Error) => this.handleErrorResponse(error, apiurl)
				)
			);
	}

	callPutApi(apiurl: string, body: any) {
		return this.http
			.put(apiurl, body, {
				headers: {
					authorization: this.token,
				},
			})
			.pipe(
				tap(
					(data: any) => this.handleResponse(data),
					(error: Error) => this.handleErrorResponse(error, apiurl)
				)
			);
	}

	callPatchApi(apiurl: string, body: any) {
		return this.http
			.patch(apiurl, body, {
				headers: {
					authorization: this.token,
					contentType: 'application/merge-patch+json',
				},
			})
			.pipe(
				tap(
					(data: any) => this.handleResponse(data),
					(error: Error) => this.handleErrorResponse(error, apiurl)
				)
			);
	}

	callDeleteApi(apiurl: string) {
		return this.http
			.delete(apiurl, {
				headers: {
					authorization: this.token,
				},
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
