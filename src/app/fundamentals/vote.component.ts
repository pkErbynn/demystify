// property
// methods that modifies the property
// state change pattern
// in reality, might save to a db afterwards

export class VoteComponent {
    totalVotes = 0;

    upVote(): void {
      this.totalVotes++;
    }

    downVote(): void {
      this.totalVotes--;
    }
}
