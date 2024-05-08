import { group } from '@angular/animations';
import { Component, OnDestroy, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Rol } from 'src/app/shared/models/rol.interface';
import { BaseForm } from 'src/app/shared/utils/base-form';
import { UsuarioService } from '../../services/usuario.service';

enum Action{
  NEW='new',
  EDIT='edit'
}

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss']
})
export class UsuarioDialogComponent implements OnInit, OnDestroy  {

  private destroy$= new Subject();
  roles: Rol[]=[];
  actionTODO=Action.NEW;
  tittleButton= "Guardar";
  hidePwd= true;
  hideConfirmPwd=true;


  userForm = this.fb.group({
    cveUsuario:[''],
    nombre:['',[ Validators.required, Validators.minLength(3),Validators.maxLength(350)]],
    apellidos:['',[ Validators.required, Validators.minLength(3),Validators.maxLength(450)]],
    username:['',[ Validators.required, Validators.minLength(3),Validators.maxLength(350)]],
    email:['',[ Validators.required, Validators.email]],
    roles:['',[ Validators.required]],
    password:['',[ Validators.required, Validators.minLength(8),Validators.maxLength(50)]],
    confirmPassword:['',[ Validators.required, Validators.minLength(8),Validators.maxLength(50)]],
  }, {validator:this.checkMatchingPassword("password","confirmPassword")})

  constructor(@Inject(MAT_DIALOG_DATA)public data:any,
              public dialogRef:MatDialogRef<UsuarioDialogComponent>,
              private fb : FormBuilder,
              public baseForm:BaseForm,
              private authSvc:UsuarioService){}

  ngOnInit(): void {
    if (this.data.user.cveUsuario){
      this.pathData()
    }
  }
  private pathData(){
    this.actionTODO=Action.EDIT;
    this.tittleButton="Actualizar";

    var roles=[];
    for (let rol of this.data.user.roles){
      roles.push(rol.cveUsuario.toString())
    }

    this.userForm.patchValue({
      cveUsuario: this.data.user.cveUsuario,
      nombre:this.data.user.nombre,
      apellidos:this.data.user.apellidos,
      username:this.data.user.username,
      email:this.data.user.email,
      roles:this.data.user.rol,
    });

    this.userForm.get("username")?.disable();

    this.userForm.get("password")?.setValidators(null);
    this.userForm.get("confirmPassword")?.setValidators(null);
    this.userForm.get("password")?.setErrors(null);
    this.userForm.get("ConfirmPassword")?.setErrors(null);
    this.userForm.updateValueAndValidity();

  }

  onSave(){
    //verificar si el formulario es invalido
    if(this.userForm.invalid)return;

    var data=this.userForm.getRawValue();

    //verificar el tipo de accion: save, edit
    if(this.actionTODO == Action.NEW) {

      const {cveUsuario,confirmPassword,...user}= data;

      this.authSvc.new(user).pipe(takeUntil(this.destroy$)).subscribe(result=>{
        if (result){
          this.dialogRef.close(result)
        }
      });


    } else { //actualizar

      const {confirmPassword,password,...user}=data;

      this.authSvc.update(user).pipe(takeUntil(this.destroy$)).subscribe(result=>{
        if (result){
          this.dialogRef.close(result);
        }
      })

    }


  }

  onClear(){
    if (this.actionTODO==Action.NEW){
      this.userForm.reset();
    }else{
      this.userForm.patchValue({
        cveUsuario: this.data.user.cveUsuario,
        nombre:'',
        apellidos:'',
        username:this.data.user.username,
        email:'',
        roles:[] 
      })
    }
  }

  private checkMatchingPassword ( passwordKey: string, passwordConfirmKey:string ){

    return(group:FormGroup)=> {
      let passwordInput= group.controls[passwordKey];
      let passwordConfirmInput= group.controls[passwordConfirmKey]

      if(passwordInput.value !=passwordConfirmInput.value){
        return passwordConfirmInput.setErrors({notEquivalentPasswords:true})
      }else{
        return passwordConfirmInput.setErrors(null);
      }

    }

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
