import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PNFComponent implements OnInit {

  constructor(private errorService: ErrorService, private router: Router, private route:ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

}
