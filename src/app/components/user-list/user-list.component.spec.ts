import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { UserService } from 'src/app/services/user.service';
import { UserListComponent } from './user-list.component';

// description for a group of related tests
describe('UserListComponent', () => {
  let component: UserListComponent;

  // wrapper for getting an instance of component and template/DOM el via nativeEl/debugEl
  // manual change detection
  // injected dependencies accessible
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [UserService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  // 'it' defines a test or spec
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users from the server', () => {
    // Arrange
    const mockUsers = [
      {id: 1, name: 'user1', email: 'erb@abc.com', tech: '.NET', dance: 'Pocco'},
      {id: 2, name: 'user2', email: 'margaret@abc.com', tech: 'Scala', dance: 'Zanku'},
      {id: 3, name: 'user3', email: 'raphael@abc.com', tech: 'Java', dance: 'Shaku shaku'}
    ];
    const userService = TestBed.inject(UserService);  // gets the service dependency for mocking
    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));

    // Act
    fixture.detectChanges();  // updates DOM
    // component.ngOnInit()

    // Assert
    expect(component.users.length).toEqual(3);  // for primitives
    expect(component.users).toBe(mockUsers);  // for objects and primitives
  });

  it(`should render 'User List' as title`, () => {
    component.title = 'User List';
    fixture.detectChanges();

    // matches only the first element tag
    // debug element wraps native element
    const debugElement = fixture.debugElement.query(By.css('h3'));
    const element: HTMLElement = debugElement.nativeElement;
    expect(element.innerHTML).toContain('User');
  });
});



// NB ===
// Key takeaways for testing templates
// The DebugElement provides crucial insights into the component's DOM representation.
// you can walk (and query) the fixture's entire element and component subtrees.
// debugElement.queryAll(By.css(‘cssClass’))
// querySelector
// debugElement.nativeElement.outerHTML
// debugElement.nativeElement.textContent

// alt test for cas #56
// const de: HTMLElement = fixture.debugElement.nativeElement;
// expect(de.querySelector('h3').textContent).toContain('User');

