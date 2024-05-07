import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegionsGateway } from './regions.gateway';
import { Type } from '@angular/core';
import { Region } from './region';

describe('RegionsGateway', () => {
  let gateway: RegionsGateway;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    gateway = TestBed.inject(RegionsGateway);
    backend = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    backend.verify();
  });

  it('should fetchRegions', () => {
    const regionSearch = 'TestRegion';
    const expectedRegions: Region[] = [{ code: '28', nom: 'Normandie' }];

    gateway.fetchRegions(regionSearch).subscribe((regions) => expect(regions).toEqual(expectedRegions));

    const httpMock = backend.expectOne('https://geo.api.gouv.fr/regions?nom=' + regionSearch);
    expect(httpMock.request.method).toBe('GET');
    httpMock.flush(expectedRegions);
  });
});
