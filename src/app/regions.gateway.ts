import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { City, Department, Region } from './region';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegionsGateway {
  private readonly regionsBaseUrl = 'https://geo.api.gouv.fr/regions';
  private readonly departmentsBaseUrl = 'https://geo.api.gouv.fr/departements';

  constructor(private httpClient: HttpClient) {}

  fetchRegions = (regionSearch: string): Observable<Region[]> => {
    return this.httpClient.get<Region[]>(this.regionsBaseUrl, {
      params: new HttpParams({ fromObject: { nom: regionSearch } }),
    });
  };

  fetchDepartments = (regionCode: string): Observable<Department[]> => {
    return this.httpClient.get<Department[]>(`${this.regionsBaseUrl}/${regionCode}/departements`);
  };

  fetchCities = (departmentCode: string): Observable<City[]> => {
    return this.httpClient.get<City[]>(`${this.departmentsBaseUrl}/${departmentCode}/communes`);
  };
}
