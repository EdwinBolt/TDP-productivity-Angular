import { TestBed } from '@angular/core/testing';

import { ProjectUserService } from './project-user.service';

describe('ProjectUserService', () => {
  let service: ProjectUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
