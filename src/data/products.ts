export async function fetchProducts(): Promise<UKProduct[]> {
	const response = await fetch("https://v0-api-endpoint-request.vercel.app/api/products", {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Couldn't fetch the products");
	}

	const data = (await response.json()) as ProductsRes;

	return data.products.map((product) => ({
		id: product.id,
		name: product.name.uk,
		price: formatGbp(product.price.gbp),
		stock: product.stock,
	}));
}
// it contains both US/UK names, USD and GBP prices
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

function formatGbp(amount: number) {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
	}).format(amount);
}