import {MathService} from './math.service';
import {TestBed} from "@angular/core/testing";

describe('MathService', () => {
  let service: MathService;

  beforeEach(async() => {
    service = TestBed.inject(MathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should return true res', () => {
    let res = service.calcDistanceToZeroKm(1,1);
    expect(res).toBe(6918.991720249575);
  })
});
