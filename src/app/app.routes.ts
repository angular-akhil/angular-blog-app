import { Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  {
    path: 'blog/:id',
    component: DetailsComponent,
  },
  { path: '**', redirectTo: '/blog', pathMatch: 'full' },
];
