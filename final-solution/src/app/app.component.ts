import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TODO: Angular Training';
  currentRoute: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationEnd) {
        this.currentRoute = routerEvent.urlAfterRedirects;
      }
    });
  }
}
