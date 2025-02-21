import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
  SLIDER_DELIMITER,
} from "../lib/delimiters";
import { METHODS } from "../constants/method";
import { REGIONS } from "../constants/region";
import { z } from "zod";
import { LEVELS } from "../constants/levels";

// https://github.com/colinhacks/zod/issues/2985#issue-2008642190
const stringToBoolean = z
  .string()
  .toLowerCase()
  .transform((val) => {
    try {
      return JSON.parse(val);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  })
  .pipe(z.boolean().optional());

export const timingSchema = z.object({
  "timing.dns": z.number(),
  "timing.connection": z.number(),
  "timing.tls": z.number(),
  "timing.ttfb": z.number(),
  "timing.transfer": z.number(),
});

export const columnSchema = z
  .object({
    serialNumber: z.string().nullable(),
    description: z.string().nullable(),
    manufacturingDate: z.string().nullable(),
    expiryDate: z.string().nullable(),
    lotNumber: z.string().nullable(),
    inInventoryOf: z.string().nullable(),
    supplyChainStatus: z.string().nullable(),
    productStatus: z.string().nullable(),
    caseSSCC: z.string().nullable(),
    transactionID: z.string().nullable(),
    invoiceDate: z.string().nullable(),
    seller: z.string().nullable(),
    buyer: z.string().nullable(),
    location: z.string().nullable(),
    lastUpdatedOn: z.string().nullable(),
    isReactivated: z.string().nullable(),
  });
// export type ColumnSchema = z.infer<typeof columnSchema>;
export type ColumnSchema = {
  serialNumber: string;
  description: string;
  manufacturingDate: string;
  expiryDate: string;
  lotNumber: string;
  inInventoryOf: string;
  supplyChainStatus: string;
  productStatus: string;
  caseSSCC: string;
  transactionID: string;
  invoiceDate: string;
  seller: string;
  buyer: string;
  location: string;
  lastUpdatedOn: string;
  isReactivated: string;
}
export type TimingSchema = z.infer<typeof timingSchema>;

// TODO: can we get rid of this in favor of nuqs search-params?
// export const columnFilterSchema = z.object({
//   level: z
//     .string()
//     .transform((val) => val.split(ARRAY_DELIMITER))
//     .pipe(z.enum(LEVELS).array())
//     .optional(),
//   method: z
//     .string()
//     .transform((val) => val.split(ARRAY_DELIMITER))
//     .pipe(z.enum(METHODS).array())
//     .optional(),
//   host: z.string().optional(),
//   pathname: z.string().optional(),
//   latency: z
//     .string()
//     .transform((val) => val.split(SLIDER_DELIMITER))
//     .pipe(z.coerce.number().array().max(2))
//     .optional(),
//   "timing.dns": z
//     .string()
//     .transform((val) => val.split(SLIDER_DELIMITER))
//     .pipe(z.coerce.number().array().max(2))
//     .optional(),
//   "timing.connection": z
//     .string()
//     .transform((val) => val.split(SLIDER_DELIMITER))
//     .pipe(z.coerce.number().array().max(2))
//     .optional(),
//   "timing.tls": z
//     .string()
//     .transform((val) => val.split(SLIDER_DELIMITER))
//     .pipe(z.coerce.number().array().max(2))
//     .optional(),
//   "timing.ttfb": z
//     .string()
//     .transform((val) => val.split(SLIDER_DELIMITER))
//     .pipe(z.coerce.number().array().max(2))
//     .optional(),
//   "timing.transfer": z
//     .string()
//     .transform((val) => val.split(SLIDER_DELIMITER))
//     .pipe(z.coerce.number().array().max(2))
//     .optional(),
//   status: z
//     .string()
//     .transform((val) => val.split(ARRAY_DELIMITER))
//     .pipe(z.coerce.number().array())
//     .optional(),
//   regions: z
//     .string()
//     .transform((val) => val.split(ARRAY_DELIMITER))
//     .pipe(z.enum(REGIONS).array())
//     .optional(),
//   date: z
//     .string()
//     .transform((val) => val.split(RANGE_DELIMITER).map(Number))
//     .pipe(z.coerce.date().array())
//     .optional(),
// });

export const columnFilterSchema = z.object({
  serialNumber: z.string().optional(),
  description: z.string().optional(),
  manufacturingDate: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER))
    .pipe(z.coerce.string().array().max(2))
    .optional(),
  expiryDate: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER))
    .pipe(z.coerce.string().array().max(2))
    .optional(),
  lotNumber: z.string().optional(),
  inInventoryOf: z.string().optional(),
  supplyChainStatus: z.string().optional(),
  productStatus: z.string().optional(),
  caseSSCC: z.string().optional(),
  transactionID: z.string().optional(),
  invoiceDate: z.string().optional(),
  seller: z.string().optional(),
  buyer: z.string().optional(),
  location: z.string().optional(),
  lastUpdatedOn: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER))
    .pipe(z.coerce.string().array().max(2))
    .optional(),
  isReactivated: z.string().optional(),
});

export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>;

export const facetMetadataSchema = z.object({
  rows: z.array(z.object({ value: z.any(), total: z.number() })),
  total: z.number(),
  min: z.number().optional(),
  max: z.number().optional(),
});

export type FacetMetadataSchema = z.infer<typeof facetMetadataSchema>;
