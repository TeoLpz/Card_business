import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {
  userId: number = 0;
  listUsers: User [] = []

  logoLink = '';
  businessLogo = '';

  backLink = '';
  instagramLink = '';

  loading: boolean = false;

  constructor(private _userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {

      this._activatedRoute.paramMap.subscribe(params => {
    this.userId = Number(params.get('id'));
    this.actualizarLogo();
    this.actualizarBack();
  });
     
      this.route.paramMap.subscribe(params => {
        this.userId = Number(params.get('id'));
        if (this.userId) {
          this.getUserById();
        }
      });
    }
  actualizarBack() {
    if (this.userId) {
      this._userService.getUserById(this.userId).subscribe((data: User) => {
        console.log('El link del logo es: ', data.instagramLink);
        this.backLink = data.instagramLink;
      });
    } 
  }

    actualizarLogo() {
      if (this.userId) {
        this._userService.getUserById(this.userId).subscribe((data: User) => {
          console.log('El link del logo es: ', data.businessLogo);
          this.logoLink = data.businessLogo;
        });
      } 
    }

  getListUsers() {
    this.loading = true;
    this._userService.getListUser().subscribe((data: User[]) => {
      this.listUsers = data;
      this.loading = false;
    })
  }

  getUserById() {
    this.loading = true;
    this._userService.getUserById(this.userId).subscribe((data: User) => {
      if (data) {
        this.listUsers = [data];
      } else {
        this.toastr.error('No se encontró ningún usuario con ese ID');
      }
      this.loading = false;
    }, () => {
      this.toastr.error('No se pudo obtener el usuario con el ID proporcionado.');
      this.loading = false;
    });
  }


}