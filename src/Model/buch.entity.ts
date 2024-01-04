import { ReactNode } from 'react';

export interface Buch {
	id: string;
	isbn: string;
	art: string;
	preis: number;
	rating: number;
	rabatt: number;
	schlagwoerter: string[];
	lieferbar: boolean;
	titel: {
		titel: string;
	};
}

export interface BuchListe {
	map(mapFunction: (buch: Buch, index: number) => ReactNode): ReactNode;
	buecher: Buch[];
}

export interface QueryIdDaten {
	buch: Buch;
}

export interface QueryTitelDaten {
	buecher: BuchListe;
}
