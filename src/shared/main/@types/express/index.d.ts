declare namespace Express {
	export interface Request {
		user: {
			id?: string & {
				__uuidBrand: never;
			};
			accessToken?: string;
		};
	}
}
