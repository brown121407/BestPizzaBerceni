import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from "../../../models/user";

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(user: IUser, ...args: any[]): string {
    return `${user.firstName} ${user.lastName}`;
  }
}
