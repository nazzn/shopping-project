import React, { useState } from "react";
import { CreateProductDTO } from "../../dtos/product/create-product-dto";
import { useNavigate } from "react-router-dom";
import { HttpService } from "../../serviss/httpservice";
import PublicLayout from "../../layouts/public-layout";

type CreateProductPageProps = {
  title: string;
  categoryTitle: string;
  realPrice: number;
  salesPrice: number;
  qty: number;
  createdAt: string;
};

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<CreateProductPageProps>({
    title: "",
    categoryTitle: "",
    realPrice: 0,
    salesPrice: 0,
    qty: 0,
    createdAt: "2024-07-28T08:54:50.590Z",
  });
  const numberRegexPattern: RegExp = /^[0-9\b]+$/;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    HttpService.post("/api/products", product)
      .then((resp) => {
        console.log(resp);
        // navigate("/api/products");
      })
      .catch((err) => {
        alert(`افزودن محصول جدید با خطا مواجه شد ${err.statusCode}`);
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-xl">ایجاد محصول جدید</h1>
      <form className="flex flex-col mx-2 my-4 gap-4" onSubmit={handleSubmit}>
        <div className="flex items-center w-[400px]">
          <label htmlFor="title">عنوان محصول :</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="لطفا عنوان محصول را وارد نمایید"
            className="border rounded-lg ms-2 flex-auto py-2 px-4"
          />
        </div>
        <div className="flex items-center w-[400px]">
          <label htmlFor="price">قیمت واقعی :</label>
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
          />
        </div>
        <div className="flex items-center w-[400px]">
          <label htmlFor="price">قیمت فروش :</label>
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
          />
        </div>
        <div className="flex items-center w-[400px]">
          <label htmlFor="qty">تعداد موجودی انبار :</label>
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
        </div>
        <div className="flex items-center w-[400px] gap-3 justify-end">
          <button
            type="button"
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-600 "
          >
            بازگشت به لیست محصولات
          </button>
          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-800 rounded-md text-blue-50 "
          >
            ذخیره محصول
          </button>
        </div>
      </form>
    </div>
  );
};
const CreateProdut: React.FC = () => {
  return (
    <PublicLayout>
      <CreateProductPage />
    </PublicLayout>
  );
};
export default CreateProdut;
