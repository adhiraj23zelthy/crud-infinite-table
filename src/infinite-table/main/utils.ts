
import {
    createParser,
    createSerializer,
    parseAsArrayOf,
    parseAsInteger,
    parseAsString,
    parseAsTimestamp,
    type inferParserType,
  } from "nuqs";
  import {
    RANGE_DELIMITER,
    SORT_DELIMITER,
  } from "../lib/delimiters";
import { z } from "zod";

const parseAsSort = createParser({
    parse(queryValue) {
      const [id, desc] = queryValue.split(SORT_DELIMITER);
      if (!id && !desc) return null;
      return { id, desc: desc === "desc" };
    },
    serialize(value) {
      return `${value.id}.${value.desc ? "desc" : "asc"}`;
    },
});

export const prepareSearchParamsParser = (filterFields: any, limit: number) =>{
    const searchParamsParser = {
        uuid: parseAsString,
        date: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
    
        // REQUIRED FOR SORTING & PAGINATION
        sort: parseAsSort,
        size: parseAsInteger.withDefault(limit),
        start: parseAsInteger.withDefault(0),
        // REQUIRED FOR SELECTION
        id: parseAsString,
    };
    filterFields.forEach(field => {
        const { value, type } = field; // Assuming field has 'value' and 'type' properties
        if (type === 'timerange') {
          searchParamsParser[value] = parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER);
        } else {
          searchParamsParser[value] = parseAsString;
        }
    });
    return searchParamsParser;
}

export const prepareColumnFilterSchema = (filterFields: any[]) =>{
    const columnFilterSchema = z.object({});

    filterFields.forEach(field => {
      const { value, type } = field; // Assuming field has 'value' and 'type' properties
      if (type === 'timerange') {
        columnFilterSchema.shape[value] = z
          .string()
          .transform((val) => val.split(RANGE_DELIMITER))
          .pipe(z.coerce.string().array().max(2))
          .optional();
      } else {
        columnFilterSchema.shape[value] = z.string().optional();
      }
    });

    return columnFilterSchema;
}