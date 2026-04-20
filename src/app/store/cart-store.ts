"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create<Store>()(
	persist(
		(set) => ({
			items: [],
			addToCart: (product) => {
				set((state) => {
					const itemInCart = state.items.find((item) => item.id === product.id);

					if (itemInCart) {
						return {
							items: state.items.map((item) =>
								item.id === product.id
									? { ...item, name: product.name, quantity: item.quantity + 1 }
									: item,
							),
						};
					}

					return {
						items: [...state.items, { id: product.id, name: product.name, quantity: 1 }],
					};
				});
			},
		}),
		{
			name: "michaels-amazing-web-store",
			version: 2,
			migrate: () => ({
				items: [],
			}),
		},
	),
);

export function useCart(): Data {
	const items = useStore((state) => state.items);
	const addToCart = useStore((state) => state.addToCart);
	let total = 0;

	const itemQuantities: Record<number, number> = {};

	for (const item of items) {
		total += item.quantity;
		itemQuantities[item.id] = item.quantity;
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
	addToCart: (product: Product) => void;
};

type Item = {
	id: number;
	name: string;
	quantity: number;
};

type Product = {
	id: number;
	name: string;
};

type Data = {
	items: Item[];
	total: number;
	itemQuantities: Record<number, number>;
	addToCart: (product: Product) => void;
};