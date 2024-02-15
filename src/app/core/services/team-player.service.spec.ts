/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamPlayerService } from './team-player.service';

describe('Service: TeamPlayer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamPlayerService]
    });
  });

  it('should ...', inject([TeamPlayerService], (service: TeamPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
