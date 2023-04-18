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
  individual$!: Observable<Individual>;

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

    return this.as.get(`${baseUrl}/Individual/GetAll`, params) as Observable<PagedData<Individual>>;
    return this.as.get('assets/test-data/individuals.json') as Observable<PagedData<Individual>>;
  }

  /**
   * Get individual by id
   * @param id individual id
   * @returns observable of individual
   */
  getIndividualById(id: number): Observable<Individual> {
    return this.as.get(`${baseUrl}/Individual/GetById/${id}`) as Observable<Individual>;
    return this.as.get('assets/test-data/individual.json') as Observable<Individual>;
  }

  /**
   * Create individual
   * @param individual individual to create
   * @returns observable of individualId
   */
  createIndividual(individual: Individual): Observable<number> {
    return this.as.post(`${baseUrl}/Individual/Create`, individual) as Observable<number>;
  }

  /**
   * Update individual
   * @param individual individual to update
   */
  updateIndividual(individual: Individual) {
    return this.as.put(`${baseUrl}/Individual/Update`, individual) as Observable<number>;
  }

  /**
   * Delete individual by id
   * @param individualId individual id to delete
   */
  deleteIndividual(individualId: number) {
    return this.as.delete(`${baseUrl}/Individual/Delete`, { id: individualId }) as Observable<boolean>;
  }

}
