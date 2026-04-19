type ItemCountProps = {
	count: number;
	name: string;
};

export default function ItemCount({ count, name }: ItemCountProps) {
	return (
		<div>
			{name} count: {count}
		</div>
	);
}