import axios from "axios";

export const HttpService = axios.create({
  baseURL: "http://192.168.0.120:8081",
});
export const apis: { [key: string]: string } = {
  product_public: "products",
  product_admin: "admin/products",
  category_public: "categories",
  category_admin: "admin/categories",
  login: "auth/login",
  register: "auth/register",
};
