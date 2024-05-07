import { Routes } from '@angular/router';
import { citiesResolver } from './cities.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./region/region.component').then((file) => file.RegionComponent),
  },
  {
    path: 'departments/:departmentCode',
    resolve: { cities: citiesResolver },
    loadComponent: () => import('./department/department.component').then((file) => file.DepartmentComponent),
  },
  { path: '**', redirectTo: '' },
];
