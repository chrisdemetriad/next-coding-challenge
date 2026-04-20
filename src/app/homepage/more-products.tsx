import type { UKProduct } from "../../data/products";
import { fetchMoreProducts } from "../../data/products";
import MoreProductsClient from "./more-products-client";

export default async function MoreProducts({
	initialProducts,
}: {
	initialProducts: UKProduct[];
}) {
	const products = await fetchMoreProducts();
	const curated = products.filter(
		(product) =>
			!initialProducts.some(
				(initialProduct) =>
					initialProduct.name === product.name &&
					initialProduct.price === product.price,
			),
	);

	return <MoreProductsClient products={curated} />;
}
