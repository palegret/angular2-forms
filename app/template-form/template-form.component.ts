import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';

@Component({
  selector: 'template-form',
  templateUrl: './app/template-form/template-form.component.html',
  styleUrls: ['./app/template-form/template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
	user: User
  submitted: boolean = false

  get diagnostic() {
    return JSON.stringify(this.user);
  }

  ngOnInit() {
    this.user = new User(); 
  }

  valid(model: any): boolean {
    return model && model.touched && model.dirty && model.valid;
  }
  
  invalid(model: any): boolean {
    return model && model.touched && model.dirty && model.invalid;
  }
  
  validationClass(model: any): string {
  	if (this.valid(model))
      return 'has-success';      
  	else if (this.invalid(model))
      return 'has-error';
    else
      return '';
  }

  processForm() {
    this.submitted  = true;
  }
}
