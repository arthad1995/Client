import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecureGuard implements CanActivate {

  constructor(
              private  router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(sessionStorage.getItem('user'))
if(sessionStorage.getItem('user')){
  return true;
}

    this.router.navigate(['/login']);
return false;
  }
  
}
