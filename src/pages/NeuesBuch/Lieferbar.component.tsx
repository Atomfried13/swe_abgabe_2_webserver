export interface LieferbarUebertragung {
	setLieferbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Lieferbar(lieferbarUebertragung: LieferbarUebertragung) {
	return (
		<>
			<input
				type="checkbox"
				id="Lieferbar"
				name="Lieferbar"
				value="Lieferbar"
				onChange={(event) =>
					lieferbarUebertragung.setLieferbar(event.target.checked)
				}
			/>
			<label htmlFor="Lieferbar">Lieferbar</label>
		</>
	);
}
