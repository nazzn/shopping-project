import imagePlaceholder from "../../assets/images/Placeholder.webp";
import { useContext, useEffect, useState } from "react";
import { ProductsListDTO } from "../../dtos/product/products-list-dto";
import { useNavigate } from "react-router-dom";
import { HttpService, apis } from "../../serviss/httpservice";
import { AuthContext } from "../../contexts/auth-context";
import PublicLayout from "../../layouts/public-layout";
import PaginatedItems from "./page-product";

type ProductsListPageProps = {};

const ProductsListPage: React.FC<ProductsListPageProps> = ({}) => {
  const [products, setProducts] = useState<ProductsListDTO[]>([]);
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    HttpService<ProductsListDTO[]>({
      method: "GET",
      url: `${apis["product_admin"]}?page=1`,
      headers: {
        Authorization: `Bearer ${authCtx.authData.token}`,
      },
    })
      .then(function (resp) {
        if (resp.data.length > 0) setProducts(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const dateToString = (input: Date): string => {
    return new Date(input).toDateString()
  };

  return (
    <div className="flex flex-col">
      <PaginatedItems>
        <h1 className="text-xl mb-4">لیست محصولات</h1>

        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 
       xl:grid-cols-5 gap-[20px]"
        >
          {products?.map((item) => (
            <div className="flex flex-col gap-1 p-2 border-2 rounded-lg">
              <img src={imagePlaceholder} alt="" className="rounded-lg m-2" />

              <h2>{item.title}</h2>
              <h2>{item.categoryTitle}</h2>
              <h3 className="text-green-700 font-bold">
                قیمت واقعی: {item.realPrice}
              </h3>
              <h3 className="text-green-700 font-bold">
                قیمت فروش: {item.salesPrice}
              </h3>
              <h3 className="font-bold">تعداد موجود: {item.qty}</h3>
              <div className="flex">
                {authCtx.authData.isAuth && (
                  <button
                    type="button"
                    className=""
                    onClick={() => navigate("/products/update/" + item.id)}
                  >
                    {/* <FontAwesomeIcon icon={faPencil} /> */}
                  </button>
                )}

                <div className="flex-auto"></div>
                <div className="flex gap-2">
                  <button type="button">
                    {/* <FontAwesomeIcon icon={faAdd} /> */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PaginatedItems>
    </div>
  );
};
const ProducPage: React.FC = () => {
  return (
    <PublicLayout>
      <ProductsListPage />
    </PublicLayout>
  );
};
export default ProducPage;
