interface RadioButtonsProps {
	handleRadioClick: (letter: string) => void;
}

export function RadioButtons({ handleRadioClick }: RadioButtonsProps) {
	return (
		<>
			<input
				style={{ display: 'inline-block', marginRight: '1%' }}
				type="radio"
				name="searchLetter"
				id="searchLetterA"
				onChange={() => handleRadioClick('A')}
			/>
			<label id="searchLetterA">A</label>
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
			<label id="searchLetterL">L</label>
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
			<label id="searchLetter?"></label>
		</>
	);
}
