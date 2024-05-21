import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category, CategoryCreateInput } from "../data/category";
import { Observable } from "rxjs";
import { environment } from "../environnement/environnement";

@Injectable()
export class CategoryService {
    private categoriesUrl = `${environment.apiUrl}/v1/categories`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesUrl);
    }

    create(category: CategoryCreateInput): Observable<Category> {
        return this.http.post<Category>(this.categoriesUrl, category);
    }

    update(category: Category): Observable<Category> {
        return this.http.put<Category>(this.categoriesUrl, category);
    }

    delete(category: Category): Observable<boolean> {
        return this.http.delete<boolean>('${this.categoriesUrl}/${category.id}');
    }
}