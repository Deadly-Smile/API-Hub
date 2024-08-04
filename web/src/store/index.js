import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersAPI } from "./APIs/UsersAPI";
import { ModelsAPI } from "./APIs/ModelsAPI";

export const Store = configureStore({
  reducer: {
    // not an array, just a bracket notation
    [UsersAPI.reducerPath]: UsersAPI.reducer,
    [ModelsAPI.reducerPath]: ModelsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(UsersAPI.middleware)
      .concat(ModelsAPI.middleware);
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
  useOauthLoginMutation,
  useVerifyMailMutation,
  useGetRoleQuery,
} from "./APIs/UsersAPI";

export {
  useCreateModelMutation,
  useUploadTestImageMutation,
  useUploadPythonScriptMutation,
  useUploadDocumentMutation,
  useDeleteModelMutation,
  useUpdateModelMutation,
  useUpdateModelNameMutation,
  useGetModelQuery,
  useGetInitialCodeQuery,
} from "./APIs/ModelsAPI";
