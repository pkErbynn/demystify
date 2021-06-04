import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { UserService } from 'src/app/services/user.service';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => { // description for a group of related tests
  let component: UserListComponent;

  // ComponentFixture properties and methods provide access to the component,
  // its DOM representation
  let fixture: ComponentFixture<UserListComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ UserListComponent ]
  //   })
  //   .compileComponents(); // compiles component[] + html + stylesheet together since are external  diff files
  //   // ...file sys needs access as part of compilation
  //   // ...ie, done asynchronously
  //   // webpack inlines all external files like the stylesheet into a single js bungle therefore no need for .compileComponents() async
  // });

  // beforeEach(() => {
  //   // wrapper for getting an instance of component and template/DOM el via nativeEl/debugEl
  //   // ...manual change detection + accessible injected dependencies
  //   fixture = TestBed.createComponent(UserListComponent);
  //   component = fixture.componentInstance;
  //   // fixture causes Angular to perform certain tasks on the component tree.
  //   // can trigger Angular behavior in response to simulated user action.
  //   fixture.detectChanges();
  // });

  // simplified
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [UserService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // OnNgInit() already called and our service data is not ready
  });

  it('should create', () => {  // 'it' defines a test or spec
    expect(component).toBeTruthy();
  });

  it('should load users from the server', () => {
    const mockUsers = [
      {id: 1, name: 'user1', email: 'erb@abc.com', tech: '.NET', dance: 'Pocco'},
      {id: 2, name: 'user2', email: 'margaret@abc.com', tech: 'Scala', dance: 'Zanku'},
      {id: 3, name: 'user3', email: 'raphael@abc.com', tech: 'Java', dance: 'Shaku shaku'}
    ];
    const userService = TestBed.inject(UserService);  // gets the service dependency for mocking
    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));

    fixture.detectChanges();
    expect(component.users.length).toEqual(3);  // for primitives
    expect(component.users).toBe(mockUsers);  // for objects and primitives
  });

  it(`should render 'User List' as title`, () => {
    component.title = 'User List';
    fixture.detectChanges();  // updates DOM

    const debugElement = fixture.debugElement.query(By.css('h3')); // matches only the first element
    // debug element wraps native element
    const element: HTMLElement = debugElement.nativeElement; // typed cus Angular made type as 'any'
    expect(element.innerHTML).toContain('User');  // mostly for strings and arrays

    // alt
    // const de: HTMLElement = fixture.debugElement.nativeElement;
    // expect(de.querySelector('h3').textContent).toContain('User');
  });
});


// The DebugElement provides crucial insights into the component's DOM representation.
// you can walk (and query) the fixture's entire element and component subtrees.

// Key takeaways for testing templates
// debugElement.queryAll(By.css(‘cssClass’))
// querySelector
// debugElement.nativeElement.outerHTML
// debugElement.nativeElement.textContent

