import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import z from "zod";
import { ENDPOINTS } from "#/constants/endpoints";
import { FileMimeType } from "#/constants/file";
import type { AxiosCustomError } from "#/model/axios-error";
import type { BasePaginationResponse } from "#/model/base-response";
import { BACKEND_API } from "#/utilities/backend-api";

export type JobHistoryResponse = {
  category: string;
  name: string;
  success: boolean;
  message: string;
  date: string;
};

const getJobsHistorySchema = z.object({
  currentPage: z.number().int().min(0).default(0),
  pageSize: z.number().int().min(1).max(100).default(10),
});

export const getJobsHistory = createServerFn()
  .validator(getJobsHistorySchema)
  .handler(async ({ data }) => {
    const client = await BACKEND_API();
    const res = await client.get<BasePaginationResponse<JobHistoryResponse>>(
      ENDPOINTS.HISTORY,
      {
        params: data,
      },
    );
    return res.data;
  });

export const uploadExcelSchema = z.object({
  rawData: z
    .file()
    .refine(
      (file) => file.type === FileMimeType.EXCEL,
      "Invalid file type. Only Excel files are allowed.",
    ),
});
export type uploadExcelSchemaType = z.infer<typeof uploadExcelSchema>;

export const uploadHaydayExcel = createServerFn({ method: "POST" })
  .validator((x) => x as FormData)
  .handler(async ({ data }) => {
    const client = await BACKEND_API();
    const res = await client.put<{ message: string }>(ENDPOINTS.HAYDAY, data);
    return res.data;
  });
export const uploadTransactionExcel = createServerFn({ method: "POST" })
  .validator((x) => x as FormData)
  .handler(async ({ data }) => {
    const client = await BACKEND_API();
    const res = await client.put<{ message: string }>(
      ENDPOINTS.TRANSACTION,
      data,
    );
    return res.data;
  });

export const triggerTransjakartaFetch = createServerFn().handler(async () => {
  const client = await BACKEND_API();
  const res = await client.post<{ message: string }>(
    ENDPOINTS.TRANSJAKARTA.FETCH,
  );
  return res.data;
});
export const triggerTransjakartaFetchJSON = createServerFn().handler(
  async () => {
    try
    {
      await axios.get(`${process.env.NEXT_API_URL}/sync`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_API_CRON_SECRET}`,
        },
      });

      return {
        code: 200,
        message: "Transjakarta fetch triggered successfully",
      }
    }
    catch
    {
      return ({
        code: 500,
        data: "Backend Error",
      } satisfies AxiosCustomError);
    }
  },
);

export const triggerTransjakartaSync = createServerFn()
  .validator(z.object({ useExcel: z.boolean().default(false) }))
  .handler(async ({ data }) => {
    const client = await BACKEND_API();
    const res = await client.post<{ message: string }>(
      ENDPOINTS.TRANSJAKARTA.SYNC,
      null,
      { params: data },
    );
    return res.data;
  });
