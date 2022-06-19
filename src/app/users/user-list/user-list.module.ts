import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list.component';

//material imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogModule } from 'src/app/confirm-dialog/confirm-dialog.module';

const routes: Routes = [{ path: '', component: UserListComponent }];

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    RouterModule.forChild(routes),
    //material imports
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
  ],
})
export class UserListModule {}
