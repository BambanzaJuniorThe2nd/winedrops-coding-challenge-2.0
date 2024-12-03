import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { WineResponse } from '../models/wine.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WineService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBestSellingWines(
    sortBy: string = 'revenue',
    page: number = 1,
    limit: number = 20
  ): Observable<WineResponse> {
    const params = new HttpParams()
      .set('sortBy', sortBy)
      .set('page', page.toString())
      .set('limit', limit.toString());

      return this.http.get<WineResponse>(`${this.API_URL}/wines/best-selling`, {
        params,
        responseType: 'json',
        withCredentials: true,
      }).pipe(
        retry(1), // Retry once in case of transient errors
        catchError(this.handleError)
      );
  }

  searchWines(
    query: string,
    sortBy: string = 'revenue',
    page: number = 1,
    limit: number = 20
  ): Observable<WineResponse> {
    const params = new HttpParams()
      .set('query', query)
      .set('sortBy', sortBy)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<WineResponse>(`${this.API_URL}/wines/search`, {
      params,
      responseType: 'json',
      withCredentials: true,
    }).pipe(
      retry(1), // Retry once in case of transient errors
      catchError(this.handleError)
    );
  }

  // Private error handling method
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
      return throwError(() => new Error('Network error. Please check your connection.'));
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error
      );

      // Provide more specific error messages based on status
      switch (error.status) {
        case 400:
          return throwError(() => new Error('Bad Request: Invalid search parameters.'));
        case 401:
          return throwError(() => new Error('Unauthorized: Please log in again.'));
        case 404:
          return throwError(() => new Error('Not Found: No wines match your search.'));
        case 500:
          return throwError(() => new Error('Server Error: Please try again later.'));
        default:
          return throwError(() => new Error(error.message));
      }
    }
  }
}
