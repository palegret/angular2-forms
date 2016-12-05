import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { UserFormComponent } from './users/user-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    AppComponent,
    UserProfileComponent,
    UserListComponent,
    UserFormComponent,
    TemplateFormComponent,
    ReactiveFormComponent
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule {}
