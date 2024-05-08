import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BaseForm } from 'src/app/shared/utils/base-form';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from 'src/app/shared/models/auth.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;

  private destroy$ = new Subject<any>();
  loginForm = this.fb.group({
    username:['',[Validators.required,Validators.minLength (3),]],
    password:['',[Validators.required,Validators.minLength (3),]]
    
  })
  constructor(private fb: FormBuilder, 
              public baseForm: BaseForm,
              private authSvc: AuthService,
              private snackbar: MatSnackBar) {

    console.log("Init constructor")
  }

  ngOnInit(): void {
    console.log('Init NgOnIntit');
  }
  onLogin(){
    //validar formulario
    if(this.loginForm.invalid) return;

    //obtener info de formulario y colocarlo en una variablw llamada form
    const form=this.loginForm.value;
    this.authSvc.login(form)
                .pipe(takeUntil(this.destroy$)) 
                .subscribe((data:AuthResponse)=>{
                  if (data){
                    this.snackbar.open(data.mensaje,'',{
                      duration:5*1000,
                      horizontalPosition:'end',
                      verticalPosition :'top',
                      panelClass:['success-snackbar']
                    });
                  }

    }); 

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


}
