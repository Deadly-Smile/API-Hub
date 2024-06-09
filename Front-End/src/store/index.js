import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersAPI } from "./APIs/UsersAPI";
// import { PostsAPI } from "./APIs/PostsAPI";

export const Store = configureStore({
  reducer: {
    // not an array, just a bracket notation
    [UsersAPI.reducerPath]: UsersAPI.reducer,
    // [PostsAPI.reducerPath]: PostsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(UsersAPI.middleware);
    //   .concat(PostsAPI.middleware);
  },
});
setupListeners(Store.dispatch);
export {
  useGetUserQuery,
  useEditUserMutation,
  useLogoutMutation,
  useAddUserMutation,
  useSignUpVerifyMutation,
  useLoginMutation,
  useGetUserByIDQuery,
  useGetUserByUsernameMutation,
} from "./APIs/UsersAPI";
