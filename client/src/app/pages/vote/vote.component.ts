import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  vote = 0;

  constructor() { }

  ngOnInit() {
  }

  onVote(id) {
    this.vote += 1;
  }

}
