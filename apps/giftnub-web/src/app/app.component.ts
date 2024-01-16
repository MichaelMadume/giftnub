import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NbLayoutModule } from '@nebular/theme';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, NbLayoutModule],
  selector: 'giftnub-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'giftnub-web';
}
