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

	formErrors: any = {
		name: '',
		username: ''
	}

	validationMessages: any = {
		name: {
			required: 'Name is required.',
			minlength: 'Name must be at least 3 characters.',
			maxlength: 'Name cannot be more than 5 characters.'
		},
		username: {
			required: 'Username is required.',
			minlength: 'Username must be at least 3 characters.'
		}		
	}	

	constructor(private formBuilder: FormBuilder) {}

  get diagnostic() {
    return JSON.stringify(this.form.value);
  }

	private formConfig: any = {
		name: ['', [
			Validators.minLength(3), 
			Validators.maxLength(6)
		]],
		username: ['', [
			Validators.minLength(3)
		]]
	};

	private validateForm(): void {
		for (let field in this.formErrors) {
			this.formErrors[field] = '';

			let input = this.form.get(field);

			if (this.invalid(input))
				for (let error in input.errors)
					this.formErrors[field] = this.validationMessages[field][error];
		}
	}

	private buildForm(): void {
		this.form = this.formBuilder.group(this.formConfig);
		this.form.valueChanges.subscribe(formData => this.validateForm());
	}

  ngOnInit() {
    this.user = new User(); 
		this.buildForm();
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
