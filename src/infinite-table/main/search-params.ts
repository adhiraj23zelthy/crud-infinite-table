import {
  createParser,
  createSerializer,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsTimestamp,
  type inferParserType,
  createLoader
} from "nuqs";
import { createSearchParamsCache } from "nuqs/server";
// Note: import from 'nuqs/server' to avoid the "use client" directive
import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
  SLIDER_DELIMITER,
  SORT_DELIMITER,
} from "../lib/delimiters";

import { REGIONS } from "../constants/region";
import { METHODS } from "../constants/method";
import { LEVELS } from "../constants/levels";
import memoize from "lodash/memoize";
import {cache} from 'react'
// https://logs.run/i?sort=latency.desc

export const parseAsSort = createParser({
  parse(queryValue) {
    const [id, desc] = queryValue.split(SORT_DELIMITER);
    if (!id && !desc) return null;
    return { id, desc: desc === "desc" };
  },
  serialize(value) {
    return `${value.id}.${value.desc ? "desc" : "asc"}`;
  },
});

export const searchParamsParser = {
  // NEW SERIALIZATION SCHEMA FILTERS
  serialNumber: parseAsString,
  description: parseAsString,
  manufacturingDate: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
  expiryDate: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
  lotNumber: parseAsString,
  inInventoryOf: parseAsString,
  supplyChainStatus: parseAsString,
  productStatus: parseAsString,
  caseSSCC: parseAsString,
  transactionID: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
  invoiceDate: parseAsString,
  seller: parseAsString,
  buyer: parseAsString,
  location: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
  lastUpdatedOn: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
  isReactivated: parseAsString,
  uuid: parseAsString,
  date: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),

  // REQUIRED FOR SORTING & PAGINATION
  sort: parseAsSort,
  size: parseAsInteger.withDefault(30),
  start: parseAsInteger.withDefault(0),

  // REQUIRED FOR SELECTION
  id: parseAsString,
};

const createSearchParamsHelper = (parser) => {
  return {
    parse: (key) => {
      const params = new URLSearchParams(window.location.search);
      const value = params.get(key);
      return value ? parser(value) : null;
    },
    
    get: (key) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(key);
    },
    
    all: () => {
      const params = new URLSearchParams(window.location.search);
      const result = {};
      params.forEach((value, key) => {
        result[key] = parser(value);
      });
      return result;
    }
  };
};
export const searchParamsCache = cache(() => createSearchParamsCache(searchParamsParser));

export const searchParamsSerializer = createSerializer(searchParamsParser);

export type SearchParamsType = inferParserType<typeof searchParamsParser>;
