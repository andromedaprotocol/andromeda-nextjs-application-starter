export enum LcdClientErrorType {
  UNEXPECTED_ERROR_MESSAGE = "An unexpected error occurred.",
}

export function getLcdClientErrorMessage({
  message = LcdClientErrorType.UNEXPECTED_ERROR_MESSAGE,
}: {
  message?: string;
} = {}) {
  if (message.endsWith(".")) {
    message = message.slice(0, -1);
  }
  if (message.startsWith("Fetch error. ")) {
    message = message.replace("Fetch error. ", "").trim();
  }
  return `Fetch error. ${message}.`;
}

/**
 * Error class for LCD client errors.
 * @template Data - The type of the data returned from the LCD client.
 */
export class LcdClientError<Data = unknown> extends Error {
  status: number;
  data: Data;
  response: Response;
  constructor({
    message,
    data,
    response,
  }: {
    message: string;
    data: Data;
    response: Response;
  }) {
    super(message);
    this.status = response.status;
    this.data = data;
    this.response = response;
  }
}
