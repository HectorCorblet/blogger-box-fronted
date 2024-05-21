import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PostModule } from './post.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PostModule,
    HttpClientModule,
  ],
  providers: [
    PostService,
    DatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
