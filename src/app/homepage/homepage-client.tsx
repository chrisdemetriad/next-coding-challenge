"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "../../data/products";
import type { Region } from "../../data/regions";
import ItemQuantity from "../components/item-quantity";
import { useCart } from "../store/cart-store";
import styles from "./page.module.css";

export default function HomePageClient({
	children,
	region = "uk",
	products,
}: {
	children?: ReactNode;
	region?: Region;
	products: Product[];
}) {
	const { total, itemQuantities, addToCart } = useCart();

	const basketTitle = `Basket: ${total} ${total === 1 ? "item" : "items"}`;

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>Michael&apos;s Amazing Web Store</p>
				<Link href={`/${region}/checkout`} className={styles.basket}>
					{basketTitle}
				</Link>
				{total > 0 && (
					<div>
						{products
							.filter((product) => (itemQuantities[product.id] || 0) > 0)
							.map((product) => (
								<ItemQuantity
									key={product.id}
									name={product.name}
									count={itemQuantities[product.id]}
								/>
							))}
					</div>
				)}
			</div>

			<div className={styles.grid}>
				{products.map((product) => (
					<button
						type="button"
						key={product.id}
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
			{/* more products coming from a suspended component below */}
			{children}
		</main>
	);
}
