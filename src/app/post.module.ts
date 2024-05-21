import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { RouterModule, Routes } from "@angular/router";
import { PostService } from './services/post.service';
import { CategoryService } from './services/category.service';
import { PostFormComponent } from './post-form/post-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { PostItemComponent } from './post-list-item/post-list-item.component';


const postRoutes: Routes = [
    { path: 'post/add', component: PostFormComponent },
    { path: 'posts', component: PostListComponent },
]

@NgModule({
    declarations: [
        PostItemComponent,
        PostListComponent,
        PostFormComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(postRoutes),
        ReactiveFormsModule
    ],
    providers: [PostService, CategoryService, DatePipe]
})
export class PostModule {
}