"use client";

import Link from "next/link";
import type { Product } from "../../data/products";
import type { Region } from "../../data/regions";
import styles from "../homepage/page.module.css";
import { useCart } from "../store/cart-store";

export default function CheckoutClient({
	products,
	region = "uk",
}: {
	products: Product[];
	region?: Region;
}) {
	const { items, total } = useCart();

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>Checkout page</p>
				<p>Total items: {total}</p>
				<Link
					href={`/${region}`}
					className={`${styles.basket} ${styles.descriptionAction}`}
				>
					Back to products
				</Link>
			</div>

			<div className={styles.checkoutList}>
				{items.length === 0 ? (
					<div className={styles.card}>
						<h2>Basket is empty</h2>
						<p>Add something from the main page to see it here.</p>
					</div>
				) : (
					items.map((item) => {
						const product = products.find((product) => product.id === item.id);

						return (
							<div key={item.id} className={styles.checkoutItem}>
								<h2>{product?.name || item.name}</h2>
								<p>Quantity: {item.quantity}</p>
								<p>
									{product?.price !== null && <p>Price: {product?.price}</p>}
								</p>
							</div>
						);
					})
				)}
			</div>
		</main>
	);
}
