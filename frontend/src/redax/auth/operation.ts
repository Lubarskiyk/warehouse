// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ILoginCredentials } from '@/types';
// import { loginUserApi } from '@/api/axios/authApi';
//
// export const logInUser = createAsyncThunk(
//   "auth/login",
//   async (userData: ILoginCredentials, { rejectWithValue }) => {
//     try {
//       const response = await loginUserApi(userData);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   },
// );
//
// export const refreshAccessToken = createAsyncThunk(
//   "auth/refresh",
//
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await refreshAccessTokenApi();
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(handleApiError(err, "Token refresh failed"));
//     }
//   },
// );

// export const logOut = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await logoutApi();
//       delete api.defaults.headers.common["Authorization"];
//     } catch (err) {
//       return rejectWithValue(handleApiError(err, "Помилка виходу"));
//     }
//   },
// );