import imagePlaceholder from '../../assets/images/Placeholder.webp'
import { useContext, useEffect, useState } from "react";
import { ProductsListDTO } from "../../dtos/product/products-list-dto";
import { useNavigate } from "react-router-dom";
import { HttpService } from "../../serviss/httpservice";
import { AuthContext } from '../../contexts/auth-context';
import { CartContext } from '../../contexts/cart-context/cart-context';
import PublicLayout from '../../layouts/public-layout';
type ProductsListPageProps = {};

const ProductsListPage: React.FC<ProductsListPageProps> = ({}) => {
  const [products, setProducts] = useState([] as ProductsListDTO[]);
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    HttpService.get<ProductsListDTO[]>("products")
      .then(function (resp) {
        setProducts(resp.data);
        console.log(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // const Add = (item: ProductsListDTO) => {
  //   alert("Hi")
  // }
  return (
    <div className="flex flex-col">
      <h1 className="text-xl mb-4">لیست محصولات</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-[20px]">
        {products.map((item) => (
          <div className="flex flex-col gap-1 p-2 border-2 rounded-lg">
            <img src={imagePlaceholder} alt="" className="rounded-lg m-2" />
            <h2>{item.title}</h2>
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
                <button
                  type="button"
                  onClick={() => {
                    cartCtx.addToCart(item.id, item.qty);
                  }}
                >
                  {/* <FontAwesomeIcon icon={faAdd} /> */}
                </button>
                <span>
                  {
                    (cartCtx.cartData.items.find(
                      (itemInBasket) => itemInBasket .productID === item.id
                    )?.requestedQty) as number > 0 && (cartCtx.cartData.items.find(
                      (itemInBasket) => itemInBasket.productID === item.id
                    )?.requestedQty) as number
                  }
                </span>
                {(cartCtx.cartData.items.find(
                  (itemInBasket) => itemInBasket.productID === item.id
                )?.requestedQty) as number > 0 ? (
                  <button onClick={() => {
                    const requestedQty = cartCtx.cartData.items.find(
                      (itemInBasket) => itemInBasket.productID === item.id
                    )?.requestedQty as number;
                    cartCtx.removeFromCart(item.id, requestedQty)}}>
                    {/* <FontAwesomeIcon icon={faMinus} /> */}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
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
