import { Component, OnInit } from '@angular/core';
import { AppLogicMain } from 'src/app/Services/app-logic/app-logic-main.service';
import { SpeechService } from 'src/app/Services/speech.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidebarCategories: string[] = ['Home', 'Reports', 'Settings'];
  isDarkTheme: boolean = false;
  sideNavOpen = false;

  constructor(
    private appLogic: AppLogicMain,
    public speech: SpeechService,
  ) { }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark' ? true : false;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }

  getTheme() {
    let theme = localStorage.getItem('theme');
    return theme == 'Dark' ? false : true;
  }

  routeToComponent(data) {
    console.log(data); // this will eventually route to different components 
  }
}
