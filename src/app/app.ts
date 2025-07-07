import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutModule],
  template: `
    <nz-layout>
      <nz-header>
        <h1>Movie Qualifier</h1>
      </nz-header>
      <nz-content><router-outlet /></nz-content>
      <nz-footer>Made by Vitor Abreu</nz-footer>
    </nz-layout>
  `,
  styleUrl: './app.scss'
})
export class App {}
