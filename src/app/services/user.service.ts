import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserEntity } from '../entities/user.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl: string = `${environment.apiUrl}/usersList`;

  constructor(private http: HttpClient) {}

  createUser(user: UserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(this.usersUrl, user);
  }

  getUsers(filter: {
    firstName: string;
    lastName: string;
    personalNo: string;
    email: string;
    startDate: Date;
    endDate: Date;
    page: number;
    limit: number;
  }): Observable<{
    users: UserEntity[];
    total: number;
  }> {
    const filterParams: any = {};

    if (filter.firstName) {
      filterParams['firstName_like'] = filter.firstName;
    }
    if (filter.lastName) {
      filterParams['lastName_like'] = filter.lastName;
    }

    if (filter.personalNo) {
      filterParams['personalNo'] = filter.personalNo;
    }

    if (filter.email) {
      filterParams['email_like'] = filter.email;
    }

    if (filter.startDate) {
      filterParams['dateOfBirth_gte'] = filter.startDate.toISOString();
    }
    if (filter.endDate) {
      filterParams['dateOfBirth_lte'] = filter.endDate.toISOString();
    }

    filterParams['_page'] = filter.page + 1;
    filterParams['_limit'] = filter.limit;

    filterParams['_sort'] = 'id';
    filterParams['_order'] = 'desc';

    return this.http
      .get(this.usersUrl, {
        params: filterParams,
        observe: 'response',
      })
      .pipe(
        map((response) => ({
          users: response.body as any,
          total: response.headers.get('x-total-count') as any,
        }))
      );
  }

  getUser(id: number): Observable<UserEntity> {
    if (id === 0) {
      return of(this.initializeUser());
    }
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<UserEntity>(url);
  }

  updateUser(user: UserEntity): Observable<UserEntity> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<UserEntity>(url, user);
  }

  deleteUser(id: number): Observable<{}> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<UserEntity>(url);
  }

  private initializeUser(): UserEntity {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      personalNo: '',
      email: '',
      dateOfBirth: '',
    };
  }
}
