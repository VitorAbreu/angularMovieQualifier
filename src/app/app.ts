import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


@Component({
  selector: 'app-root',
  imports: [NzLayoutModule, NzDropDownModule, NzIconModule, RouterModule],
  template: `
    <nz-layout>
      <nz-header>
        <h1>Movie Qualifier</h1>
      </nz-header>
        <ul nz-menu nzTheme="dark" nzMode="horizontal">
          <li
            nz-menu-item routerLinkActive="ant-menu-item-selected"
            [routerLinkActiveOptions]="{exact: true}" [routerLink]="['']"
          >Search Page</li>
          <li
            nz-menu-item routerLinkActive="ant-menu-item-selected"
            [routerLinkActiveOptions]="{exact: true}"[routerLink]="['collections']"
          >Collections Page</li>
        </ul>
      <nz-content><router-outlet /></nz-content>
      <nz-footer>Made by Vitor Abreu</nz-footer>
    </nz-layout>
  `,
  styleUrl: './app.scss'
})
export class App {}
