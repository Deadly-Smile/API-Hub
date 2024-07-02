/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => {
  let token = "";
  try {
    token = localStorage.getItem("login_token");
  } catch (error) {
    console.log("token not found");
  }
  return token;
};

const UsersAPI = createApi({
  reducerPath: "users",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
    prepareHeaders: (headers) => {
      // Add the authentication token to the request headers
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getUser: builder.query({
        providesTags: (result, error, arg) => {
          const tags = [{ type: "user" }];
          return tags;
        },
        query: () => "/user",
      }),
      getRole: builder.query({
        providesTags: (result, error, arg) => {
          const tags = [{ type: "user" }];
          return tags;
        },
        query: () => `/user/role`,
      }),
      getUserByID: builder.query({
        query: ({ id }) => {
          return `user/${id}`;
        },
      }),
      getUserByUsername: builder.mutation({
        query: ({ username }) => {
          return {
            url: `username:${username}`,
            method: "GET",
          };
        },
      }),
      oauthLogin: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          if (result.token) {
            localStorage.setItem("login_token", result.token);
          }
          return [{ type: "user" }];
        },
        query: ({ provider, code }) => {
          return {
            url: `/auth/${provider}/callback`,
            body: { code },
            method: "POST",
          };
        },
      }),
      addUser: builder.mutation({
        query: (formData) => {
          return {
            url: "/register",
            body: formData,
            method: "POST",
          };
        },
      }),
      logout: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          localStorage.setItem("login_token", "");
          const tags = [{ type: "user" }];
          return tags;
        },
        query: ({ message }) => {
          return {
            url: "/logout",
            body: {
              message,
            },
            method: "POST",
          };
        },
      }),
      signUpVerify: builder.mutation({
        invalidatesTags: (result, error, id) => {
          return [{ type: "user" }];
        },
        query: ({ id, code }) => {
          return {
            url: `/${id}/signup/verify`,
            body: {
              code,
            },
            method: "PUT",
          };
        },
      }),
      login: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          localStorage.setItem("login_token", result.token);
          return [{ type: "user" }];
        },
        query: (authInfo) => {
          return {
            url: "/login",
            body: authInfo,
            method: "POST",
          };
        },
      }),
      verifyMail: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          localStorage.setItem("login_token", result.token);
          return [{ type: "user" }];
        },
        query: ({ id, code }) => {
          return {
            url: `/verify/email/${id}`,
            body: {
              id: id,
              code: code,
            },
            method: "PUT",
          };
        },
      }),
      editUser: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "user" }];
        },
        query: (formDataToSend) => {
          console.log(formDataToSend);
          return {
            url: "/edit-user",
            body: formDataToSend,
            method: "POST",
          };
        },
      }),
    };
  },
});

export const {
  useGetUserQuery,
  useEditUserMutation,
  useLogoutMutation,
  useAddUserMutation,
  useSignUpVerifyMutation,
  useLoginMutation,
  useGetUserByIDQuery,
  useGetUserByUsernameMutation,
  useOauthLoginMutation,
  useVerifyMailMutation,
  useGetRoleQuery,
} = UsersAPI;
export { UsersAPI };
