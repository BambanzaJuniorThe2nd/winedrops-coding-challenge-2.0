import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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
      });
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
    });
  }
}
