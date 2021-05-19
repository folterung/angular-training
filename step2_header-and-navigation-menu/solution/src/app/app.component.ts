import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  readonly HOME_PATH = '/home';
  readonly ADD_TODO_PATH = '/add-todo';
  readonly title = 'TODO: Angular Training';
  
  currentRoute: string;

  private subscriptionManager = new Subscription();

  constructor(private router: Router) {}

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }

  ngOnInit() {
    this.subscriptionManager.add(
      this.router.events.subscribe({
        next: (routerEvent: RouterEvent) => {
          if (routerEvent instanceof NavigationEnd) {
            this.currentRoute = routerEvent.urlAfterRedirects;
          }
        }
      })
    );
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
