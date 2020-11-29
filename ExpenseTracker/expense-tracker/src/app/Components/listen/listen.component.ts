import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpeechService } from 'src/app/Services/speech.service';
import { Subscription } from 'rxjs';
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit, OnDestroy {

  private description: string[];
  private amount: string[];
  // private adj: string[];

  private descriptionSub: Subscription;
  private amountSub: Subscription;
  // private adjSub: Subscription;
  private errorSub: Subscription;

  errorMsg: string;

  constructor(public speech: SpeechService) { }

  ngOnInit(): void {
    this.speech.init();
    this._listenForDescription();
    this._listenForAmount();
    // this._listenAdj();
    this._listenErrors();
  }

  ngOnDestroy(): void {
    this.descriptionSub.unsubscribe();
    this.amountSub.unsubscribe();
    // this.adjSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  private _listenForDescription() {
    this.descriptionSub = this.speech.words$
      .pipe(
        filter(obj => obj.type === 'desc'),
        map(descObj => descObj.word)
      )
      .subscribe((desc) => {
        console.log('description:', desc);
      });
  }

  private _listenForAmount() {
    this.amountSub = this.speech.words$
      .pipe(
        filter(obj => obj.type === 'amt'),
        map(amtObj => amtObj.word)
      )
      .subscribe((amt) => {
        console.log('amount:', amt);
      });
  }

  // private _listenAdj() {
  //   this.adjSub = this.speech.words$
  //     .pipe(
  //       filter(obj => obj.type === 'adj'),
  //       map(adjObj => adjObj.word)
  //     )
  //     .subscribe((adj) => {
  //       console.log('adj:', adj);
  //     });
  // }

  private _listenErrors() {
    this.errorSub = this.speech.errors$.subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.warn('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

  get btnLabel(): string {
    return this.speech.listening ? 'Listening...' : 'Listen';
  }
}
