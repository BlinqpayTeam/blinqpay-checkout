export type Customer = {
  /**
   * Customer's email address.
   */
  email: string;
  /**
   * Customer's phone number.
   */
  phoneNumber: string;
  /**
   * Customer's name.
   */
  name: string;
};

export type ResponseType = {
  data?: Record<string, unknown>;
  error: boolean;
  message?: string;
  statusCode: number;
};
