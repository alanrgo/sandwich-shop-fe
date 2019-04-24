import { TestBed, getTestBed } from '@angular/core/testing';

import { SandwichService } from './sandwich.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomSandwichPayload } from './custom-sandwich';

let injector: TestBed;
let service: SandwichService;
let httpMock: HttpTestingController;

describe('SandwichService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SandwichService]
    });

    injector = getTestBed();
    service = injector.get(SandwichService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get sandwich list through correct endpoint', () => {
    const dummySandwiches = [
      {
          price: 6.5,
          name: 'X-Bacon',
          ingredients: [
              'bacon',
              'meat',
              'cheese'
          ]
      },
      {
          price: 4.5,
          name: 'X-Burger',
          ingredients: [
              'meat',
              'cheese'
          ]
      }];
    service.getSandwichList().subscribe(sandwiches => {
      expect(sandwiches.length).toBe(2);
      expect(sandwiches).toBe(dummySandwiches);
    });

    const req = httpMock.expectOne(service.GET_ALL_SANDWICHES_URL);
    expect(req.request.method).toBe('POST');
    req.flush(dummySandwiches);
  });

  it('should get sandwich price through correct endpoint', () => {
    const dummySandwich: CustomSandwichPayload = new CustomSandwichPayload(1, 1, 1, 1, 1);
    service.getSandwichPrice(dummySandwich).subscribe(body => {
      expect(body.price).toBe(7.7);
    });

    const req = httpMock.expectOne(service.GET_SANDWICH_PRICE);
    expect(req.request.method).toBe('POST');
    req.flush(dummySandwich);
  });

});
