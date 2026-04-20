export const regions = ["uk", "us"] as const;

export type Region = (typeof regions)[number];

export const regionConfig: Record<
    Region,
    {
        currency: "GBP" | "USD";
        currencyKey: "gbp" | "usd";
        locale: "en-GB" | "en-US";
        nameKey: "uk" | "us";
    }
> = {
    uk: {
        currency: "GBP",
        currencyKey: "gbp",
        locale: "en-GB",
        nameKey: "uk",
    },
    us: {
        currency: "USD",
        currencyKey: "usd",
        locale: "en-US",
        nameKey: "us",
    },
};

export function isRegion(value: string): value is Region {
    return regions.includes(value as Region);
}