import {
  RANGE_DELIMITER,
} from "../lib/delimiters";
import { z } from "zod";

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


// export type ColumnSchema = {
//   serialNumber: string;
//   description: string;
//   manufacturingDate: string;
//   expiryDate: string;
//   lotNumber: string;
//   inInventoryOf: string;
//   supplyChainStatus: string;
//   productStatus: string;
//   caseSSCC: string;
//   transactionID: string;
//   invoiceDate: string;
//   seller: string;
//   buyer: string;
//   location: string;
//   lastUpdatedOn: string;
//   isReactivated: string;
// }
export type TimingSchema = z.infer<typeof timingSchema>;

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
