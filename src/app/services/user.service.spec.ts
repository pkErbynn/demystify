import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { UserService } from './user.service';
import { User } from '../interfaces/user';

describe('UserService', () => {
  let userService: UserService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [ UserService ]
    });

    userService = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should get users', () => {
    const mockUsers: User[] = [
      {name: 'user1', id: 1, email: 'user1@gmail.com', tech: 'angular', dance: 'dance1' },
      {name: 'user2', id: 2, email: 'user2@gmail.com', tech: '.NET', dance: 'dance2' }
    ];
    spyOn(httpClient, 'get').and.returnValue(of(mockUsers));

    userService.getUsers().subscribe(users => {
      expect(users).not.toBe(null);
      expect(users).toEqual(mockUsers);
    });
  });

  it('should throw an error message when get users fails', () => {
    const expectedErrorMock = { message: 'error has occurred'} as HttpErrorResponse;
    spyOn(httpClient, 'get').and.returnValue(throwError(expectedErrorMock));

    userService.getUsers().subscribe(
      users => {
      },
      err => {
        expect(err).toBe(expectedErrorMock.message);
      }
    );
  });
});
