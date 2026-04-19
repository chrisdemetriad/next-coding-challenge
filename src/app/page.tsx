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
	const [itemCount, setItemCount] = useState<number>(0);

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
		setItemCount(itemCount + 1);
	};

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>Michael&apos;s Amazing Web Store</p>
				<div>
					<button type="button" className={styles.basket}>
						Basket: {itemCount} items
					</button>
					<ItemCount
						name="Item 1"
						count={items.find((item) => item.name === "Item 1")?.quantity || 0}
					/>
					<ItemCount
						name="Item 2"
						count={items.find((item) => item.name === "Item 2")?.quantity || 0}
					/>
					<ItemCount
						name="Item 3"
						count={items.find((item) => item.name === "Item 3")?.quantity || 0}
					/>
					<ItemCount
						name="Item 4"
						count={items.find((item) => item.name === "Item 4")?.quantity || 0}
					/>
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
