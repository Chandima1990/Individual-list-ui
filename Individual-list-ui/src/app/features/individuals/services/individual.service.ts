import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { PagedData } from "src/app/shared/models";
import { ApiService } from "src/app/shared/services";
import { environment } from "src/environments/environment";
import { Individual } from "../models";

const baseUrl = environment.baseApiUrl;

@Injectable({
  providedIn: 'root'
})
export class IndividualService {

  individuals$!: Observable<PagedData<Individual>>;

  constructor(private as: ApiService) { }

  /**
   * Get all individuals
   * @param page page index
   * @param pageSize page size
   * @returns observable of paged data of individuals
   */
  getAllIndividuals(
    page?: number,
    pageSize?: number,
  ): Observable<PagedData<Individual>> {

    const params = new HttpParams()
      .append('page', `${page}`)
      .append('pageSize', `${pageSize}`);

    return this.as.get(`${baseUrl}/individual/getAll`, params) as Observable<PagedData<Individual>>;
    return this.as.get('assets/test-data/individuals.json') as Observable<PagedData<Individual>>;

  }


  /**
   * Get individual by id
   * @param id individual id
   * @returns observable of individual
   */
  getIndividualById(id: number): Observable<Individual> {
    return this.as.get(`${baseUrl}/individual/getById/${id}`) as Observable<Individual>;
  }


}
