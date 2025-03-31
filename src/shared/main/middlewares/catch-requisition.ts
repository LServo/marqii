import type { NextFunction, Request, Response } from "express";
import { SaveLogs } from "../../application/save-logs.js";

export function catchRequisition(
	request: Request,
	_response: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) {
	SaveLogs.ExpressInput(request);
	next();
}
