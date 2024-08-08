import React, { useContext, useEffect, useState } from "react";
import { CreateProductDTO } from "../../dtos/product/create-product-dto";
import { Link, useNavigate } from "react-router-dom";
import { HttpService, apis } from "../../serviss/httpservice";
import { CategoryDTO } from "../../dtos/category/category";
import DashboardLayout from "../../layouts/dashboard-layout";
import { AuthContext } from "../../contexts/auth-context";

const CreateProductPage = () => {
  const [categories, setCategories] = useState({
    id: 0,
    title: "",
  });
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    // Get Categories
    HttpService.get<CategoryDTO>("/api/category")
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [product, setProduct] = useState<CreateProductDTO>({
    title: "",
    categoryID: 0,
    realPrice: 0,
    salesPrice: 0,
    qty: 0,
    isPublished: true,
  });

  const numberRegexPattern: RegExp = /^[0-9\b]+$/;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(product);

    event.preventDefault();
    if (!authCtx.authData.isAuth) return;

    HttpService({
      method: "POST",
      url: apis["product_admin"],
      data: product,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.authData.token}`,
      },
    })
      .then((resp) => {
        alert("Product Created Successfully!");
        navigate("/dashboard/products");
      })
      .catch((err) => {
        alert(`افزودن محصول جدید با خطا مواجه شد ${err.statusCode}`);
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col justify-end">
      {" "}
      <div className="breadcrumbs text-sm alert mb-2">
        <ul>
          <li>
            <a>Admin Panel</a>
          </li>
          <li>
            <Link to="/dashboard/products">Products</Link>
          </li>
          <li>Create New</li>
        </ul>
      </div>
      <h1 className="text-xl">ایجاد محصول جدید</h1>
      <form className="flex flex-col mx-2 my-4 gap-4 " onSubmit={handleSubmit}>
        <div>
          <select name="category" id="categoryID" className="border ">
            <option value={categories.title}>لاما</option>
          </select>{" "}
          <span> :دسته بندی</span>{" "}
        </div>

        <div className="flex items-center w-[600px]">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="لطفا عنوان محصول را وارد نمایید"
            className="border rounded-lg ms-2 flex-auto py-2 px-4"
          />{" "}
          <label htmlFor="title">:عنوان محصول </label>
        </div>
        <div className="flex items-center w-[600px]">
          <input
            type="text"
            name="price"
            value={product.realPrice}
            onChange={(e) => {
              if (e.target.value === "")
                setProduct({ ...product, realPrice: 0 });
              if (numberRegexPattern.test(e.target.value))
                setProduct({
                  ...product,
                  realPrice: parseInt(e.target.value),
                });
            }}
            className="border rounded-lg ms-2 flex-auto py-2 px-4"
          />{" "}
          <label htmlFor="price"> :قیمت واقعی</label>
        </div>
        <div className="flex items-center w-[600px]">
          <input
            type="text"
            name="price"
            value={product.salesPrice}
            onChange={(e) => {
              if (e.target.value === "")
                setProduct({ ...product, salesPrice: 0 });
              if (numberRegexPattern.test(e.target.value))
                setProduct({
                  ...product,
                  salesPrice: parseInt(e.target.value),
                });
            }}
            className="border rounded-lg ms-2 flex-auto py-2 px-4"
          />{" "}
          <label htmlFor="price"> :قیمت فروش</label>
        </div>
        <div className="flex items-center w-[600px]">
          <input
            type="text"
            name="qty"
            value={product.qty}
            onChange={(e) => {
              if (e.target.value === "") setProduct({ ...product, qty: 0 });
              if (numberRegexPattern.test(e.target.value))
                setProduct({ ...product, qty: parseInt(e.target.value) });
            }}
            className="border rounded-lg ms-2 flex-auto py-2 px-4"
          />
          <label htmlFor="qty"> :تعداد موجودی انبار</label>
        </div>
        <div className="flex items-center w-[400px] gap-3 justify-end">
          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-800 rounded-md text-blue-50 "
          >
            ذخیره محصول
          </button>{" "}
          <button
            type="button"
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-600 "
          >
            بازگشت به لیست محصولات
          </button>
        </div>
      </form>
    </div>
  );
};
const CreateProdut: React.FC = () => {
  return (
    <DashboardLayout>
      <CreateProductPage />
    </DashboardLayout>
  );
};
export default CreateProdut;
