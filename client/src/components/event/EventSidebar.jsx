import { motion } from 'framer-motion'
import UpcomingEvents from './UpcomingEvents'
import EventLocations from './EventLocations'
import SubscriptionBox from '../general/SubscriptionBox'

const slideInVariants = {
  hidden: { opacity: 0, x: 50 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20
    }
  }
}

export default function EventSidebar({
  upcomingEvents,
  loadingUpcoming,
  formatEventTimeRange,
  getTagLabel
}) {
  return (
    <motion.aside
      variants={slideInVariants}
      className="w-full xl:w-80 xl:min-w-80 xl:flex-shrink-0 space-y-6"
    >
      {/* Upcoming Events */}
      <UpcomingEvents
        events={upcomingEvents}
        loading={loadingUpcoming}
        formatEventTimeRange={formatEventTimeRange}
        getTagLabel={getTagLabel}
      />

      {/* Event Locations */}
      <EventLocations />
      
      {/* Subscription Box */}
      <SubscriptionBox 
        title="訂閱活動通知" 
        description="第一時間收到最新活動資訊，不錯過任何一場精彩活動！" 
      />
    </motion.aside>
  )
}
