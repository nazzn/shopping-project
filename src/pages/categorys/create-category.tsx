import { useState } from "react";
import { CreateCategoryDTO } from "../../dtos/category/create-category";
import { useNavigate } from "react-router-dom";
import { HttpService } from "../../serviss/httpservice";
import PublicLayout from "../../layouts/public-layout";
type CreateCategoryProps = {};
const CreateCategoryPage = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState<CreateCategoryDTO>({
    title: "",
  });

  const numberRegexPattern: RegExp = /^[0-9\b]+$/;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    HttpService.post("/api/admin/category")
      .then((resp) => {
        console.log(resp);
        navigate("/api/products");
      })
      .catch((err) => {
        alert(`افزودن محصول جدید با خطا مواجه شد ${err.statusCode}`);
        console.log(err);
      });
  };
  return <div></div>;
};
const CreateCategory: React.FC = () => {
  return (
    <PublicLayout>
      <CreateCategoryPage />
    </PublicLayout>
  );
};
export default CreateCategory;
