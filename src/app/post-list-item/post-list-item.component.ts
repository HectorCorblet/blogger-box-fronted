import { Component, Input } from '@angular/core';
import { Post } from '../data/post';
import { PostCreateInput } from '../data/post';
import { Category } from '../data/category';
import { FormBuilder, Validators } from "@angular/forms";
import { CategoryService } from '../services/category.service';
import { PostService } from '../services/post.service';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: 'app-post-list-item',
    templateUrl: "post-list-item.component.html"
})
export class PostItemComponent {
    isEditing: boolean = false
    categories: Category[] = []
    @Input()
    post!: Post

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
        this.form.patchValue({
            title: this.post.title,
            listCategories: this.post.category.id,
            content: this.post.content
        });
    }

    editing(): void {
        this.isEditing = true
    }

    onDelete(): void {
        this.postService.delete(this.post).subscribe(response => {
            Swal.fire({
                icon: 'success',
                title: 'Post supprimé',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
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

    close(): void {
        this.form.reset();
        this.isEditing = false;
    }

    onSubmit(): void {
        if (this.form.valid) {
            const newPost: PostCreateInput = {
                title: this.form.value.title!,
                content: this.form.value.content!,
                categoryId: this.form.value.listCategories!
            };
            this.postService.update(this.post.id, newPost).subscribe(response => {
                console.log('Post created successfully:', response);
                this.form.reset();
                this.post = response;
                Swal.fire({
                    icon: 'success',
                    title: 'Post mis à jour',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                this.isEditing = false;
            }, error => {
                console.error('Error creating post:', error);
            });
        }
    }

}