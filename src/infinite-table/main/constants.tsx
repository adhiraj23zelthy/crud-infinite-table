
import { type ColumnSchema } from "./schema";
import type {
  DataTableFilterField,
  SheetField,
} from "../components/data-table/types";
import { format } from "date-fns";
import type { LogsMeta } from "./query-options";


export const filterFields = [
  {
    label: "Serial Number",
    value: "serialNumber",
    type: "input",
  },
  {
    label: "Description",
    value: "description",
    type: "input",
    commandDisabled: true,
  },
  {
    label: "Manufacturing Date",
    value: "manufacturingDate",
    type: "timerange",
    commandDisabled: true,
  },
  {
    label: "Expiry Date",
    value: "expiryDate",
    type: "timerange",
    commandDisabled: true,
  },
  {
    label: "Lot Number",
    value: "lotNumber",
    type: "input",
    commandDisabled: true,
  },
  {
    label: "In Inventory Of",
    value: "inInventoryOf",
    type: "input",
    commandDisabled: true,
  },
  {
    label: "Supply Chain Status",
    value: "supplyChainStatus",
    type: "input",
    commandDisabled: true,
  },
  {
    label: "Product Status",
    value: "productStatus",
    type: "input",
    commandDisabled: true,
  },
  {
    label: "Case SSCC",
    value: "caseSSCC",
    type: "input",
    commandDisabled: true,
  },
  {
    label: "Transaction ID",
    value: "transactionID",
    type: "input",
    commandDisabled: true,
  },
  {
    label: "Invoice Date",
    value: "invoiceDate",
    type: "timerange",
    commandDisabled: true,
  },
  {
    label: "Seller",
    value: "seller",
    type: "input",
    commandDisabled: true,
  },
  {
    label: "Buyer",
    value: "buyer",
    type: "input",
    commandDisabled: true,
  },
  {
    label: "Location",
    value: "location",
    type: "input",
    commandDisabled: true,
  },
  {
    label: "Last Updated On",
    value: "lastUpdatedOn",
    type: "timerange",
    commandDisabled: true,
  },
  {
    label: "Is Reactivated",
    value: "isReactivated",
    type: "checkbox",
    options: [
      { label: "YES", value: "YES" },
      { label: "NO", value: "NO" }
    ],
    commandDisabled: true,
  }
] satisfies DataTableFilterField<ColumnSchema>[];

export const sheetFields = [
  {
    id: "serialNumber",
    label: "Serial Number",
    type: "readonly",
    skeletonClassName: "w-64",
  },
  {
    id: "description",
    label: "Description",
    type: "readonly",
    skeletonClassName: "w-64",
  },
  {
    id: "manufacturingDate",
    label: "Manufacturing Date",
    type: "timerange",
    component: (props) => format(new Date(props.manufacturingDate), "LLL dd, y"),
    skeletonClassName: "w-36",
  },
  {
    id: "expiryDate",
    label: "Expiry Date",
    type: "timerange",
    component: (props) => format(new Date(props.expiryDate), "LLL dd, y"),
    skeletonClassName: "w-36",
  },
  {
    id: "lotNumber",
    label: "Lot Number",
    type: "readonly",
    skeletonClassName: "w-24",
  },
  {
    id: "inInventoryOf",
    label: "In Inventory Of",
    type: "readonly",
    skeletonClassName: "w-36",
  },
  {
    id: "supplyChainStatus",
    label: "Supply Chain Status",
    type: "readonly",
    skeletonClassName: "w-36",
  },
  {
    id: "productStatus",
    label: "Product Status",
    type: "readonly",
    skeletonClassName: "w-36",
  },
  {
    id: "caseSSCC",
    label: "Case SSCC",
    type: "readonly",
    skeletonClassName: "w-36",
  },
  {
    id: "transactionID",
    label: "Transaction ID",
    type: "readonly",
    skeletonClassName: "w-36",
  },
  {
    id: "invoiceDate",
    label: "Invoice Date",
    type: "timerange",
    component: (props) => format(new Date(props.invoiceDate), "LLL dd, y"),
    skeletonClassName: "w-36",
  },
  {
    id: "seller",
    label: "Seller",
    type: "readonly",
    skeletonClassName: "w-36",
  },
  {
    id: "buyer",
    label: "Buyer",
    type: "readonly",
    skeletonClassName: "w-36",
  },
  {
    id: "location",
    label: "Location",
    type: "readonly",
    skeletonClassName: "w-36",
  },
  {
    id: "lastUpdatedOn",
    label: "Last Updated On",
    type: "timerange",
    component: (props) => format(new Date(props.lastUpdatedOn), "LLL dd, y HH:mm:ss"),
    skeletonClassName: "w-36",
  },
  {
    id: "isReactivated",
    label: "Is Reactivated",
    type: "readonly",
    skeletonClassName: "w-24",
  }
] satisfies SheetField<ColumnSchema, LogsMeta>[];
