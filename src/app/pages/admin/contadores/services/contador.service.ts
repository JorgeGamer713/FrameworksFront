import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { ContadorResponse } from 'src/app/shared/models/contador.interface';


@Injectable({
  providedIn: 'root'
})
export class ContadorService { // Cambio de MusicoService a ContadorService

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  getContadores():Observable<ContadorResponse[]> { 
    return this.http.get<ContadorResponse[]>(`${environment.API_URL}/contador`,{headers:{"requireToken":"true"}})
      .pipe(catchError((error)=> this.handlerError(error)));
  }

  new(user: any) {

    return this.http.post<any>(`${environment.API_URL}/contador`,user,{headers:{"requireToken" : "true"}})
      .pipe(catchError((error)=>this.handlerError(error)))
   }

  update(user: any) {

    return this.http.put<any>(`${environment.API_URL}/contador`,user,{headers:{"requireToken" : "true"}})
    .pipe(catchError((error)=>this.handlerError(error)))
   }

  delete(cveContador: number) { 
    
    return this.http.delete<any>(`${environment.API_URL}/contador/${cveContador}`,{headers:{"requireToken" : "true"}})
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