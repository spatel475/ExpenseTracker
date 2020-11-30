import { Component, OnInit } from '@angular/core';
import { AppLogicMain } from 'src/app/Services/app-logic/app-logic-main.service';
import { SpeechService } from 'src/app/Services/speech.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: string[] = [];

  isDarkTheme: boolean = false;

  constructor(
    private appLogic: AppLogicMain,
    public speech: SpeechService,
  ) { }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark' ? true : false;
  }


  addCategory(input: string) {
    this.appLogic.applogicMainTest();

    this.categories.push(input);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
    console.log(this.isDarkTheme);
  }

}
