"use client";

import type { Product } from "../../data/products";
import { useCart } from "../store/cart-store";
import styles from "./page.module.css";

export default function MoreProductsClient({
	products,
}: {
	products: Product[];
}) {
	const { addToCart } = useCart();

	if (products.length === 0) {
		return null;
	}

	return (
		<>
			<p>More products from a different source</p>
			<div className={styles.grid}>
				{products.map((product) => (
					<button
						type="button"
						// the appended p below isn't really needed but it's a defensive choice
						key={`p-${product.id}`}
						className={styles.card}
						onClick={() => addToCart({ id: product.id, name: product.name })}
					>
						<h2>
							{product.name} <span>-&gt;</span>
						</h2>
						<p>{product.price}</p>
					</button>
				))}
			</div>
		</>
	);
}
