import { TitelDTO } from './titelDTO.entity.ts';
import { AbbildungDTO } from './abbildungDTO.entity.ts';

export type BuchArt = 'DRUCKAUSGABE' | 'KINDLE';

export class BuchDTO {
	readonly isbn!: string;
	readonly rating: number | undefined;
	readonly art: BuchArt | undefined;
	readonly preis!: number;
	readonly rabatt: number | undefined;
	readonly lieferbar: boolean | undefined;
	readonly datum: Date | string | undefined;
	readonly homepage: string | undefined;
	readonly schlagwoerter: string[] | undefined;
	readonly titel!: TitelDTO;
	readonly abbildungen: AbbildungDTO[] | undefined;
}
