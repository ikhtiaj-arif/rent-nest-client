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
export interface PropertyImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface PropertyCategory {
  id: string;
  name: string;
  description: string;
}

export interface PropertyLandlord {
  id: string;
  name: string;
  email?: string;
}

export interface Property {
  id: string;

  title: string;
  description: string;

  city: string;
  address: string;

  price: number;
  area: number;

  bedrooms: number;
  bathrooms: number;

  furnished: boolean;
  available: boolean;
  isAvailable: boolean;

  availableFrom: string;

  averageRating: number;
  totalReviews: number;

  category: PropertyCategory;

  images: PropertyImage[];

  landlord: PropertyLandlord;

  createdAt: string;
  updatedAt: string;
}

// export type Property = {
//   id: string;
//   title: string;
//   city: string;
//   price: number;
//   isAvailable: boolean;
//   averageRating: number;
//   totalReviews: number;
//   category: {
//     name: string;
//     description: string;
//   };
//   images: [];
//   area: number;
//   furnished: boolean;
//   availableFrom: string;
//   landlord: {
//     name: string;
//   };
//   createdAt: string;
//   updatedAt: string;
// };

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
export interface RentalRequest {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE";

  moveInDate: string;

  property: {
    id: string;
    title: string;
  };

  tenant: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export type IStats<T extends string = string> = Record<T, number>;