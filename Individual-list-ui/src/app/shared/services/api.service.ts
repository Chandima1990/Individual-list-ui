import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient) {
  }
  /**
   * API call fot get requests
   * @param url
   * @param params
   */
  public get(url: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get(url, { params }).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /**
   * API call for POST requests
   * @param url
   * @param data
   * @param headers
   */
  post(url: string, data: any, headers?: HttpHeaders): Observable<any> {
    //start progress bar showing for loading

    return this.httpClient.post(url, data, { headers })
      .pipe(catchError(this.handleError))
  }

  /**
   * API call for PUT requests
   * @param url
   * @param data
   * @param headers
   */
  put(url: string, data?: any, headers?: HttpHeaders): Observable<any> {
    //start progress bar showing for loading

    return this.httpClient.put(url, data)
      .pipe(catchError(this.handleError))
  }

  /**
   * API call for Delete requests
   * @param url
   * @param data
   * @param headers
   */
  delete(url: string, body: any, headers?: HttpHeaders): Observable<any> {
    //start progress bar showing for loading
    return this.httpClient.request('delete', url, { body, headers })
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}

