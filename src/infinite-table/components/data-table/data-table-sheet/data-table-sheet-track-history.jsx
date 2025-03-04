import React from 'react'

export const DataTableSheetTrackHistory = ({data}) => {
    console.log('data in track history', data.serialization_event)
  return (
    <div className='border border-gray-200 rounded-md mt-4'>
      <h3 className='border-b border-gray-200 p-2 font-medium'>Track History</h3>
      {
        data.serialization_event.map((event, index) => (
          <TrackHistoryCard key={index} data={event} />
        ))
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

