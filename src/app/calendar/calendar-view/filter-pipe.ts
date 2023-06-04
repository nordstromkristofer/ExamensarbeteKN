import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(item => {
            return item.userName.toLowerCase().includes(searchText);
        });
    }
}
