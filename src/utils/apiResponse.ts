import { Response } from "express";

type IRes<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };

  data?: T | null;
};

const sendApiResponse = <T>(res: Response, data: IRes<T>): void => {
  const responseData: IRes<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendApiResponse;
