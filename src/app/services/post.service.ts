import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

import { Post, PostCreateInput } from "../data/post";
import { environment } from "../environnement/environnement";

@Injectable()
export class PostService {

    private postsUrl = `${environment.apiUrl}/v1/posts`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postsUrl)
            .pipe(
                tap(posts => console.log('Posts:', posts)))
    }

    create(post: PostCreateInput): Observable<PostCreateInput | Post> {
        return this.http.post<Post>(this.postsUrl, post).pipe(
            catchError(this.handleError<PostCreateInput>('create', post))
        );
    }

    update(postId: string, post: PostCreateInput): Observable<Post> {
        console.log('postId:', postId);
        console.log('post:', post);
        const url = `${this.postsUrl}/${postId}`;
        return this.http.put<Post>(url, post);
    }

    delete(post: Post): Observable<boolean> {
        return this.http.delete<boolean>(`${this.postsUrl}/${post.id}`);
    }

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`, error);
            // Renvoyer un observable contenant le résultat par défaut
            return of(result as T);
        };
    }
}
