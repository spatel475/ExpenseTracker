import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

declare var annyang: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  words$ = new Subject<{ [key: string]: string }>();
  errors$ = new Subject<{ [key: string]: any }>();
  listening = false;

  constructor(private ngZone: NgZone) { }


  get speechSupported(): boolean {
    return !!annyang;
  }

  init() {
    const commands = {
      'description : description': (desc) => {
        console.log(desc)
        this.ngZone.run(() => {
          this.words$.next({ type: 'description', 'description': desc });
        });
      },
      'amount :amt': (amt) => {
        this.ngZone.run(() => {
          this.words$.next({ type: 'amt', 'word': amt });
        });
      },
      'adjecttive :adj': (adj) => {
        this.ngZone.run(() => {
          this.words$.next({ type: 'adj', 'word': adj });
        });
      }
    };

    annyang.addCommands(commands);

    // Log anything the user says and what speech recognition thinks it might be
    annyang.addCallback('result', (userSaid) => {
      console.log('User may have said:', userSaid);
    });

    annyang.addCallback('errorNetwork', (err) => {
      this._handleError('network', 'A network error occured.', err);
    });
    annyang.addCallback('errorPermissionBlocked', (err) => {
      this._handleError('blocked', 'Browser blocked microphone permissions.', err);
    });
    annyang.addCallback('errorPermissionDenied', (err) => {
      this._handleError('denied', 'User denied microphone permissions.', err);
    });
    annyang.addCallback('resultNoMatch', (userSaid) => {
      this._handleError('no match',
        'Spoken command not recognized. Say "noun [word]", "verb [word]", OR "adjective [word]".',
        { results: userSaid });
    });
  }


  _handleError(error, msg, errObj) {
    this.ngZone.run(() => {
      this.errors$.next({
        error: error,
        message: msg,
        obj: errObj
      });
    });
  }

  startListening() {
    annyang.start();
    annyang.debug();
    this.listening = true;
  }

  abort() {
    annyang.abort();
    this.listening = false;
  }

}
