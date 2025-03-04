import React from 'react'

export const DataTableSheetTrackHistory = ({data}) => {
    console.log('data in track history', data.serialization_event)
  return (
   
    <div className='border border-gray-200 rounded-md mt-4'>
        {
            (data.serialization_event && data.serialization_event.length>0) ? (
                <h3 className='border-b border-gray-200 p-2 font-medium'>Track History <span className='text-gray-400 text-xs'>({data.serialization_event.length})</span></h3>

            ):(
                <h3 className='border-b border-gray-200 p-2 text-gray-500'>No Track History</h3>
            )
        }
      {
        (data.serialization_event && data.serialization_event.length>0) ? data.serialization_event.map((event, index) => (
          <TrackHistoryCard key={index} data={event} />
        )):(<></>)
      }
    </div>
  )
}

const TrackHistoryCard = ({data}) => {
  return (
    <div className='px-2 py-3 border-b border-gray-200'>
      <p className='text-md font-semibold'>Status: <span className='ml-1'>{data.serial_status}</span></p>
      <p className='text-sm'>Created At: {data.serial_status_date}</p>
    </div>
  )
}

