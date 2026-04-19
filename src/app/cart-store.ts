"use client";

import { create } from "zustand";

const useStore = create<Store>((set) => ({
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
}));

export function useCart(): Data {
	const items = useStore((state) => state.items);
	const addToCart = useStore((state) => state.addToCart);
	// @TODO find a better namne for itemCounts, don't like it much
	const itemCounts: Record<string, number> = {};

	for (const item of items) {
		itemCounts[item.name] = item.quantity;
	}

	return {
		items,
		itemCounts,
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
	itemCounts: Record<string, number>;
	addToCart: (product: string) => void;
};