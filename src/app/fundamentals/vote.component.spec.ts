import { VoteComponent } from './vote.component';

// testing state change scenario...mostly void methods

describe('VoteComponent', () => {
  let voteComponent: VoteComponent;

  beforeEach(() => {
    voteComponent = new VoteComponent();
  });

//   afterEach(() => {}) ...as tear down
//   beforeAll(() => {})
//   afterAll(() => {})

  it('should increment totalVote by one when upvoted() is called', () => {
    voteComponent.upVote(); // no return type
    expect(voteComponent.totalVotes).toEqual(1); // state asserted
  });

  it('should decrement totalVote by one when downvoted() is invoked', () => {
    // Triple A pattern - AAA

    // Arrange - SUT
    const vComponent = new VoteComponent();

    // Act - method call site
    vComponent.downVote();

    // Assert - assertions
    expect(vComponent.totalVotes).toBe(-1);
  });
});


// =====
// NB:
// toBe() -> comparing objects
// toEqual() -> comparing values
// interchangeably -> comparing primitive types
