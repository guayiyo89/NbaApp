import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  desktop = true;
  showMenuFlag = false;
  menu = [
    {
      name: 'Equipos',
      route: '/equipos'
    },
    {
      name: 'Jugadores',
      route: '/jugadores'
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.getScreenDesign();
  }

  @HostListener('window:resize')
  onResize() {
    this.getScreenDesign()
  }

  getScreenDesign(){
    this.desktop = window.innerWidth > 512
  }

  setMenuStatus(){
    if(this.showMenuFlag){
      this.showMenuFlag = false
    } else {
      this.showMenuFlag = true
    }
  }

}
