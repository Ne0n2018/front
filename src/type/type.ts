export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  user: User;
}

export interface Teacher {
  id: string;
  subjects: (
    | "MATH"
    | "ENGLISH"
    | "PHYSICS"
    | "BIOLOGY"
    | "GEOGRAPHY"
    | "RUSSIAN"
  )[];
  hourlyRate: number;
  selectedDate: string;
  description: string;
  user: User;
  reviews: Review[];
}

export interface Booking {
  id: string;
  teacherId: string;
  userId: string;
  date: string;
  comment?: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}
