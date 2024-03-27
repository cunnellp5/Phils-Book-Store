import { Response } from "express-serve-static-core";

class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function isError(err: Error | unknown): err is Error {
  return typeof err === "object" && err !== null && "message" in err;
}

export function RoutesErrorHandler(
  res: Response<any, Record<string, any>, number>,
  error: Error | unknown
) {
  if (isError(error)) {
    res.status(500).send(error.message);
  } else {
    res.status(500).send("An unknown error occurred");
  }
}
