/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: unknown;
  redirectTo?: string;
};

export const initialAuthState: AuthState = {
  success: false,
  statusCode: 0,
  message: "",
};

type Role = "TENANT" | "LANDLORD" | "ADMIN";

type UserStatus = "ACTIVE" | "BANNED";

type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";

type PaymentProvider = "STRIPE" | "SSLCOMMERZ";

type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface IUser {
  success: boolean;
  message: string;
  data: {
    profile: {
      id: string;
      email: string;
      name: string;
      role: Role;
      status: UserStatus;
      phone?: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}

export type NavbarProps = {
  user: IUser;
};
