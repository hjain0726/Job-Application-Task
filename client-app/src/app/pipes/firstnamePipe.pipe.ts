import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FirstNamePipe implements PipeTransform {
    transform(users: any[], searchText: string): any[] {
        if (!users) return [];
        if (!searchText) return users;
        searchText = searchText.toLowerCase();
        return users.filter(user => {
            return user.firstName.toLowerCase().includes(searchText);
        });
    }
}