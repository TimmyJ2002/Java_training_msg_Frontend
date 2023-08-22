import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import jwtDecode from "jwt-decode";


@Injectable()
export class RightGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    jwtDecode(sessionStorage.getItem("accessToken")!);

    let token = jwtDecode<{sub: string, permissions: string[]}>(sessionStorage.getItem("accessToken")!)

    console.log(route.data['right'])

    let rightsList = token.permissions;

    return (route.data['right'] as string[]).some((right) => rightsList.includes(right))

    // return (rightsList.includes(route.data['right']));
  }
}
