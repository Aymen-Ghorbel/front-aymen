import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { GlobalVariables } from 'src/app/common/global-variables';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private globalVar: GlobalVariables) {
    console.log('global idCredit: ',this.globalVar.idCredit);
   }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
