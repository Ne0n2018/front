/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface RegisterDto {
  /**
   * The email of the user
   * @example "user@example.com"
   */
  email: string;
  /**
   * The password of the user
   * @example "password123"
   */
  password: string;
  /**
   * The name of the user
   * @example "John Doe"
   */
  name: string;
  /** The role of the user */
  role: "USER" | "ADMIN" | "TEACHER";
}

export interface LoginDto {
  /**
   * The email of the user
   * @example "user@example.com"
   */
  email: string;
  /**
   * The password of the user
   * @example "password123"
   */
  password: string;
}

export interface UpdateTeacherDto {
  /** Subjects taught by the teacher */
  subjects?: (
    | "MATH"
    | "ENGLISH"
    | "PHYSICS"
    | "BIOLOGY"
    | "GEOGRAPHY"
    | "RUSSIAN"
  )[];
  /**
   * Hourly rate of the teacher
   * @example 30
   */
  hourlyRate?: number;
  /**
   * Description of the teacher
   * @example "Experienced math teacher"
   */
  description?: string;
}

export interface UpdateProfileDto {
  /** Subjects taught by the teacher */
  subjects?: (
    | "MATH"
    | "ENGLISH"
    | "PHYSICS"
    | "BIOLOGY"
    | "GEOGRAPHY"
    | "RUSSIAN"
  )[];
  /**
   * Hourly rate of the teacher
   * @example 30
   */
  hourlyRate?: number;
  /**
   * Description of the teacher
   * @example "Experienced math teacher"
   */
  description?: string;
}

export interface CreateScheduleDto {
  /**
   * Start time of the schedule
   * @example "2025-04-15T14:00:00Z"
   */
  startTime: string;
  /**
   * End time of the schedule
   * @example "2025-04-15T15:00:00Z"
   */
  endTime: string;
}

export interface UpdateBookingDto {
  /** Status of the booking */
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}

export interface CreateBookingDto {
  /**
   * ID of the teacher
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  teacherId: string;
  /**
   * Start time of the lesson
   * @example "2025-04-15T14:00:00Z"
   */
  startTime: string;
  /**
   * End time of the lesson
   * @example "2025-04-15T15:00:00Z"
   */
  endTime: string;
}

export interface CreateReviewDto {
  /**
   * ID of the teacher
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  teacherId: string;
  /**
   * Rating (1-5)
   * @example 5
   */
  rating: number;
  /**
   * Comment
   * @example "Great teacher!"
   */
  comment?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  secure?: boolean;
  path: string;
  type?: ContentType;
  query?: QueryParamsType;
  format?: ResponseFormat;
  body?: unknown;
  baseUrl?: string;
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> {
  data: D;
  error?: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  private instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      baseURL: apiConfig.baseUrl || "",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (apiConfig.securityWorker) {
      this.securityWorker = apiConfig.securityWorker;
    }
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : false) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};

    const requestParams: AxiosRequestConfig = {
      ...params,
      url: path,
      method: params.method || "GET",
      data: body,
      params: query,
      headers: {
        ...(params.headers || {}),
        ...(secureParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { "Content-Type": type }
          : {}),
      },
    };

    try {
      const response: AxiosResponse<T> = await this.instance.request(
        requestParams
      );
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config,
      } as HttpResponse<T, E>;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const responseError = {
          data: error.response.data as E,
          status: error.response.status,
          statusText: error.response.statusText,
          headers: error.response.headers,
          config: error.response.config,
        };
        throw responseError;
      }
      throw {
        error: error.message,
      } as HttpResponse<T, E>;
    }
  };
}

