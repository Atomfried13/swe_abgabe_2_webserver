interface RadioButtonAuswahlProps {
	handleRadioClick: (letter: string) => void;
}

export function RadioButtonAuswahl({
	handleRadioClick,
}: RadioButtonAuswahlProps) {
	return (
		<>
			<input
				style={{ display: 'inline-block', marginRight: '1%' }}
				type="radio"
				name="searchLetter"
				id="searchLetterA"
				onChange={() => handleRadioClick('A')}
			/>
			<label htmlFor="searchLetterA">A</label>
			<input
				style={{
					display: 'inline-block',
					marginLeft: '3%',
					marginRight: '1%',
				}}
				type="radio"
				name="searchLetter"
				id="searchLetterL"
				onChange={() => handleRadioClick('L')}
			/>
			<label htmlFor="searchLetterL">L</label>
			<input
				style={{
					display: 'inline-block',
					marginLeft: '3%',
					marginRight: '1%',
				}}
				type="radio"
				name="searchLetter"
				id="searchLetter?"
				defaultChecked
				onChange={() => handleRadioClick('')}
			/>
			<label htmlFor="searchLetter?"></label>
		</>
	);
}
