import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RegionsGateway } from './regions.gateway';
import { Department, Region } from './region';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'tt-root',
  standalone: true,
  imports: [
    RouterOutlet,
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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

  selectRegion(region: MatOption<Region>) {
    console.warn(region.value);
    this.regionsGateway
      .fetchDepartments(region.value.code)
      .subscribe((departments) => (this.departments = departments));
  }
}
