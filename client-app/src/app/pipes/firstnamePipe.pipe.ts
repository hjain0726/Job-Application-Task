import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
    name: 'filter'
})
export class FirstNamePipe implements PipeTransform {
    transform(users: User[], searchText: string): User[] {
        if (!users) return [];
        if (!searchText) return users;
        searchText = searchText.toLowerCase();
        return users.filter(user => {
            return user.firstName.toLowerCase().includes(searchText);
        });
    }
}