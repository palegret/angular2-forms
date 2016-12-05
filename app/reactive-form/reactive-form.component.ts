import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/models/user';

@Component({
  selector: 'reactive-form',
  templateUrl: './app/reactive-form/reactive-form.component.html',
  styleUrls: ['./app/reactive-form/reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
	user: User
	form: FormGroup
  submitted: boolean = false
	nameError: string
	usernameError: string
	
	constructor(private formBuilder: FormBuilder) {	
	}

  get diagnostic() {
    return JSON.stringify(this.form.value);
  }

  ngOnInit() {
    this.user = new User(); 

		this.form = this.formBuilder.group({
			name: ['', [
				Validators.minLength(3), 
				Validators.maxLength(6)
			]],
			username: ['', [
				Validators.minLength(3)
			]]
		});

		this.form.valueChanges.subscribe(formData => {
			this.nameError = null;
			this.usernameError = null;

			let name = this.form.get('name');
			let username = this.form.get('username');

			if (this.invalid(name)) {
				if (name.errors['required'])
					this.nameError = 'Name is required.';

				if (name.errors['minlength'])
					this.nameError = 'Name must be at least 3 characters.';

				if (name.errors['maxlength'])
					this.nameError = 'Name cannot be more than 5 characters.';
			}

			if (this.invalid(username)) {
				if (username.errors['required'])
					this.usernameError = 'Username is required.';

				if (username.errors['minlength'])
					this.usernameError = 'Username must be at least 3 characters.';				
			}
		});
  }

  valid(model: any): boolean {
    return model && model.dirty && model.valid;
  }
  
  invalid(model: any): boolean {
    return model && model.dirty && model.invalid;
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