/**
 * @title My NestJS API
 * @version 1.0
 * @contact
 *
 * API documentation for the NestJS application
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<unknown, unknown>({
      path: `/`,
      method: "GET",
      ...params,
    });

  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRegister
     * @summary Register a new user
     * @request POST:/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @summary Login a user
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerMe
     * @summary Get current user
     * @request GET:/auth/me
     * @secure
     */
    authControllerMe: (params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/auth/me`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @tags admin
     * @name AdminControllerGetAllUsers
     * @summary Get all users
     * @request GET:/admin/users
     * @secure
     */
    adminControllerGetAllUsers: (
      query?: {
        page?: number;
        limit?: number;
        role?: "USER" | "ADMIN" | "TEACHER";
      },
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/admin/users`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name AdminControllerDeleteUser
     * @summary Delete a user
     * @request DELETE:/admin/users/{id}
     * @secure
     */
    adminControllerDeleteUser: (id: string, params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/admin/users/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name AdminControllerGetAllTeachers
     * @summary Get all teachers
     * @request GET:/admin/teachers
     * @secure
     */
    adminControllerGetAllTeachers: (params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/admin/teachers`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name AdminControllerUpdateTeacher
     * @summary Update a teacher profile
     * @request PATCH:/admin/teachers/{id}
     * @secure
     */
    adminControllerUpdateTeacher: (
      id: string,
      data: UpdateTeacherDto,
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/admin/teachers/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name AdminControllerDeleteTeacher
     * @summary Delete a teacher
     * @request DELETE:/admin/teachers/{id}
     * @secure
     */
    adminControllerDeleteTeacher: (id: string, params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/admin/teachers/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name AdminControllerGetAllBookings
     * @summary Get all bookings
     * @request GET:/admin/bookings
     * @secure
     */
    adminControllerGetAllBookings: (params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/admin/bookings`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name AdminControllerDeleteBooking
     * @summary Delete a booking
     * @request DELETE:/admin/bookings/{id}
     * @secure
     */
    adminControllerDeleteBooking: (id: string, params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/admin/bookings/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name AdminControllerGetAllReviews
     * @summary Get all reviews
     * @request GET:/admin/reviews
     * @secure
     */
    adminControllerGetAllReviews: (params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/admin/reviews`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name AdminControllerDeleteReview
     * @summary Delete a review
     * @request DELETE:/admin/reviews/{id}
     * @secure
     */
    adminControllerDeleteReview: (id: string, params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/admin/reviews/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  teachers = {
    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerFindAll
     * @summary Get all teachers
     * @request GET:/teachers
     */
    teacherControllerFindAll: (
      query?: {
        /** Filter by subject */
        subject?: string;
        page?: number;
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/teachers`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerFindOne
     * @summary Get a teacher by ID
     * @request GET:/teachers/{id}
     */
    teacherControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/teachers/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerGetSchedule
     * @summary Get a teacher's schedule
     * @request GET:/teachers/{id}/schedule
     */
    teacherControllerGetSchedule: (
      id: string,
      query?: {
        /** Date in YYYY-MM-DD format */
        date?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/teachers/${id}/schedule`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerGetReviews
     * @summary Get reviews for a teacher
     * @request GET:/teachers/{id}/reviews
     */
    teacherControllerGetReviews: (id: string, params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/teachers/${id}/reviews`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerGetProfile
     * @summary Get teacher profile
     * @request GET:/teachers/profile
     * @secure
     */
    teacherControllerGetProfile: (params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/teachers/profile`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerUpdateProfile
     * @summary Update teacher profile
     * @request PATCH:/teachers/profile
     * @secure
     */
    teacherControllerUpdateProfile: (
      data: UpdateProfileDto,
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/teachers/profile`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerAddSchedule
     * @summary Add available time slot to schedule
     * @request POST:/teachers/schedule
     * @secure
     */
    teacherControllerAddSchedule: (
      data: CreateScheduleDto,
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/teachers/schedule`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerGetTeacherSchedule
     * @summary Get teacher schedule
     * @request GET:/teachers/schedule
     * @secure
     */
    teacherControllerGetTeacherSchedule: (
      query?: {
        /** Date in YYYY-MM-DD format */
        date?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/teachers/schedule`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerDeleteSchedule
     * @summary Delete a time slot from schedule
     * @request DELETE:/teachers/schedule/{id}
     * @secure
     */
    teacherControllerDeleteSchedule: (id: string, params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/teachers/schedule/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerGetBookings
     * @summary Get teacher bookings
     * @request GET:/teachers/bookings
     * @secure
     */
    teacherControllerGetBookings: (params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/teachers/bookings`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerUpdateBooking
     * @summary Update a booking (e.g., confirm or cancel)
     * @request PATCH:/teachers/bookings/{id}
     * @secure
     */
    teacherControllerUpdateBooking: (
      id: string,
      data: UpdateBookingDto,
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/teachers/bookings/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags teachers
     * @name TeacherControllerGetTeacherReviews
     * @summary Get teacher reviews
     * @request GET:/teachers/reviews
     * @secure
     */
    teacherControllerGetTeacherReviews: (params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/teachers/reviews`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  bookings = {
    /**
     * No description
     *
     * @tags bookings
     * @name BookingControllerCreate
     * @summary Create a new booking
     * @request POST:/bookings
     * @secure
     */
    bookingControllerCreate: (
      data: CreateBookingDto,
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/bookings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bookings
     * @name BookingControllerFindAll
     * @summary Get all bookings for the user
     * @request GET:/bookings
     * @secure
     */
    bookingControllerFindAll: (params: RequestParams = {}) =>
      this.request<unknown, unknown>({
        path: `/bookings`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bookings
     * @name BookingControllerUpdate
     * @summary Update a booking (e.g., cancel)
     * @request PATCH:/bookings/{id}
     * @secure
     */
    bookingControllerUpdate: (
      id: string,
      data: UpdateBookingDto,
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/bookings/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  reviews = {
    /**
     * No description
     *
     * @tags reviews
     * @name ReviewControllerCreate
     * @summary Create a new review for a teacher
     * @request POST:/reviews
     * @secure
     */
    reviewControllerCreate: (
      data: CreateReviewDto,
      params: RequestParams = {}
    ) =>
      this.request<unknown, unknown>({
        path: `/reviews`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
