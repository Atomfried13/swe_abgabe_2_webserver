interface CheckBoxAuswahlProps {
	handleCheckBoxChange: (id: string) => void;
}

export function CheckBoxId1({
	handleCheckBoxChange: handleCheckboxChange,
}: CheckBoxAuswahlProps) {
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

export function CheckBoxId20({
	handleCheckBoxChange: handleCheckboxChange,
}: CheckBoxAuswahlProps) {
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
