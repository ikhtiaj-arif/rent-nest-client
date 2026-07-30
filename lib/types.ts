import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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

export type Property = {
  id: string;
  title: string;
  city: string;
  price: number;
  isAvailable: boolean;
  averageRating: number;
  totalReviews: number;
  category: {
    name: string;
    description: string;
  };
  area: number;
  furnished: boolean;
  availableFrom: string;
  landlord: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
