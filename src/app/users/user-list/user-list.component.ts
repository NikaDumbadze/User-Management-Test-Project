import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog-model';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'personalNo',
    'email',
    'dateOfBirth',
    'action',
  ];

  filterForm!: FormGroup;

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _api: UserService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.filterForm = this._fb.group({
      firstName: '',
      lastName: '',
      personalNo: '',
      email: '',
      startDate: '',
      endDate: '',
    });
  }

  filterUsers() {
    this.paginator.pageIndex = 0;
    this.getAllUsers();
  }

  getAllUsers() {
    this._api
      .getUsers({
        ...this.filterForm.value,
        page: this.paginator.pageIndex,
        limit: this.paginator.pageSize,
      })
      .subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource(data.users);
          this.paginator.length = data.total;
        },
        error: () => {
          this._snackBar.open('Error while fetching the records!', '');
        },
      });
  }

  deleteUser(id: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel(
        'Confirm Action',
        'do you want to delete user?'
      ),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._api.deleteUser(id).subscribe({
          next: () => {
            this._snackBar.open('User successfully deleted', '');
            this.getAllUsers();
          },
          error: () => {
            this._snackBar.open('Error while deletiung user!', '');
          },
        });
      }
    });
  }
}
