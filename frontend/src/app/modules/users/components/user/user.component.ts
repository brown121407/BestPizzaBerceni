import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../../models/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class userComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res: IUser[]) => this.users = res);
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  dltUser(id: number): void {
    this.userService.deleteUser(id).subscribe((_) =>
      {
        this.toastr.success("User deleted successfully");
        this.users = this.users.filter((us: IUser) => us.id !== id);
      }
    );
  }

}
