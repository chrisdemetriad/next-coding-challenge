import { Suspense } from "react";
import { fetchProducts } from "../data/products";
import HomePageClient from "./homepage/homepage-client";
import MoreProducts from "./homepage/more-products";

export default async function Home() {
	const products = await fetchProducts();

	// Suspense might not be ideal here but I wanted to show how it can be used to handle multiple async data sources in a single page without blocking the whole page from rendering

	// I initially combined both product sources but the second endpoint provides the same ids so I would either have to normaloise the data so every product has a truly unique id before rendering OR append a string to those new products keys so they won't conflict with the initial products. This approach would do for now as we put the products in two separate groups.
	return (
		<HomePageClient products={products}>
			{/* No spinners, I get it but we should really signify to the user more products are eventually coming, using a fallback? */}
			<Suspense>
				<MoreProducts />
			</Suspense>
		</HomePageClient>
	);
}
