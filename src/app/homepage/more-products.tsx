import { fetchMoreProducts } from "../../data/products";
import MoreProductsClient from "./more-products-client";

export default async function MoreProducts() {
	const products = await fetchMoreProducts();

	return <MoreProductsClient products={products} />;
}