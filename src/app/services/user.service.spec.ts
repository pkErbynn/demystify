import { IMocked, Mock, setupFunction } from '@morgan-stanley/ts-mocking-bird';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { UserService } from './user.service';
import { User } from '../interfaces/user';

describe('UserService', () => {
  let mockHttp: IMocked<HttpClient>;
  const mockUsers = [
    {id: 1, name: 'ike', email: 'ike@tt.io', tech: '.NET', dance: 'Gwara gwara'},
    {id: 2, name: 'dawud', email: 'dawud@tt.io', tech: 'Java', dance: 'Zanku'},
    {id: 3, name: 'erb', email: 'erb@tt.io', tech: 'Angular', dance: 'Shaku shaku'},
    {id: 4, name: 'yaa', email: 'yaa@tt.io', tech: 'React', dance: 'Jerusalema'},
    {id: 5, name: 'francis', email: 'francis@tt.io', tech: 'Python', dance: 'Poco Legwork'}
];

  beforeEach(() => {
    mockHttp = Mock.create<HttpClient>().setup(
      setupFunction('get', () => of(mockUsers) as any)  // setupProperty('get', of(mockUsers) as any)
    );
  });

  function getInstance(): UserService {
    return new UserService(mockHttp.mock);
  }

  it('should be created', () => {
    const userService = getInstance();
    expect(userService).toBeTruthy();
  });

  it('should get users', (done: DoneFn) => {
    const userService = getInstance();
    userService.getUsers().subscribe(users => {
      expect(mockHttp.withFunction('get')).wasCalledOnce();
      expect(users.length).toBe(5);
      done();   // called when the async work is complete
    });
  });
});
