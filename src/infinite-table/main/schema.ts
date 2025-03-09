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


export type TimingSchema = z.infer<typeof timingSchema>;




export const facetMetadataSchema = z.object({
  rows: z.array(z.object({ value: z.any(), total: z.number() })),
  total: z.number(),
  min: z.number().optional(),
  max: z.number().optional(),
});

export type FacetMetadataSchema = z.infer<typeof facetMetadataSchema>;
