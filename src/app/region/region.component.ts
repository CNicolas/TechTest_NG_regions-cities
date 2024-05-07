import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { Department, Region } from '../region';
import { RegionsGateway } from '../regions.gateway';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'tt-region',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatAutocomplete,
    MatOption,
    MatLabel,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    AsyncPipe,
    MatList,
    MatListItem,
    RouterLink,
    MatRipple,
  ],
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss',
})
export class RegionComponent {
  readonly regionsControl: FormControl = new FormControl<string>('');
  readonly regions$: Observable<Region[]>;
  departments: Department[] = [];

  constructor(private readonly regionsGateway: RegionsGateway) {
    this.regions$ = this.regionsControl.valueChanges.pipe(switchMap(regionsGateway.fetchRegions));
  }

  displayRegion(region?: Region): string {
    if (!region) {
      return '';
    }

    return region.nom;
  }

  selectRegion(region: Region) {
    this.regionsGateway
      .fetchDepartments(region.code)
      .subscribe((departments) => (this.departments = departments));
  }
}
