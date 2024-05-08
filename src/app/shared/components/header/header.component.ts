import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  data={
    cveUsuario:0,
    nombre:'',
    apellidos:'',
    username:'',
    email:'',
    roles:[],
  }

  isLoged=false;
  private destroy$ = new Subject<any>();
  @Output() toggleSidenav=new EventEmitter<void>();
  constructor(private authSvc:AuthService){};

  ngOnInit():void{
    this.authSvc.isLogged$.pipe(takeUntil(this.destroy$)).subscribe( (isLogged)=> {
      this.isLoged=isLogged;
    } );

    this.authSvc.tokenData$.pipe(takeUntil(this.destroy$)).subscribe( (data)=>
    {this.data= data;});
  }
  ngOnDestroy():void{
    this.destroy$.next({});
    this.destroy$.complete();
  }
  onLogout(){
    this.authSvc.logout();
  }
  onToggleSidenav(){
    this.toggleSidenav.emit();

  }
}
