import {
  Form,
  redirect,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductsService";

type ProductDetailProp = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}
const ProductDetail = ({ product }: ProductDetailProp) => {
  const isAvailable = product.availability;
  const navigate = useNavigate();
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <form action="" method="post">
          <button
            type="button"
            name="availability"
            value={product.availability.toString()}
            className={` ${isAvailable? 'text-black': 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
        </form>
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/productos/${product.id}/edit`)}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="post"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("Confirmar?")) {
                e.preventDefault();
              }
            }}
          >
            <button
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center w-full"
              type="submit"
            >
              Eliminar
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetail;
