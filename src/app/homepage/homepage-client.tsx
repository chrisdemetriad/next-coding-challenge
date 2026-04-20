"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { UKProduct } from "../../data/products";
import ItemQuantity from "../components/item-quantity";
import { useCart } from "../store/cart-store";
import styles from "./page.module.css";

export default function HomePageClient({
	children,
	products,
}: {
	children?: ReactNode;
	products: UKProduct[];
}) {
	const { total, itemQuantities, addToCart } = useCart();

	const basketTitle = `Basket: ${total} ${total === 1 ? "item" : "items"}`;

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>Michael&apos;s Amazing Web Store</p>
				<div>
					<Link href="/checkout" className={styles.basket}>
						{basketTitle}
					</Link>
					{products.map((product) => (
						<ItemQuantity
							key={product.id}
							name={product.name}
							count={itemQuantities[product.name] || 0}
						/>
					))}
				</div>
			</div>

			<div className={styles.grid}>
				{products.map((product) => (
					<button
						type="button"
						key={product.id}
						className={styles.card}
						onClick={() => addToCart(product.name)}
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
