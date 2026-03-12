import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiIntance from "../api/apiInstance.js";

// CREATE
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await apiIntance.post("/products", product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// DELETE
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await apiIntance.delete(`/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// READ
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiIntance.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// UPDATE
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await apiIntance.patch(
        `/products/${product.id}`,
        product,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    editData: {},
  },
  reducers: {
    editProduct: (state, action) => {
      state.editData = state.products.find(
        (product) => product.id === action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload,
        );
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product,
        );
        state.editData = {};
      });
  },
});

export default productSlice.reducer;
export const { editProduct } = productSlice.actions;
