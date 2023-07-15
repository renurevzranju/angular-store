import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment as env } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  commonAPI: string = `${env.endpointURI}api/users/`;

  /**
 * @constructor
 * @param {HttpClient} http To connect with the express server
 */
  constructor(private http: HttpClient) { }

  /**
   * Checks if the User exists in the database
   * @param {string} email email of the user
   * @returns {User[]} Returns array of User objects
   */
  CheckUserExists(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.commonAPI}getUserByEmail/${email}`);
  }

  /**
 * Creates a new user record in the database
 * @return {User} Returns the new user record
 */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.commonAPI}`, user).pipe(
      map(result => {
        return result;
      })
    );
  }
}
