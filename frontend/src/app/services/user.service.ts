import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../helpers/user';
import { environment as env } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  commonAPI: string = `${env.endpointURI}api/users/`;

  constructor(private http: HttpClient) { }

  CheckUserExists(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.commonAPI}getUserByEmail/${email}`);
  }

  createUser(user:User): Observable<User>{
    return this.http.post<User>(`${this.commonAPI}`, user).pipe(
      map(result => {
        return result;
      })
    );
  }
}
