import { pino } from "pino";
import pretty from "pino-pretty";

const stream = pretty({
	colorize: true,
	translateTime: true,
	ignore: "pid,hostname,level,name,caller",
	// messageFormat: "[{time}]{msg}",
});

export const logger = pino(
	{
		level: "info",
	},
	stream,
);
