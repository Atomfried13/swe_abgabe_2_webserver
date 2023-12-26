export interface LieferbarUebertragung {
	setLieferbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Lieferbar(lieferbarUeertragung: LieferbarUebertragung) {
	return (
		<>
			<input
				type="checkbox"
				id="Lieferbar"
				name="Lieferbar"
				value="Lieferbar"
				onChange={(event) =>
					lieferbarUeertragung.setLieferbar(event.target.checked)
				}
			/>
			<label htmlFor="Lieferbar">Lieferbar</label>
		</>
	);
}
