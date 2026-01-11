import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchAllCampers = createAsyncThunk(
  "campers/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
