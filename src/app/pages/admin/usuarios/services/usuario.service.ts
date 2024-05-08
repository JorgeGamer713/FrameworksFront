import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { UsuarioResponse } from 'src/app/shared/models/usuario.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private snackBar: MatSnackBar, 
              private http: HttpClient,
              ) { }

  getUsuarios():Observable<UsuarioResponse[]> { 
    return this.http.get<UsuarioResponse[]>(`${environment.API_URL}/usuario`,{headers:{"requireToken":"true"}})
      .pipe(catchError((error)=> this.handlerError(error)));
  }

  new(user: UsuarioResponse) {

    return this.http.post<any>(`${environment.API_URL}/usuario`,user,{headers:{"requireToken" : "true"}})
      .pipe(catchError((error)=>this.handlerError(error)))
   }

  update(user: UsuarioResponse) {

    return this.http.put<any>(`${environment.API_URL}/usuario`,user,{headers:{"requireToken" : "true"}})
    .pipe(catchError((error)=>this.handlerError(error)))
   }

  delete(cveUsuario: number) { 
    
    return this.http.delete<any>(`${environment.API_URL}/usuario/${cveUsuario}`,{headers:{"requireToken" : "true"}})
    .pipe(catchError((error)=>this.handlerError(error)))
    
  }

  handlerError(error: any): Observable<never> {
    var errorMessage = "Ocurrio un error";
    if (error.error) {
      errorMessage = `Error: ${error.error.mensaje}`;
    }

    this.snackBar.open(errorMessage, '', {
      duration: 5 * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });

    return throwError(() => new Error(errorMessage))
  }
}
