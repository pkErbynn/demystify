import { IMocked, Mock, setupFunction } from '@morgan-stanley/ts-mocking-bird';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { UserService } from './user.service';
import { User } from '../interfaces/user';

fdescribe('UserService: MockingBird', () => {
  let mockHttp: IMocked<HttpClient>;
  let userService: UserService;

  const mockUsers: User[] = [
    {id: 1, name: 'erb', email: 'erb@tt.io', tech: 'Angular', dance: 'Shaku shaku'},
    {id: 2, name: 'ike', email: 'ike@tt.io', tech: 'Azure', dance: 'Gwara gwara'},
    {id: 3, name: 'joyce', email: 'joyce@tt.io', tech: 'C#', dance: 'Jerusalema'},
    {id: 4, name: 'chris', email: 'chris@tt.io', tech: 'Java', dance: 'Zanku'},
  ];

  beforeEach(() => {
    mockHttp = Mock.create<HttpClient>().setup(
      setupFunction('get', () => of(mockUsers) as any)  // setupProperty('get', of(mockUsers) as any)
    );

    userService = new UserService(mockHttp.mock);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should get users', () => {
    userService.getUsers().subscribe(users => {
      expect(mockHttp.withFunction('get')).wasCalledOnce();
      expect(users).not.toBe(null);
      expect(users.length).toBe(4);
      expect(users).toEqual(mockUsers);
    });
  });

  it('should throw an error message when get users fails', () => {
    const expectedErrorMock = { message: 'error has occurred'} as HttpErrorResponse;
    mockHttp = mockHttp.setup(
        setupFunction('get', () => throwError(expectedErrorMock))
    );

    userService.getUsers().subscribe(
      users => {
     },
      err => {
        expect(err).toBe(expectedErrorMock.message);
    });
  });
});