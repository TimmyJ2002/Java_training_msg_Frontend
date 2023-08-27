// user.model.ts
import {Role} from "../../components/permission_management/models/role";
import {ListRange} from "@angular/cdk/collections";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  roles: Role[];
  active: boolean;
  loginCount?: number;
}
