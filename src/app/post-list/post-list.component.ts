import { Component, OnInit } from '@angular/core';
import { Post } from "../data/post";
import { PostService } from '../services/post.service';

@Component({
    selector: 'app-post-list',
    templateUrl: 'post-list.component.html'

})
export class PostListComponent implements OnInit {
    posts: Post[] = []

    constructor(private postService: PostService) {
    }

    ngOnInit(): void {
        this.loadPoast();
    }

    loadPoast(): void {
        this.postService.getAll().subscribe((posts) => { this.posts = posts })
    }

}