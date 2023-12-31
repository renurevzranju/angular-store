import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class SecureInterceptor implements HttpInterceptor {
  userToken = localStorage.getItem( 'accessToken' );

  /**
   * @constructor
   * @param {AuthService} auth To get the access token silently from Auth0
 */
  constructor(private auth: AuthService) {}

  /**
   * Get the access token from local storage if exists, else get from Auth0 to send to API for authentication
   * Couldn't refactor this code
 */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ( this.userToken ) {
      const tokenReq: HttpRequest<any> = request.clone( {
        setHeaders: {
          Authorization: `Bearer ${ this.userToken }`
        }
      } );
      return next.handle( tokenReq ).pipe(catchError(errorResponse =>{
        let errMsg: string;
        if (errorResponse instanceof HttpErrorResponse) {
            const err = errorResponse.message || JSON.stringify(errorResponse.error);
            errMsg = `${errorResponse.status} - ${errorResponse.statusText || ''} Details: ${err}`;
        } else {
            errMsg = errorResponse.message ? errorResponse.message : errorResponse.toString();
        }
        return throwError(errMsg);
      }));
    }

    return this.auth.getAccessTokenSilently({detailedResponse: true}).pipe(
      mergeMap(token => {
        localStorage.setItem( 'accessToken', token.access_token);
        const tokenReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token.access_token}` }
        });
        return next.handle(tokenReq).pipe(catchError(errorResponse =>{
          let errMsg: string;
          if (errorResponse instanceof HttpErrorResponse) {
              const err = errorResponse.message || JSON.stringify(errorResponse.error);
              errMsg = `${errorResponse.status} - ${errorResponse.statusText || ''} Details: ${err}`;
          } else {
              errMsg = errorResponse.message ? errorResponse.message : errorResponse.toString();
          }
          return throwError(errMsg);
        }));
      }),
      catchError((err) => throwError(err))
    );
  }
}
