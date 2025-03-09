import { useInfiniteQuery } from '@tanstack/react-query'
import { dataOptions } from '../main/query-options'

export const useSerializationData = (search: any, searchParamsSerializer: any) => {
  return useInfiniteQuery(
    dataOptions(search, searchParamsSerializer)
  )
}