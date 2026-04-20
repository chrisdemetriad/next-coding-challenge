import { notFound } from "next/navigation";
import { fetchMoreProducts, fetchProducts } from "../../../data/products";
import { isRegion } from "../../../data/regions";
import CheckoutClient from "../../checkout/checkout-client";

export default async function CheckoutPage({
	params,
}: {
	params: {
		region: string;
	};
}) {
	if (!isRegion(params.region)) {
		notFound();
	}

	const [products, moreProducts] = await Promise.all([
		fetchProducts(params.region),
		fetchMoreProducts(params.region),
	]);

	const unique = moreProducts.filter(
		(mp) => !products.some((p) => p.name === mp.name && p.price === mp.price),
	);

	return (
		<CheckoutClient
			products={[...products, ...unique]}
			region={params.region}
		/>
	);
}
