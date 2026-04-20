import Homepage from "./homepage/homepage";

export default async function Home() {
	// Here I would check where the user is coming from using the request headers or whatever then redirect them to the right region page. Will default to the UK page for now.
	return <Homepage region="uk" />;
}
