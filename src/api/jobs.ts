import { createServerFn } from "@tanstack/react-start";
import { ENDPOINTS } from "#/constants/endpoints";
import type { BaseResponse } from "#/model/base-response";
import { BACKEND_API } from "#/utilities/backend-api";

export const getJobsHistory = createServerFn()
  .handler(async () => {
    const client = await BACKEND_API();
    const res = await client.get<BaseResponse<{ maxImageSize: number }>>(
      ENDPOINTS.CONFIG,
    );
    return res.data;
  })