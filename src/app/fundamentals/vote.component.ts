// state change
// methods that modifies the property
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
