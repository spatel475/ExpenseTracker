import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() categories: string[];
  @Input() toggleSideNav: boolean;
  @Output() $categoryClicked = new EventEmitter();

  categoryClicked(category: string){
    this.$categoryClicked.emit(category);
  }
}
