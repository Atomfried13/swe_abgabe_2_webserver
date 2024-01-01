interface SearchCheckboxesProps {
	handleCheckboxChange: (id: string) => void;
}

export function SearchCheckboxId1({
	handleCheckboxChange,
}: SearchCheckboxesProps) {
	return (
		<>
			<input
				style={{ display: 'inline-block', marginRight: '1%' }}
				type="checkbox"
				id="checkboxId1"
				onChange={() => handleCheckboxChange('1')}
			/>
			<label htmlFor="checkboxId1">1</label>
		</>
	);
}

export function SearchCheckboxId20({
	handleCheckboxChange,
}: SearchCheckboxesProps) {
	return (
		<>
			<input
				style={{
					display: 'inline-block',
					marginRight: '1%',
					marginLeft: '3%',
				}}
				type="checkbox"
				id="checkboxId20"
				onChange={() => handleCheckboxChange('20')}
			/>
			<label htmlFor="checkboxId20">20</label>
		</>
	);
}
