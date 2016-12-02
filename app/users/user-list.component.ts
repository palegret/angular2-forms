import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../shared/models/user';

@Component({
	selector: 'user-list',
	templateUrl: './app/users/user-list.component.html',
	styleUrls: [
		'./app/users/user-list.component.css'
	]
})
export class UserListComponent {
	@Input()
	users: User[]

	@Input()
	activeUser: User

	@Output()
	userSelected = new EventEmitter()	

	selectUser(user: User) {
		this.userSelected.emit({ user: user });
	}
}
