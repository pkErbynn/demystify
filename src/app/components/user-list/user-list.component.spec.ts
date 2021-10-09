import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

import { UserListComponent } from './user-list.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let getUsersSpy: any;

  const mockUsers: User[] = [
    {name: 'user1', id: 1, email: 'user1@gmail.com', tech: 'Angular', dance: 'Kupe' },
    {name: 'user2', id: 2, email: 'user2@gmail.com', tech: 'Blazor', dance: 'Pilolo' },
    {name: 'user3', id: 3, email: 'user3@gmail.com', tech: 'Node.js', dance: 'Akwaaba' }
  ];

  beforeEach( () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    getUsersSpy = userServiceSpy.getUsers.and.returnValue(of(mockUsers));

    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ],
      imports: [ HttpClientModule ]
    });

    // wrapper to get component instance and its template/DOM element via nativeElement/debugElement
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users when onInit() is called', () => {
    component.ngOnInit(); // or fixture.detectChanges();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(3);
    expect(component.users).toEqual(mockUsers);
    expect(component.errorMessage).toBeUndefined();
  });

  it('should receive error when users service fails onInit()', () => {
    const expectedError = 'user service error occurred';
    getUsersSpy.and.returnValue(throwError(expectedError));

    fixture.detectChanges();  // or component.ngOnInit();

    expect(component.users.length).toBeLessThan(1);
    expect(component.users).not.toEqual(mockUsers); // for primitives
    expect(component.errorMessage).toBe(expectedError); // for objects and primitives
  });

  // ======== template testing =========

  it(`should render 'User List' title`, () => {
    component.title = 'User List';
    fixture.detectChanges();   // updates DOM

    // matches only the first element tag
    // debug element wraps native element
    const debugElement = fixture.debugElement.query(By.css('h3'));
    const element: HTMLElement = debugElement.nativeElement;
    expect(element.innerText).toContain('User List');
  });

  it(`should show error message on the UI`, () => {
    component.errorMessage = 'mock error message';
    fixture.detectChanges();   // updates DOM

    const debugElement = fixture.debugElement.query(By.css('.alert'));
    const element: HTMLElement = debugElement.nativeElement;
    expect(element.innerText).toContain('Error occurred');  // .toContain() for string
  });

  it('should have table with 4 header fields', () => {
    fixture.detectChanges();   // updates DOM

    // locate only the first tr element
    const debugElement = fixture.debugElement.query(By.css('tr'));
    expect(debugElement.childNodes.length).toBe(4);
  });

  it('should show 3 user records', () => {
    fixture.detectChanges();   // updates DOM

    const trElements = fixture.debugElement.queryAll(By.css('tr'));
    const availableUserRecords = trElements.slice(1);
    expect(availableUserRecords.length).toBe(3);
  });

  it('should show no users available when empty', () => {
    getUsersSpy.and.returnValue(of([]));

    fixture.detectChanges();   // updates DOM

    const debugElement = fixture.debugElement.query(By.css('#noUsersAvailable'));
    const trElement: HTMLElement = debugElement.nativeElement;
    // gets the html ele pluz the content
    expect(trElement.innerHTML).toContain('No users available');

    const availableUsersDebugElement = fixture.debugElement.queryAll(By.css('tr'))[2];
    expect(availableUsersDebugElement).not.toBeDefined();
  });


  // inner spy...doesn't require "useValue: userServiceSpy" in config
  // it('should fetch users on ngInit', () => {
  //   spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));
  //   component.ngOnInit(); // or fixture.detectChanges();
  //   expect(component.users).toEqual(mockUsers);
  // });
});


// NB ===
// Key takeaways for testing templates
// The DebugElement provides crucial insights into the component's DOM representation.
// you can walk (and query) the fixture's entire element and component subtrees.
// debugElement.queryAll(By.css(‘cssClass’))
// querySelector
// debugElement.nativeElement.outerHTML
// debugElement.nativeElement.textContent

// alt test for case #56
// const de: HTMLElement = fixture.debugElement.nativeElement;
// expect(de.querySelector('h3').textContent).toContain('User');
