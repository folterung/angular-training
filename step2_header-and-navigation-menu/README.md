## Step 2 - Header and side navigation menu

### Objective

Add a header and side navigation menu.

### Steps

1. Update `app.module.ts` to import the following:
    - MatIconModule
    - MatListModule
    - MatSidenavModule
    - MatToolbarModule

    <details>
      <summary>Snippet (Click to expand)</summary>
      
      ```TypeScript
      import { NgModule } from '@angular/core';
      // Import these NgModules
      import { MatIconModule } from '@angular/material/icon';
      import { MatListModule } from '@angular/material/list';
      import { MatSidenavModule } from '@angular/material/sidenav';
      import { MatToolbarModule } from '@angular/material/toolbar';
      // END Import
      import { BrowserModule } from '@angular/platform-browser';
      import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

      import { AppRoutingModule } from './app-routing.module';
      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent
        ],
        imports: [
          AppRoutingModule,
          BrowserModule,
          BrowserAnimationsModule,
          // Add the imported NgModules to the 'imports' array
          MatIconModule,
          MatListModule,
          MatSidenavModule,
          MatToolbarModule
          // END Add imports
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
      ```

    </details>
    </br>

2. Update `app.component.ts`:
    <details>
      <summary>Snippet (Click to expand)</summary>

      ```TypeScript
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
      ```

    </details>
    </br>

3. Update `app.component.html`:
    <details>
      <summary>Snippet (Click to expand)</summary>

      ```HTML
      <mat-toolbar color="primary" class="toolbar">
        <div class="toolbar-title">
            <span routerLink="home" class="toolbar-title__text">{{title}}</span>
        </div>
      </mat-toolbar>

      <mat-sidenav-container class="layout-container">
        <mat-sidenav class="side-menu" mode="side" opened>
          <header class="side-menu__header">Actions</header>
          <mat-nav-list>
          <mat-list-item tabindex="0" (click)="goTo(HOME_PATH)" (keypress)="goTo(HOME_PATH)" [disabled]="currentRoute === HOME_PATH">
                <mat-icon color="accent" matListIcon>home</mat-icon>
                <span>Home</span>
            </mat-list-item>

            <mat-list-item tabindex="0" (click)="goTo(ADD_TODO_PATH)" (keypress)="goTo(ADD_TODO_PATH)" [disabled]="currentRoute === ADD_TODO_PATH">
                <mat-icon color="accent" matListIcon>add</mat-icon>
                <span>Add Todo</span>
            </mat-list-item>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content class="layout-container__content">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
      ```

    </details>
    </br>