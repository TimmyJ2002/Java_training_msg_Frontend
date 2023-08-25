import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Role} from "../models/role";
import {HttpClient} from "@angular/common/http";
import {RoleRight} from "../models/right";

@Injectable({
  providedIn: 'root'
})
export class PermissionManagementService {
  url:string = "http://localhost:8080/roles"
  rolesList$: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);
  roleRightsList$: BehaviorSubject<RoleRight[]> = new BehaviorSubject<RoleRight[]>([]);

  loadRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url).pipe(
      tap(roles => this.rolesList$.next(roles))
    );
  }

  loadRoleRights(): Observable<RoleRight[]> {

    return this.http.get<RoleRight[]>(this.url + "/rights").pipe(
      tap(roleRights => this.roleRightsList$.next(roleRights))
    );
  }

  addRight(roleID: number | undefined, roleRight: string) {
    return this.http.post<{roleRight: string, roleID: number}>(this.url + "/addRight", {roleRight, roleID});
  }

  removeRight(roleID: number | undefined, roleRight: string) {
    return this.http.post<{roleRight: string, roleID: number}>(this.url + "/removeRight", {roleRight, roleID});
  }

  updateRole(role: Role) {
    return this.http.put<Role>(this.url, role);
  }

  constructor(private http: HttpClient) { }
}
