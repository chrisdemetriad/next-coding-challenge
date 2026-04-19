import { fetchProducts } from "../data/products";
import HomePageClient from "./homepage/homepage-client";

export default async function Home() {
	const products = await fetchProducts();

	return <HomePageClient products={products} />;
}
