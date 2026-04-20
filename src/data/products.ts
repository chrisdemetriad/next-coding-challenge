import { type Region, regionConfig } from "./regions";

export async function fetchProducts(region: Region): Promise<UKProduct[]> {
	const response = await fetch("https://v0-api-endpoint-request.vercel.app/api/products", {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Couldn't fetch the products");
	}

	const data = (await response.json()) as ProductsRes;
	const config = regionConfig[region];

	return data.products.map((product) => ({
		id: product.id,
		name: product.name[config.nameKey],
		price: formatPrice(product.price[config.currencyKey], config.locale, config.currency),
		stock: product.stock,
	}));
}

export async function fetchMoreProducts(region: Region): Promise<UKProduct[]> {
	const response = await fetch("https://v0-api-endpoint-request.vercel.app/api/more-products", {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Couldn't fetch more products");
	}

	const data = (await response.json()) as ProductsRes;
	const config = regionConfig[region];

	return data.products.map((product) => ({
		id: product.id,
		name: product.name[config.nameKey],
		price: formatPrice(product.price[config.currencyKey], config.locale, config.currency),
		stock: product.stock,
	}));
}

export type GenericProduct = {
	id: number;
	name: {
		us: string;
		uk: string;
	};
	price: {
		usd: number;
		gbp: number;
	};
	stock: number;
};

type ProductsRes = {
	success: boolean;
	products: GenericProduct[];
};

export type UKProduct = {
	id: number;
	name: string;
	price: string;
	stock: number;
};

function formatPrice(amount: number, locale: string, currency: string) {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	}).format(amount);
}