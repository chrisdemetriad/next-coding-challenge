"use client";
import { useState } from "react";
import styles from "./page.module.css";

const products = [
	{ name: "Item 1", description: "Foo" },
	{ name: "Item 2", description: "Bar" },
	{ name: "Item 3", description: "Baz" },
	{ name: "Item 4", description: "Qux" },
];

function ItemCount({ count, name }: { count: number; name: string }) {
	return (
		<div key={name}>
			{name} count: {count}
		</div>
	);
}

export default function Home() {
	const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
	let itemCount = 0;
	const itemCounts: Record<string, number> = {};

	for (const item of items) {
		itemCount += item.quantity;
		itemCounts[item.name] = item.quantity;
	}

	const addToCart = (product: string) => {
		const alreadyInCart = items.find((item) => item.name === product);
		if (alreadyInCart) {
			setItems((items) =>
				items.map((item) =>
					item.name === product
						? { ...item, quantity: item.quantity + 1 }
						: item,
				),
			);
		} else {
			setItems([...items, { name: product, quantity: 1 }]);
		}
	};

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>Michael&apos;s Amazing Web Store</p>
				<div>
					<button type="button" className={styles.basket}>
						Basket: {itemCount} items
					</button>
					{products.map((product) => (
						<ItemCount
							key={product.name}
							name={product.name}
							count={itemCounts[product.name] || 0}
						/>
					))}
				</div>
			</div>

			<div className={styles.grid}>
				{products.map((product) => (
					<button
						type="button"
						key={product.name}
						className={styles.card}
						onClick={() => addToCart(product.name)}
					>
						<h2>
							{product.name} <span>-&gt;</span>
						</h2>
						<p>{product.description}</p>
					</button>
				))}
			</div>
		</main>
	);
}
