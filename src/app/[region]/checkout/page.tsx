import { fetchMoreProducts, fetchProducts } from "../../../data/products";
import type { Region } from "../../../data/regions";
import CheckoutClient from "../../checkout/checkout-client";

export default async function CheckoutPage({
	params,
}: {
	params: {
		region: Region;
	};
}) {
	const [products, moreProducts] = await Promise.all([
		fetchProducts(params.region),
		fetchMoreProducts(params.region),
	]);

	return <CheckoutClient products={[...products, ...moreProducts]} region={params.region} />;
}