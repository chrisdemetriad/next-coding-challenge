"use client";

import { useCart } from "../store/cart-store";

const CheckoutPage = () => {
	const { items, total } = useCart();

	return (
		<>
			<p>Checkout page</p>
			<p>Total items: {total}</p>
			{items.length === 0 ? (
				<p>Basket is empty</p>
			) : (
				items.map((item) => (
					<p key={item.name}>
						{item.name}: {item.quantity}
					</p>
				))
			)}
		</>
	);
};

export default CheckoutPage;
