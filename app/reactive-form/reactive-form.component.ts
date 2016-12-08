import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  templateUrl: './app/reactive-form/reactive-form.component.html',
  styleUrls: ['./app/reactive-form/reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
	public form: FormGroup
  public submitted: boolean = false

	public formErrors: any = {
		name: '',
		username: '',
		addresses: [
			{ city: '', country: '' }
		]
	}

	public validationMessages: any = {
		name: {
			required: 'Name is required.',
			minlength: 'Name must be at least 3 characters.',
			maxlength: 'Name cannot be more than 5 characters.'
		},
		username: {
			required: 'Username is required.',
			minlength: 'Username must be at least 3 characters.'
		},		
		addresses: {
			city: {
				required: 'City is required.',
				minlength: 'City must be at least 3 characters.'
			},
			country: {
				required: 'Country is required.',
				minlength: 'Country must be at least 3 characters.'
			}			
		}
	}	

  public get diagnostic(): string {
    return JSON.stringify(this.form.value);
  }

	constructor(private formBuilder: FormBuilder) {}

	private formConfig: any = {
		name: ['', [
			Validators.required,
			Validators.minLength(3), 
			Validators.maxLength(6)
		]],
		username: ['', [
			Validators.required,
			Validators.minLength(3)
		]],
		addresses: this.formBuilder.array([
			this.formBuilder.group({
				city: ['', [
					Validators.required,
					Validators.minLength(3)
				]],
				country: ['', [
					Validators.required
				]]
			})
		])
	};
	
  private validateAddresses(): void {
    this.formErrors.addresses = [];

    let addresses = <FormArray>this.form.get('addresses');

    for (let n = 0, len = addresses.length; n < len; n++) {
			// Push new validation error object for address n
      this.formErrors.addresses.push({ city: '', country: '' });

			// Get specific FormGroup for address n
      let address = <FormGroup>addresses.at(n);

      for (let field in address.controls) {
        let input = address.get(field);

				if (this.invalid(input))
          for (let error in input.errors)
            this.formErrors.addresses[n][field] = this.validationMessages.addresses[field][error];
      }
    }
  }

	private validateForm(): void {
		for (let field in this.formErrors) {
			this.formErrors[field] = '';

			let input = this.form.get(field);

			if (this.invalid(input))
				for (let error in input.errors)
					this.formErrors[field] = this.validationMessages[field][error];
		}

		this.validateAddresses();
	}

	private buildForm(): void {
		this.form = this.formBuilder.group(this.formConfig);
		this.form.valueChanges.subscribe(formData => this.validateForm());
	}

	private createAddress(): FormGroup {
		return this.formBuilder.group({
			city: ['', [
				Validators.required,
				Validators.minLength(3)
			]],
			country: ['', [
				Validators.required
			]]
		});
	}

  public ngOnInit(): void {
		this.buildForm();
  }

  public valid(control: AbstractControl): boolean {
    return control && control.dirty && control.valid;
  }
  
  public invalid(control: AbstractControl): boolean {
    return control && control.dirty && control.invalid;
  }

  public validationClass(control: AbstractControl): string {
  	if (this.valid(control))
      return 'has-success';      
  	else if (this.invalid(control))
      return 'has-error';
    else
      return '';
  }	

	// Alternate validation CSS method, not sure I like it though.
	// FormControl: ...[ngClass]="validationClass('username')...
	// FormArray: ...[ngClass]="validationClass('addresses', i, 'country')...	
  public validationClass2(formControlName: string, index?: number, propertyName?: string): string {
		let control: AbstractControl = this.form.get(formControlName);
		let className: string = control.constructor.name;

		if (className === 'FormArray') {
			let element = <FormGroup>(<FormArray>control).at(index);
			control = element.get(propertyName);
		}

		return this.validationClass(control);
  }

  public processForm(): void {
    this.submitted  = true;
  }

	public addAddress(): void {
		let addresses = <FormArray>this.form.get('addresses');
		addresses.push(this.createAddress());
	}	
	
	public removeAddress(index: number): void {
		let addresses = <FormArray>this.form.get('addresses');
		addresses.removeAt(index);
	}
}
