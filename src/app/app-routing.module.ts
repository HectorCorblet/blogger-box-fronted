import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { AppComponent } from './app.component';
import { PostFormComponent } from './post-form/post-form.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'posts', component: PostFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
