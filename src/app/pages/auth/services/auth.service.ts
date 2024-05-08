import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { AuthResponse } from 'src/app/shared/models/auth.interface';
import { environment } from 'src/environments/environment.development';

const helper= new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //crear variables de los observables 
  private token = new BehaviorSubject<string>("");
  private tokenData = new BehaviorSubject<any>({});
  private isLogged = new BehaviorSubject<boolean>(false);


  constructor(private snackbar: MatSnackBar,
              private router:Router,
              private http:HttpClient) {
                this.checkToken();
              } 

  get token$():Observable<string>{
    return this.token.asObservable();
  }

  get tokenValue(){
    return this.token.getValue();
  }

  get tokenData$():Observable<any>{
    return this.tokenData.asObservable();
  }

  get isLogged$():Observable<boolean>{
    return this.isLogged.asObservable();
  }

  login(loginData: any){

    return this.http.post<AuthResponse>(`${environment.API_URL}/auth`,loginData)
      .pipe(map((data:AuthResponse)=>{
        if(data.token){
          this.saveLocalStorage(data.token);
          this.token.next(data.token);
          this.isLogged.next(true)
          this.checkToken()

          this.router.navigate(['/home'])
        }


        return data;
      }),
      catchError((error)=> this.handlerError(error))
      );   

   }

  saveLocalStorage(token:string){ 
    localStorage.setItem("jwt",token)
   }

  logout(){ 
    localStorage.removeItem("jwt");
    this.token.next("");
    this.tokenData.next(null);
    this.isLogged.next(false);
    this.router.navigate(['/home'])
  }

  checkToken(){ 
    //obtener el token del LocalStorage
    const token = localStorage.getItem("jwt");
    //verificar si el token existe
    if (token) {
    //verificar si el token expiro
      const isExpired=helper.isTokenExpired(token);
    //en caso de expirar el token se debe cerrar la sesión
      if (isExpired) this.logout();
      else{
        //indicar al boservable que actuliza la info
        this.token.next(token);     // ejecutar el observable

        //renovar los datos del perfil
        const{iat,exp, ...data}=helper.decodeToken(token);
        this.tokenData.next(data);
        this.isLogged.next(true);

      }
    
    }else{
      this.logout
    }
    
  }
  handlerError (error:any):Observable<never>{ 
    var errorMessage="Ocurrio un error";
    if(error.error){
      errorMessage=`Error: ${error.error.mensaje}`;
    }

    this.snackbar.open(errorMessage,'',{
      duration:5*1000,
      horizontalPosition:'end',
      verticalPosition :'top',
      panelClass:['error-snackbar']
    });

    return throwError(()=>new Error(errorMessage))
  }
}
