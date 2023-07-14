import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class SecureInterceptor implements HttpInterceptor {

  private userToken = localStorage.getItem( 'accessToken' );

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ( this.userToken ) {
      const tokenReq: HttpRequest<any> = request.clone( {
        setHeaders: {
          Authorization: `${ this.userToken }`
        }
      } );
      return next.handle( tokenReq );
    }

    return this.auth.getAccessTokenSilently({detailedResponse: true}).pipe(
      mergeMap(token => {
        localStorage.setItem( 'accessToken', token.id_token);
        const tokenReq = request.clone({
          setHeaders: { Authorization: `${token.id_token}` }
        });
        return next.handle(tokenReq);
      }),
      catchError((err) => throwError(err))
    );
  }
}
