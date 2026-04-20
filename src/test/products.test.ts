import { fetchProducts } from "../data/products";

const apiResponse = {
    success: true,
    products: [
        {
            id: 1,
            name: {
                uk: "Wireless Headsets",
                us: "Wireless Headphones",
            },
            price: {
                gbp: 76.99,
                usd: 99.99,
            },
            stock: 45,
        },
    ],
};

describe("fetchProducts", () => {
    const originalFetch = global.fetch;

    afterEach(() => {
        jest.restoreAllMocks();
        global.fetch = originalFetch;
    });

    it("maps product name and price for UK and US regions", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => apiResponse,
        } as Response);

        const ukProducts = await fetchProducts("uk");
        const usProducts = await fetchProducts("us");

        expect(ukProducts[0]).toEqual({
            id: 1,
            name: "Wireless Headsets",
            price: "£76.99",
            stock: 45,
        });

        expect(usProducts[0]).toEqual({
            id: 1,
            name: "Wireless Headphones",
            price: "$99.99",
            stock: 45,
        });
    });
});
