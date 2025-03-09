import React from 'react'
import { 
  FaShippingFast, FaBox, FaTruck, FaCheck, FaGlobe, 
  FaWarehouse, FaClipboardCheck, FaRecycle, FaThumbsUp,
  FaTrash, FaClock, FaShip, FaUndo, FaRegCircle
} from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { SiTicktick } from 'react-icons/si'

const ActiveIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <g stroke="#02B426" strokeWidth={0.875} clipPath="url(#a)">
      <path d="M12.833 7A5.833 5.833 0 1 0 1.167 7a5.833 5.833 0 0 0 11.666 0Z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.667 7.292 6.125 8.75l3.208-3.5"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
)

const DecommissionedIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <g stroke="#E11F1F" strokeWidth={0.875} clipPath="url(#a)">
      <path d="M12.833 7A5.833 5.833 0 1 0 1.167 7a5.833 5.833 0 0 0 11.666 0Z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.667 7.292 6.125 8.75l3.208-3.5"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
)

const CommissionedIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_710_515)">
<path d="M12.8334 6.99996C12.8334 3.7783 10.2217 1.16663 7.00008 1.16663C3.77842 1.16663 1.16675 3.7783 1.16675 6.99996C1.16675 10.2216 3.77842 12.8333 7.00008 12.8333C10.2217 12.8333 12.8334 10.2216 12.8334 6.99996Z" stroke="#02B426" stroke-width="0.875"/>
<path d="M4.66675 7.29167L6.12508 8.75L9.33341 5.25" stroke="#02B426" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_710_515">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>

)

const ConsumedIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* SVG will be pasted here */}
  </svg>
)

const InactiveIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* SVG will be pasted here */}
  </svg>
)

const DeliveredIcon = (props) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={14}
  height={14}
  fill="none"
  {...props}
>
  <path
    stroke="#02B426"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={0.875}
    d="M12.25 4.083V7M1.75 4.083v5.928c0 .806 1.135 1.286 3.405 2.245.912.385 1.368.577 1.845.577v-6.21M8.75 11.083s.51 0 1.02 1.167c0 0 1.622-2.917 3.063-3.5"
  />
  <path
    stroke="#02B426"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={0.875}
    d="M4.857 5.653 3.153 4.83c-.935-.453-1.403-.68-1.403-1.037 0-.359.468-.585 1.403-1.037l1.704-.825C5.908 1.421 6.434 1.167 7 1.167c.566 0 1.092.254 2.143.763l1.704.825c.935.452 1.403.678 1.403 1.037 0 .358-.468.584-1.403 1.037l-1.704.824c-1.051.51-1.577.764-2.143.764-.566 0-1.092-.255-2.143-.764ZM3.5 7l1.167.583M9.917 2.333 4.083 5.25"
  />
</svg>
)

const ReturnedIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#E11F1F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.875}
      d="M1.75 7.583V4.667h10.5v2.916c0 2.2 0 3.3-.683 3.983-.684.684-1.784.684-3.984.684H6.417c-2.2 0-3.3 0-3.984-.684-.683-.683-.683-1.783-.683-3.983Z"
    />
    <path
      stroke="#E11F1F"
      strokeLinecap="round"
      strokeWidth={0.875}
      d="m1.75 4.667.505-1.122c.391-.87.587-1.305.984-1.55.397-.245.906-.245 1.923-.245h3.676c1.017 0 1.526 0 1.923.245s.593.68.984 1.55l.505 1.122M7 4.667V1.75"
    />
    <path
      stroke="#E11F1F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.875}
      d="M4.958 7.875h3.209a1.167 1.167 0 1 1 0 2.333h-.584m-1.75-3.5L4.667 7.875l1.166 1.167"
    />
  </svg>
)

const DisposedIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#E11F1F"
      strokeLinecap="round"
      strokeWidth={0.875}
      d="M1.896 2.917h3.167c.39 0 .754-.195.97-.52l.475-.71c.216-.325.58-.52.97-.52h2.619c.502 0 .947.321 1.106.797l.318.953m.875 0H4.812M11.52 2.917l-.36 5.778-.037.535M2.771 2.917l.352 5.773c.09 1.408.136 2.112.51 2.618.185.25.424.462.7.62.56.322 1.31.322 2.808.322h1.463"
    />
    <path
      stroke="#E11F1F"
      strokeWidth={0.875}
      d="M11.813 11.083a1.75 1.75 0 1 0-3.5 0 1.75 1.75 0 0 0 3.5 0Z"
    />
  </svg>
)

const StagedIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#0066DA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.875}
      d="M12.25 4.083V7M1.75 4.083v5.928c0 .806 1.135 1.286 3.405 2.245.912.385 1.368.577 1.845.577v-6.21M8.75 11.083s.51 0 1.02 1.167c0 0 1.622-2.917 3.063-3.5"
    />
    <path
      stroke="#0066DA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.875}
      d="M4.857 5.653 3.153 4.83c-.935-.453-1.403-.68-1.403-1.037 0-.359.468-.585 1.403-1.037l1.704-.825C5.908 1.421 6.434 1.167 7 1.167c.566 0 1.092.254 2.143.763l1.704.825c.935.452 1.403.678 1.403 1.037 0 .358-.468.584-1.403 1.037l-1.704.824c-1.051.51-1.577.764-2.143.764-.566 0-1.092-.255-2.143-.764ZM3.5 7l1.167.583M9.917 2.333 4.083 5.25"
    />
  </svg>

)

const OutForDeliveryIcon = (props) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={14}
  height={14}
  fill="none"
  {...props}
>
  <path
    stroke="#FF6A00"
    strokeWidth={0.875}
    d="M11.375 10.208a1.458 1.458 0 1 1-2.917 0 1.458 1.458 0 0 1 2.917 0ZM5.542 10.208a1.458 1.458 0 1 1-2.917 0 1.458 1.458 0 0 1 2.917 0Z"
  />
  <path
    stroke="#FF6A00"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={0.875}
    d="M8.458 10.208H5.542m5.833 0h.445c.129 0 .193 0 .247-.006a.875.875 0 0 0 .76-.76c.006-.054.006-.118.006-.247V7.583a3.792 3.792 0 0 0-3.791-3.791M1.167 2.333H7c.825 0 1.238 0 1.494.257.256.256.256.668.256 1.493v4.959M1.167 7.438V8.75c0 .545 0 .818.117 1.02a.874.874 0 0 0 .32.321c.203.117.476.117 1.021.117M1.167 4.083h3.5m-3.5 1.75H3.5"
  />
</svg>
)

const ExpiredIcon = (props) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={14}
  height={14}
  fill="none"
  {...props}
>
  <path
    stroke="#E11F1F"
    strokeWidth={0.875}
    d="M3.104 5.648c1.408-2.491 2.112-3.737 3.078-4.057a2.593 2.593 0 0 1 1.636 0c.966.32 1.67 1.566 3.078 4.057 1.408 2.492 2.112 3.737 1.9 4.752a2.717 2.717 0 0 1-.817 1.447c-.755.695-2.163.695-4.979.695-2.816 0-4.224 0-4.979-.695a2.718 2.718 0 0 1-.817-1.447c-.212-1.015.492-2.26 1.9-4.752Z"
  />
  <path
    stroke="#E11F1F"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.167}
    d="M6.995 9.333h.006"
  />
  <path
    stroke="#E11F1F"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={0.875}
    d="M7 7.583V5.25"
  />
</svg>
)

const ShippedIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <g
      stroke="#FF6A00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.875}
      clipPath="url(#a)"
    >
      <path d="M7.583 12.833c-.477 0-.933-.199-1.845-.597-1.064-.464-1.879-.82-2.444-1.153H1.167m6.416 1.75c.478 0 .934-.199 1.846-.597 2.27-.99 3.404-1.486 3.404-2.32V3.793m-5.25 9.041V6.417m-5.25-2.625v1.75" />
      <path d="M5.44 5.653 3.736 4.83c-.935-.453-1.403-.679-1.403-1.037 0-.359.468-.585 1.403-1.037L5.44 1.93c1.052-.509 1.578-.763 2.143-.763.566 0 1.092.254 2.143.763l1.704.825c.936.452 1.403.678 1.403 1.037 0 .358-.467.584-1.402 1.037l-1.705.824c-1.051.51-1.577.764-2.143.764-.565 0-1.091-.255-2.143-.764ZM10.58 2.343 4.59 5.24M1.167 7.583h1.75M1.167 9.333h1.75" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
)

const ArrivingInIndiaIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#0066DA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.875}
      d="m2.577 6.952 1.937-1.179c.325-.198.488-.296.6-.432.486-.586.058-1.452.13-2.134.075-.706.749-1.672 1.427-1.971a.816.816 0 0 1 .657 0c.68.3 1.352 1.265 1.427 1.97.073.683-.355 1.549.13 2.135.113.136.275.234.6.432l1.938 1.18c.593.36.827.745.827 1.47 0 .395-.175.5-.527.42l-3.397-.778L8.173 9.4c-.055.485-.083.727-.003.948.187.52.823.945 1.212 1.323.215.208.449.809.204 1.082-.151.168-.397.031-.566-.034l-1.626-.633c-.195-.076-.292-.114-.394-.114-.102 0-.2.038-.394.114l-1.627.633c-.169.065-.414.202-.565.034-.245-.273-.01-.874.204-1.082.388-.378 1.024-.803 1.212-1.323.08-.221.052-.463-.003-.948l-.153-1.335-3.397.778c-.353.08-.527-.026-.527-.42 0-.725.234-1.11.827-1.47Z"
    />
  </svg>
)

