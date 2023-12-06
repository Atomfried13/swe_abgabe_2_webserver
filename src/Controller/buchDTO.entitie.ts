/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable max-classes-per-file */
export type BuchArt = 'DRUCKAUSGABE' | 'KINDLE';
export class BuchDTOohneref {
	readonly isbn!: string;
	readonly rating: number | undefined;
	readonly art: BuchArt | undefined;
	readonly preis!: number;
	readonly rabatt: number | undefined;
	readonly lieferbar: boolean | undefined;
	readonly datum: Date | string | undefined;
	readonly homepage: string | undefined;
	readonly schlagwoerter: string[] | undefined;
}
