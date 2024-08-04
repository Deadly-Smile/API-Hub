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

const ModelsAPI = createApi({
  reducerPath: "models",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/model`,
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
      createModel: builder.mutation({
        query: ({ name, parameters, id }) => {
          const formData = new FormData();
          formData.append("name", name);
          if (id) formData.append("id", id);

          parameters.forEach((param, index) => {
            formData.append(
              `parameters[${index}][parameter_name]`,
              param.parameter_name
            );
            if (param.id) formData.append(`parameters[${index}][id]`, param.id);
            formData.append(`parameters[${index}][is_file]`, param.is_file);
            formData.append(
              `parameters[${index}][is_default]`,
              param.is_default
            );
            formData.append(
              `parameters[${index}][is_required]`,
              param.is_required
            );

            if (param.is_file && param.file) {
              formData.append(`parameters[${index}][file]`, param.file);
            } else {
              formData.append(`parameters[${index}][text]`, param.text);
            }
          });

          return {
            url: "/upload-model",
            body: formData,
            method: "POST",
          };
        },
      }),
      uploadTestImage: builder.mutation({
        query: ({ image, id }) => {
          const formData = new FormData();
          if (image instanceof File) {
            formData.append("image", image);
          }
          return {
            url: `/upload-test-image/${id}`,
            body: formData,
            method: "POST",
          };
        },
      }),
      uploadPythonScript: builder.mutation({
        query: ({ script, id, parameters }) => {
          const formData = new FormData();
          formData.append("script", script);
          formData.append("id", id);

          Object.entries(parameters).forEach(([key, value]) => {
            if (value instanceof File) {
              formData.append(key, value);
            } else {
              formData.append(key, value);
            }
          });

          return {
            url: `/upload-python-script/${id}`,
            body: formData,
            method: "POST",
          };
        },
      }),
      uploadDocument: builder.mutation({
        query: ({ doc, id }) => {
          const formData = new FormData();
          if (doc instanceof File) {
            formData.append("doc", doc);
          }
          return {
            url: `/upload-document/${id}`,
            body: formData,
            method: "POST",
          };
        },
      }),
      deleteModel: builder.mutation({
        query: ({ id }) => {
          return {
            url: `/delete-model/${id}`,
            method: "DELETE",
          };
        },
      }),
      updateModel: builder.mutation({
        query: ({ model, id }) => {
          return {
            url: `/update-model-file/${id}`,
            body: {
              model: model,
            },
            method: "POST",
          };
        },
      }),
      updateModelName: builder.mutation({
        query: ({ name, id }) => {
          return {
            url: `update-name/${id}/${name}`,
            method: "PUT",
          };
        },
      }),
      getInitialCode: builder.query({
        query: () => {
          return {
            url: `get-code-snippet`,
            method: "GET",
          };
        },
      }),
      getModel: builder.query({
        // eslint-disable-next-line no-unused-vars
        providesTags: (result, error, arg) => {
          const tags = [{ type: "model" }];
          return tags;
        },
        query: ({ filters, sortBy, sortOrder, perPage }) => {
          const queryParams = new URLSearchParams({
            ...filters,
            sortBy: sortBy || "id",
            sortOrder: sortOrder || "asc",
            perPage: perPage?.toString() || "15",
          });

          return {
            url: `/get-model?${queryParams.toString()}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useCreateModelMutation,
  useUploadTestImageMutation,
  useUploadPythonScriptMutation,
  useUploadDocumentMutation,
  useDeleteModelMutation,
  useUpdateModelMutation,
  useUpdateModelNameMutation,
  useGetModelQuery,
  useGetInitialCodeQuery,
} = ModelsAPI;
export { ModelsAPI };
