import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionComponent } from './region.component';
import { RegionsGateway } from '../regions.gateway';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Region } from '../region';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('RegionComponent', () => {
  let component: RegionComponent;
  let fixture: ComponentFixture<RegionComponent>;
  let regionsGateway: RegionsGateway;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionComponent, HttpClientTestingModule, NoopAnimationsModule],
    }).compileComponents();

    regionsGateway = TestBed.inject(RegionsGateway);

    fixture = TestBed.createComponent(RegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should selectRegion', () => {
    jest.spyOn(regionsGateway, 'fetchDepartments').mockReturnValue(of([]));

    const region: Region = { code: '28', nom: 'Normandie' };
    component.selectRegion(region);

    expect(regionsGateway.fetchDepartments).toHaveBeenNthCalledWith(1, region.code);
  });
});
