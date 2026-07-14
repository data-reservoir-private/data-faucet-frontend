import { createServerOnlyFn } from "@tanstack/react-start";
import axios, { type AxiosError } from 'axios';
import { serialize } from 'object-to-formdata'
import qs from 'qs';
import type { AxiosCustomError } from "#/model/axios-error";
import type { BadRequestResponse } from "#/model/base-response";

export const objectToFormData = (x: object) =>
  serialize(x, {
    dotsForObjectNotation: true,
    booleansAsIntegers: false,
    allowEmptyArrays: true,
    indices: true
  });

export const BACKEND_API = createServerOnlyFn(async () => {
  const client = axios.create({
    baseURL: process.env.API_URL,
    formSerializer: {
      visitor: function (this, value, key) {
        serialize(value, { indices: true, dotsForObjectNotation: true }, this as FormData, String(key));
        return false;
      },
    },
    paramsSerializer: (params) => qs.stringify(params, {
      allowDots: false,
      arrayFormat: 'repeat'
    })
  });

  client.interceptors.request.use(async x => {
    x.headers['X-API-Key'] = process.env.API_KEY;
    if (x.headers["Content-Type"] === undefined && ['POST', 'PUT', 'PATCH'].includes(x.method?.toUpperCase() ?? "")) {
      x.headers["Content-Type"] = x.data instanceof FormData ?
        'multipart/form-data' : 'application/x-www-form-urlencoded'
    }

    if (!x.url?.startsWith(process.env.API_URL)) x.url = `${process.env.API_URL}${x.url}`;
    return x;
  });

  client.interceptors.response.use(res => res, async (err: AxiosError) => {
    if (err.status === 400 && err.response) {
      const d = err.response.data as BadRequestResponse;
      return Promise.reject({ code: 400, data: d.data } satisfies AxiosCustomError);
    }
    console.log('Backend API Error', err);
    return Promise.reject({ code: 500, data: "Backend Error" } satisfies AxiosCustomError);
  });

  return client;
});

export const transformFormData = (a: object) =>
  qs.stringify(a, {
    allowDots: true,
    arrayFormat: 'indices',
  });