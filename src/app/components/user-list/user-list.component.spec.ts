import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { UserListComponent } from './user-list.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

// TODO:
// consolidate beforeEach()
// find getUsersSpy type

fdescribe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let getUsersSpy: any;

  const mockUsers: User[] = [
    {name: 'user1', id: 1, email: 'user1@gmail.com', tech: 'angular', dance: 'dance1' },
    {name: 'user2', id: 2, email: 'user2@gmail.com', tech: '.NET', dance: 'dance2' }
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    getUsersSpy = userServiceSpy.getUsers.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [
        // This time, in addition to declaring the component-under-test, 
        // the configuration adds a UserService provider to the providers list. But not the real UserService.
        { provide: UserService, useValue: userServiceSpy } // not providing a real service, but a test-double
      ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users when onInit() is called', () => {
    component.ngOnInit(); // or fixture.detectChanges();

    expect(component.users.length).toBe(2);
    expect(component.users).toEqual(mockUsers);
    expect(component.errorMessage).toBeUndefined();
  });

  it('should receive error when get users service fails onInit()', () => {
    const expectedError = 'user service error occurred';
    getUsersSpy.and.returnValue(throwError(expectedError));

    component.ngOnInit(); // or fixture.detectChanges();

    expect(component.users.length).toBeLessThan(1);
    expect(component.users).not.toEqual(mockUsers);
    expect(component.errorMessage).toBe(expectedError);
  });

  // inner spy...doesn't require "useValue: userServiceSpy" in config
  // it('should fetch users on ngInit', () => {
  //   spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));
  //   component.ngOnInit(); // or fixture.detectChanges();
  //   expect(component.users).toEqual(mockUsers);
  //   expect(component.errorMessage).toBeUndefined();
  // });
});
