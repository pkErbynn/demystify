import { VoteComponent } from './vote.component';

// testing state change scenario...mostly void methods
describe('VoteComponent', () => {
//// common init

//// impact others
// let voteComponent = new VoteComponent();

//// isolated worlds, clean state
//   let voteComponent: VoteComponent;

//   beforeEach(() => { ...as set up
//     voteComponent = new VoteComponent();
//   })

//   afterEach(() => {}) ...as tear down
//   beforeAll(() => {})
//   afterAll(() => {})

  it('should increment totalVote by one when upvoted() is called', () => {
    const voteComponent = new VoteComponent() ;
    voteComponent.upVote(); // no return type
    expect(voteComponent.totalVotes).toEqual(1); // state asserted
  });

  it('should decrement totalVote by one when downvoted() is invoked', () => {
    // Triple A pattern - AAA
    // Arrange - init SUT
    // Act - method call site
    // Assert - assertions
    const voteComponent = new VoteComponent();
    voteComponent.downVote();
    expect(voteComponent.totalVotes).toBe(-1);
  });
});

// NB:
// toBe() -> comparing objects
// toEqual() -> comparing values
// interchangeably -> comparing primitive types