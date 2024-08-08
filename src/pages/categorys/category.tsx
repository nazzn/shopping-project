import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/public-layout";
import { HttpService } from "../../serviss/httpservice";
import { useNavigate } from "react-router-dom";
import { CategoryDTO } from "../../dtos/category/category";

type CategoryListPageProps = {
  id: number;
  title: string;
};

const CategoryListPage = ({}) => {
  const [category, setcategory] = useState<CategoryDTO>({
    id: 0,
    title: "",
  });
  const navigate = useNavigate();

  //   const authCtx = useContext(AuthContext);

  useEffect(() => {
    HttpService.get<CategoryDTO>("/api/category")
      .then(function (resp) {
        setcategory(resp.data);
        console.log(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <select name="category" id="categoryID" className="border ">
        <option value={category.id}>لاما</option>
      </select>{" "}
      <span> :دسته بندی</span>{" "}
    </div>
  );
};
const CategoryPage: React.FC = () => {
  return (
    <PublicLayout>
      <CategoryListPage />
    </PublicLayout>
  );
};
export default CategoryPage;
