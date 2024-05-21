import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '../data/category';
import { PostService } from '../services/post.service';
import { CategoryService } from '../services/category.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { PostCreateInput } from '../data/post';
import { Location } from '@angular/common';

@Component({
    selector: 'app-post-form',
    templateUrl: 'post-form.component.html'
})
export class PostFormComponent {
    categories: Category[] = []

    form = this.fb.group({
        title: [
            '',
            {
                validators: [Validators.required, Validators.minLength(5), Validators.maxLength(150)],
                updateOn: 'blur',
            },
        ],
        listCategories: [
            '',
            [
                Validators.required,
            ],
        ],
        content: [
            '',
            {
                validators: [Validators.required, Validators.maxLength(2500)],
                updateOn: 'blur',
            },
        ],
    });


    constructor(private fb: FormBuilder, private categoryService: CategoryService, private postService: PostService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.categoryService.getAll().subscribe((categories) => {
            this.categories = categories;
        });
    }


    get title() {
        return this.form.controls['title'];
    }

    get content() {
        return this.form.controls['content'];
    }

    get listCategories() {
        return this.form.controls['listCategories'];
    }

    onSubmit(): void {
        if (this.form.valid) {
            const newPost: PostCreateInput = {
                title: this.form.value.title!,
                content: this.form.value.content!,
                categoryId: this.form.value.listCategories!
            };
            this.postService.create(newPost).subscribe(response => {
                console.log('Post created successfully:', response);
                this.form.reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Post Submitted Successfully',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                this.router.navigate(['../'])
            }, error => {
                console.error('Error creating post:', error);
            });
        }
    }

    close(): void {
        this.form.reset();
        this.router.navigate(['../'])
    }

}