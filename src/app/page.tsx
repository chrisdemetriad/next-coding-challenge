"use client";
import Link from "next/link";
import { useCart } from "./cart-store";
import styles from "./page.module.css";

const products = [
	{ name: "Item 1", description: "Foo" },
	{ name: "Item 2", description: "Bar" },
	{ name: "Item 3", description: "Baz" },
	{ name: "Item 4", description: "Qux" },
];

function ItemCount({ count, name }: { count: number; name: string }) {
	return (
		<div>
			{name} count: {count}
		</div>
	);
}

export default function Home() {
	const { items, itemCounts, addToCart } = useCart();
	let total = 0;

	for (const item of items) {
		total += item.quantity;
	}

	const basketTitle = `Basket: ${total} ${total === 1 ? "item" : "items"}`;

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>Michael&apos;s Amazing Web Store</p>
				<div>
					<Link href="/checkout">{basketTitle}</Link>
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
