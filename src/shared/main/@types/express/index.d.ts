declare namespace Express {
	export interface Request {
		user: {
			id?: string & {
				__uuidBrand: never;
			};
			ip?: string;
			grants?: string[];
			groups?: string[];
		};
	}
}
