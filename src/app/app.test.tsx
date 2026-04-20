import { fireEvent, render, screen } from "@testing-library/react";
import CheckoutClient from "./checkout/checkout-client";
import HomePageClient from "./homepage/homepage-client";
import MoreProducts from "./homepage/more-products";
import MoreProductsClient from "./homepage/more-products-client";
import { resetCart } from "./store/cart-store";

jest.mock("next/link", () => {
	return function Link({
		children,
		href,
		...props
	}: {
		children: React.ReactNode;
		href: string;
	}) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	};
});

const products = [
	{ id: 1, name: "Wireless Headsets", price: "£76.99", stock: 45 },
	{ id: 2, name: "Fitness Tracker", price: "£154.99", stock: 28 },
];

const usProducts = [
	{ id: 1, name: "Wireless Headphones", price: "$99.99", stock: 45 },
	{ id: 2, name: "Smart Watch", price: "$199.99", stock: 28 },
];

const moreProducts = [
	{ id: 4, name: "Wireless Speaker", price: "£61.50", stock: 32 },
];

describe("app basics", () => {
	beforeEach(() => {
		window.localStorage.clear();
		resetCart();
		jest.restoreAllMocks();
	});

	it("renders the homepage with products and an empty basket", () => {
		render(<HomePageClient products={products} />);

		expect(screen.getByText("Michael's Amazing Web Store")).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "Basket: 0 items" }),
		).toBeInTheDocument();
		expect(screen.getByText("Wireless Headsets")).toBeInTheDocument();
		expect(screen.getByText("£76.99")).toBeInTheDocument();
		expect(screen.getByText("Wireless Headsets count: 0")).toBeInTheDocument();
	});

	it("updates basket and item quantity when a product is added", () => {
		render(<HomePageClient products={products} />);

		fireEvent.click(screen.getByRole("button", { name: /Wireless Headsets/i }));

		expect(
			screen.getByRole("link", { name: "Basket: 1 item" }),
		).toBeInTheDocument();
		expect(screen.getByText("Wireless Headsets count: 1")).toBeInTheDocument();
	});

	it("shows shared basket contents on checkout", () => {
		render(
			<>
				<HomePageClient products={products} />
				<CheckoutClient products={products} />
			</>,
		);

		fireEvent.click(screen.getByRole("button", { name: /Wireless Headsets/i }));
		fireEvent.click(screen.getByRole("button", { name: /Wireless Headsets/i }));

		expect(screen.getByText("Checkout page")).toBeInTheDocument();
		expect(screen.getByText("Total items: 2")).toBeInTheDocument();
		expect(screen.getByText("Wireless Headsets: 2")).toBeInTheDocument();
	});

	it("adds two different products and shows the combined basket total", () => {
		render(<HomePageClient products={products} />);

		fireEvent.click(screen.getByRole("button", { name: /Wireless Headsets/i }));
		fireEvent.click(screen.getByRole("button", { name: /Fitness Tracker/i }));

		expect(
			screen.getByRole("link", { name: "Basket: 2 items" }),
		).toBeInTheDocument();
		expect(screen.getByText("Wireless Headsets count: 1")).toBeInTheDocument();
		expect(screen.getByText("Fitness Tracker count: 1")).toBeInTheDocument();
	});

	it("keeps a shared cart across regions by product id", () => {
		const { rerender } = render(<HomePageClient products={products} />);

		fireEvent.click(screen.getByRole("button", { name: /Wireless Headsets/i }));

		rerender(<HomePageClient products={usProducts} />);

		expect(
			screen.getByRole("link", { name: "Basket: 1 item" }),
		).toBeInTheDocument();
		expect(
			screen.getByText("Wireless Headphones count: 1"),
		).toBeInTheDocument();
	});

	it("adds a product from the more-products section to the basket", () => {
		render(
			<>
				<HomePageClient products={products} />
				<MoreProductsClient products={moreProducts} />
			</>,
		);

		fireEvent.click(screen.getByRole("button", { name: /Wireless Speaker/i }));

		expect(
			screen.getByRole("link", { name: "Basket: 1 item" }),
		).toBeInTheDocument();
	});

	it("shows an empty checkout state", () => {
		render(<CheckoutClient products={products} />);

		expect(screen.getByText("Checkout page")).toBeInTheDocument();
		expect(screen.getByText("Total items: 0")).toBeInTheDocument();
		expect(screen.getByText("Basket is empty")).toBeInTheDocument();
	});

	it("links the basket to the regional checkout page", () => {
		render(<HomePageClient products={products} region="us" />);

		expect(
			screen.getByRole("link", { name: "Basket: 0 items" }),
		).toHaveAttribute("href", "/us/checkout");
	});

	it("filters duplicate products from the second source by name and price", async () => {
		const originalFetch = global.fetch;

		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				success: true,
				products: [
					{
						id: 1,
						name: { uk: "Wireless Headsets", us: "Wireless Headphones" },
						price: { gbp: 76.99, usd: 99.99 },
						stock: 45,
					},
					{
						id: 4,
						name: { uk: "Wireless Speaker", us: "Bluetooth Speaker" },
						price: { gbp: 61.5, usd: 79.99 },
						stock: 32,
					},
				],
			}),
		} as Response);

		render(await MoreProducts({ initialProducts: products, region: "uk" }));

		expect(screen.queryByText("Wireless Headsets")).not.toBeInTheDocument();
		expect(screen.getByText("Wireless Speaker")).toBeInTheDocument();

		global.fetch = originalFetch;
	});
});
