type ItemQuantityProps = {
	count: number;
	name: string;
};

export default function ItemQuantity({ count, name }: ItemQuantityProps) {
	return (
		<div>
			{name} count: {count}
		</div>
	);
}