import type { Product } from "../../data/products";
import { fetchMoreProducts } from "../../data/products";
import type { Region } from "../../data/regions";
import MoreProductsClient from "./more-products-client";

export default async function MoreProducts({
	initialProducts,
	region,
}: {
	initialProducts: Product[];
	region: Region;
}) {
	const products = await fetchMoreProducts(region);
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
