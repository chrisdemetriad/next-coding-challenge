"use client";

import { useCart } from "../cart-store";

const CheckoutPage = () => {
	const { items } = useCart();

	return (
		<>
			<p>Checkout page</p>
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
