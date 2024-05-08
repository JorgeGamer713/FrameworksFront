import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({providedIn:'root'})
export class BaseForm{
    constructor() {}

    isValidField(form:AbstractControl|null){
        var flag =false;
        if(form) flag= form.touched || form.dirty && form.invalid;
        return flag;
    }

    getErrorMessage(form:AbstractControl|null){
        let message = "";

        if (form){
            const{errors}=form;
            if(errors){
                const messages:any={
                    required:'Campo Requerido',
                    email:'Formato Invalido',
                    pattern:'Formato Invalido',
                    min:'El rango no es correcto',
                    max:'El rango no es correcto',
                    minlength:'Formato Invalido'
                }

                const errorKey = Object.keys(errors).find(Boolean);
                if (errorKey) message = messages[errorKey];

            }
        }
        return message;
    }

}