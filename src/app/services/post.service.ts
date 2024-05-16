import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { Post } from "../data/post";
import { POSTS } from "../data/mock/post-mock";

@Injectable()
export class PostService {
    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        const posts = of(POSTS);
        return posts;
    }
}