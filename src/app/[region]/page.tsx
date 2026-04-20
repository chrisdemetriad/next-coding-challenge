import { notFound } from "next/navigation";
import Home from "../page";

const regions = ["uk", "us"] as const;
type Region = (typeof regions)[number];

export default function RegionPage({
	params,
}: {
	params: {
		region: string;
	};
}) {
	if (!regions.includes(params.region as Region)) {
		notFound();
	}

	return <Home />;
}
