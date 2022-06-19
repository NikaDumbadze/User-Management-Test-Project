import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEntity } from 'src/app/entities/user.entity';
import { UserService } from 'src/app/services/user.service';
import { VALIDATION_MESSAGES } from 'src/app/validation/validationMessage';




@Component({
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userForm!: FormGroup;
  actionBtn: string = 'Save';

  isAdd = false;

  
  constructor(
    private fb: FormBuilder,
    private api: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: null,
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      personalNo: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getUser(id);
      } else {
        this.isAdd = true;
      }
    });

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getUser(id);
    }
  }

  fNameErrorMessage() {
    if (this.userForm.get('firstName')?.hasError('required')) {
      return VALIDATION_MESSAGES.firstName.required;
    }

    return this.userForm.get('firstName')?.hasError('minlength')
      ? VALIDATION_MESSAGES.firstName.minlength
      : '';
  }

  lNameErrorMessage() {
    if (this.userForm.get('lastName')?.hasError('required')) {
      return VALIDATION_MESSAGES.lastName.required;
    }

    return this.userForm.get('lastName')?.hasError('maxlength')
      ? VALIDATION_MESSAGES.lastName.maxlength
      : '';
  }

  personalNoErrorMessage() {
    if (this.userForm.get('personalNo')?.hasError('required')) {
      return VALIDATION_MESSAGES.personalNo.required;
    }

    return this.userForm.get('personalNo')?.hasError('minlength')
      ? VALIDATION_MESSAGES.personalNo.minlength
      : '';
  }

  emailErrorMessage() {
    if (this.userForm.get('email')?.hasError('required')) {
      return VALIDATION_MESSAGES.email.required;
    }

    return this.userForm.get('email')?.hasError('email')
      ? VALIDATION_MESSAGES.email.email
      : '';
  }

  dateErrorMessage() {
    if (this.userForm.get('dateOfBirth')?.hasError('required')) {
      return VALIDATION_MESSAGES.dateOfBirth.required;
    }
    return '';
  }

  saveUser() {
    if (this.userForm.valid) {
      if (this.isAdd) {
        this.addUser();
      } else {
        this.updateUser();
      }
    }
  }

  addUser() {
    this.api.createUser(this.userForm.value).subscribe({
      next: (user) => {
        this._snackBar.open('User successfully added', '');
        this.onSaveComplete();
      },
      error: (user) => {
        this._snackBar.open('Error adding user', '');
      },
    });
  }

  updateUser() {
    this.api.updateUser(this.userForm.value).subscribe({
      next: () => {
        this.onSaveComplete();
        this._snackBar.open('User successfully updated', '');
      },
      error: (user) => {
        this._snackBar.open('Error editing user', '');
      },
    });
  }

  getUser(id: any) {
    this.api.getUser(id).subscribe({
      next: (user: UserEntity) => this.displayUser(user),
      error: (err) =>
        this._snackBar.open('Error finding user', ''),
    });
  }

  displayUser(user: UserEntity) {
    this.userForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      personalNo: user.personalNo,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
    });
  }

  onSaveComplete(): void {
    this.userForm.reset();
    this.router.navigate(['/users']);
  }

  close() {
    this.onSaveComplete();
  }
}
