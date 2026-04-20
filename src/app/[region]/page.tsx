import { notFound } from "next/navigation";
import { isRegion } from "../../data/regions";
import Homepage from "../homepage/homepage";

export default function RegionPage({
	params,
}: {
	params: {
		region: string;
	};
}) {
	if (!isRegion(params.region)) {
		notFound();
	}

	return <Homepage region={params.region} />;
}
