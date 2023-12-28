interface ArtUebertragung {
	setArt: React.Dispatch<React.SetStateAction<string>>;
}

export function Art(artUebertragung: ArtUebertragung) {
	return (
		<>
			<input
				type="radio"
				id="DRUCKAUSGABE"
				name="Art"
				value="DRUCKAUSGABE"
				defaultChecked
				onChange={(event) => artUebertragung.setArt(event.target.value)}
			/>
			<label id="DRUCKAUSGABE">DRUCKAUSGABE</label>
			<br />
			<input
				type="radio"
				id="KINDLE"
				name="Art"
				value="KINDLE"
				onChange={(event) => artUebertragung.setArt(event.target.value)}
			/>
			<label id="KINDLE">KINDLE</label>
		</>
	);
}
