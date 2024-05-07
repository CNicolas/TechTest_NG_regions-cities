import { Component, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from '../region';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'tt-department',
  standalone: true,
  imports: [MatList, MatListItem],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
})
export class DepartmentComponent {
  cities: City[] = [];

  constructor(route: ActivatedRoute) {
    route.data.pipe(takeUntilDestroyed()).subscribe((data) => (this.cities = data['cities']));
  }
}
