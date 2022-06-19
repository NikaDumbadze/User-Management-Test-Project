import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: UserDetailComponent }];

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
})
export class UserDetailModule {}
