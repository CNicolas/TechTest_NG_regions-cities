import { ActivatedRouteSnapshot, ResolveFn, Route } from '@angular/router';
import { City } from './region';
import { Observable, throwError } from 'rxjs';
import { RegionsGateway } from './regions.gateway';
import { inject } from '@angular/core';

export const citiesResolver: ResolveFn<City[]> = (route: ActivatedRouteSnapshot): Observable<City[]> => {
  const departmentCode = route.params['departmentCode'];
  if (departmentCode) {
    return inject(RegionsGateway).fetchCities(departmentCode);
  }

  return throwError(() => new Error('No valid departmentCode'));
};
