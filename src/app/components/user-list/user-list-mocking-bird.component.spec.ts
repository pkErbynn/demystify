import { IMocked, Mock, setupFunction } from '@morgan-stanley/ts-mocking-bird';
import { of } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { UserListComponent } from './user-list.component';

// using ms-ts-mocking-bird

describe('UserListComponent:MB', () => {
  let mockUserService: IMocked<UserService>;

  beforeEach(() => {
    mockUserService = Mock.create<UserService>();
  });

  function getInstance(): UserListComponent{
      return new UserListComponent(mockUserService.mock);
  }

  it('should create', () => {
    const userListComponent = getInstance();
    expect(userListComponent).toBeTruthy();
  });


  it('should fetch users from the server on ngOnInit()', () => {
    // Arrange
    const mockUsers = [
        {id: 1, name: 'ike', email: 'ike@tt.io', tech: '.NET', dance: 'Gwara gwara'},
        {id: 2, name: 'dawud', email: 'dawud@tt.io', tech: 'Java', dance: 'Zanku'},
        {id: 3, name: 'erb', email: 'erb@tt.io', tech: 'Angular', dance: 'Shaku shaku'},
        {id: 4, name: 'yaa', email: 'yaa@tt.io', tech: 'React', dance: 'Jerusalema'},
        {id: 5, name: 'francis', email: 'francis@tt.io', tech: 'Python', dance: 'Poco Legwork'}
    ];
    mockUserService.setup(setupFunction('getUsers', () => of(mockUsers)));
    const userListComponent = getInstance();

    // Act
    userListComponent.ngOnInit();

    // Asset
    expect(userListComponent.users.length).toEqual(5);
    expect(userListComponent.users).toBe(mockUsers);
  });

});