const getStatusIcon = (status) => {
  const iconMap = {
    'Decommissioned': { 
      icon: DecommissionedIcon, 
      bgColor: 'bg-[#FCE9E9]', 
      textColor: 'text-[#E11F1F]' 
    },
    'Commissioned': { 
      icon: CommissionedIcon, 
      bgColor: 'bg-[#E3FBE8]', 
      textColor: 'text-[#02B426]' 
    },
    'Consumed': { 
      icon: ConsumedIcon, 
      bgColor: 'bg-[#FCE9E9]', 
      textColor: 'text-[#E11F1F]' 
    },
    'Active': { 
      icon: ActiveIcon, 
      bgColor: 'bg-[#E3FBE8]', 
      textColor: 'text-[#02B426]' 
    },
    'Inactive': { 
      icon: InactiveIcon, 
      bgColor: 'bg-gray-500', 
      textColor: 'text-black' 
    },
    'Delivered': { 
      icon: DeliveredIcon, 
      bgColor: 'bg-[#E3FBE8]', 
      textColor: 'text-[#02B426]' 
    },
    'Returned': { 
      icon: ReturnedIcon, 
      bgColor: 'bg-[#FCE9E9]', 
      textColor: 'text-[#E11F1F]' 
    },
    'Disposed': { 
      icon: DisposedIcon, 
      bgColor: 'bg-[#FCE9E9]', 
      textColor: 'text-[#E11F1F]' 
    },
    'Staged': { 
      icon: StagedIcon, 
      bgColor: 'bg-[#E8F3FF]', 
      textColor: 'text-[#0066DA]' 
    },
    'Out for Delivery': { 
      icon: OutForDeliveryIcon, 
      bgColor: 'bg-[#FFF5E8]', 
      textColor: 'text-[#FF6A00]' 
    },
    'Expired': { 
      icon: ExpiredIcon, 
      bgColor: 'bg-[#FCE9E9]', 
      textColor: 'text-[#E11F1F]' 
    },
    'Shipped': { 
      icon: ShippedIcon, 
      bgColor: 'bg-[#FFF5E8]', 
      textColor: 'text-[#FF6A00]' 
    },
    'Arriving in India': { 
      icon: ArrivingInIndiaIcon, 
      bgColor: 'bg-[#E8F3FF]', 
      textColor: 'text-[#0066DA]' 
    },
    'default': { 
      icon: FaCheck, 
      bgColor: 'bg-blue-500', 
      textColor: 'text-blue-700' 
    }
  }
  return iconMap[status] || iconMap['default']
}

export const DataTableSheetTrackHistory = ({data}) => {
  console.log('data in track history', data.serialization_event)
  return (
    <div className='rounded-md mt-4'>
      {
        (data.serialization_event && data.serialization_event.length > 0) ? (
          <h3 className='p-2 font-medium'>
            Product Journey <span className='text-gray-400 text-xs'>({data.serialization_event.length} events)</span>
          </h3>
        ) : (
          <h3 className='p-2 text-gray-500'>No Track History</h3>
        )
      }
      <div className='relative pt-1 ml-1'>
        {/* {data.serialization_event && data.serialization_event.length > 0 && (
          <div className='absolute top-0 bottom-0 w-1 bg-gray-200 left-5'></div>
        )} */}
        {data.serialization_event?.map((eventGroup, index) => (
          <TimelineEvent 
            key={index} 
            events={eventGroup} 
            isLast={index === data.serialization_event.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

const TimelineEvent = ({ events, isLast }) => {
  // Find the status event to use for icon and styling
  const statusEvent = events.find(event => event.label.toLowerCase().includes('status')) || events[0]
  const { icon: Icon, bgColor, textColor } = getStatusIcon(statusEvent?.value)

  return (
    <div className='relative flex items-center mb-3 bg-[#fefefe] rounded-md shadow-sm'>
      {/* Left Side: Icon and Status */}
      <div className='w-24 flex flex-col items-center justify-center mr-2 pt-2'>
        <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center mb-1`}>
          <Icon className={`text-white w-4 h-4 ${textColor}`} />
        </div>
        {events.find(event => event.label == 'Status') && (
          <p className={`text-[10px] text-center font-semibold ${textColor}`}>
            {events.find(event => event.label == 'Status')?.value}
          </p>
        )}
      </div>

      {/* Right Side: Event Details */}
      <div className='flex-1 p-3'>
        {events.map((event, index) => {
          return (
          <div key={index} className='mb-1 last:mb-0'>
            {
              (event.label=='Status') ? null : (
                <p className='text-xs'>
                  <span className={`${event.label == 'Date' ? 'text-black font-semibold' : 'text-gray-600'}`}>
                    {event.value}
                  </span>
                </p>
              )
            }
          </div>
        )})}
      </div>
    </div>
  )
}
