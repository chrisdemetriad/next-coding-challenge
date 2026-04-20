"use client";

import type { UKProduct } from "../../data/products";
import { useCart } from "../store/cart-store";

export default function CheckoutClient({
	products,
}: {
	products: UKProduct[];
}) {
	const { items, total } = useCart();

	return (
		<>
			<p>Checkout page</p>
			<p>Total items: {total}</p>
			{items.length === 0 ? (
				<p>Basket is empty</p>
			) : (
				items.map((item) => {
					const product = products.find((product) => product.id === item.id);

					return (
						<p key={item.id}>
							{product?.name || item.name}: {item.quantity}
						</p>
					);
				})
			)}
		</>
	);
}
