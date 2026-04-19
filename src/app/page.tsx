import { fetchProducts } from "../data/products";
import HomePageClient from "./home-page-client";

export default async function Home() {
	const products = await fetchProducts();

	return <HomePageClient products={products} />;
}
