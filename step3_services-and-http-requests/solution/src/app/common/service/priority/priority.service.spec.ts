import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Priority } from '@models/priority';
import { PriorityService } from './priority.service';

describe('PriorityService', () => {
  let priorityService: PriorityService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PriorityService
      ]
    });

    priorityService = TestBed.inject(PriorityService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  describe('getPriorities', () => {
    it('calls expected endpoint if not cached', () => {
      const expectedUrl = 'http://localhost:1337/priorities';
      const expectedResult = [
        new Priority({id: 123, text: 'High', value: 1})
      ];

      priorityService.forceRefresh();
      priorityService.getPriorities().subscribe({
        next: result => {
          expect(result).toEqual(expectedResult);
        }
      });

      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(expectedResult);

      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe(expectedUrl);
    });

    it('returns cached response if already fetched', () => {
      const expectedUrl = 'http://localhost:1337/priorities';
      const expectedResult = [
        new Priority({id: 123, text: 'High', value: 1})
      ];

      priorityService.forceRefresh();
      priorityService.getPriorities().subscribe({
        next: result => {
          expect(result).toEqual(expectedResult);
        }
      });

      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(expectedResult);

      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe(expectedUrl);

      priorityService.getPriorities().subscribe({
        next: result => {
          expect(result).toEqual(expectedResult);
        }
      });

      httpTestingController.expectNone(expectedUrl);
    });
  });
});
