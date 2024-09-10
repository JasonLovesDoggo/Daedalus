export type ApiResponse<T = any> = {
  success: boolean; // Either true or false
  message: string; // Any message to be displayed to user
  data?: T; // Optional data to be returned
  error?: string; // Optional error message to be returned to the client side
};
