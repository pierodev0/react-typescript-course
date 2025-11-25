import type { Product } from "../types";
import { formatCurrency } from "../utils";

type ProductDetailProp = {
  product: Product;
};
const ProductDetail = ({ product }: ProductDetailProp) => {
  const isAvailable = product.availability;
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        {isAvailable ? "Disponible" : "No disponible"}
      </td>
      <td className="flex gap-2 items-center">Editar</td>
    </tr>
  );
};

export default ProductDetail;
