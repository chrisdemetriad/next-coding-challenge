"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create<Store>()(
	persist(
		(set) => ({
			items: [],
			addToCart: (product) => {
				set((state) => {
					const itemInCart = state.items.find((item) => item.name === product);

					if (itemInCart) {
						return {
							items: state.items.map((item) =>
								item.name === product
									? { ...item, quantity: item.quantity + 1 }
									: item,
							),
						};
					}

					return {
						items: [...state.items, { name: product, quantity: 1 }],
					};
				});
			},
		}),
		{
			name: "michaels-amazing-web-store",
		},
	),
);

export function useCart(): Data {
	const items = useStore((state) => state.items);
	const addToCart = useStore((state) => state.addToCart);
	let total = 0;

	const itemQuantities: Record<string, number> = {};

	for (const item of items) {
		total += item.quantity;
		itemQuantities[item.name] = item.quantity;
	}

	return {
		items,
		total,
		itemQuantities,
		addToCart,
	};
}

type Store = {
	items: Item[];
	addToCart: (product: string) => void;
};

type Item = {
	name: string;
	quantity: number;
};

type Data = {
	items: Item[];
	total: number;
	itemQuantities: Record<string, number>;
	addToCart: (product: string) => void;
};