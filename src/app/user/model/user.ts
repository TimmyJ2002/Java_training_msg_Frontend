// user.model.ts
export interface User {
  id?: number;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive?: boolean;
}
