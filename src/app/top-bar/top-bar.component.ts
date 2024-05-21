import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
})

export class TopBarComponent {
    constructor(private router: Router) { }
    navigateToCreate(): void {
        this.router.navigate(['post/add']);
    }
}