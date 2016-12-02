import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { UserFormComponent } from './users/user-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule
  ],
  declarations: [ 
    AppComponent,
    UserProfileComponent,
    UserListComponent,
    UserFormComponent,
    TemplateFormComponent
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule {}
