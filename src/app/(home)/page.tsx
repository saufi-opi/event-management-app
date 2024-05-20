import MaxWidthWrapper from '@/components/max-width-wrapper'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <MaxWidthWrapper className="py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Manage Your Upcoming Events</h1>
            <p className="animate-pulse text-lg text-gray-500 dark:text-gray-400">
              Simplify your event planning. Keep track of all your upcoming events hassle-free
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard/event">
                <Button>Manage Events</Button>
              </Link>
              <Link href="/dashboard/event/new">
                <Button variant="outline">Create Event</Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              alt="Events management thumbnail 1"
              src="https://img.freepik.com/premium-vector/event-management-abstract-concept-vector-illustration-corporate-party-planning-service-event-management-software-meeting-organizer-production-company-venue-design-schedule-abstract-metaphor_335657-6167.jpg?w=740"
              height={500}
              width={600}
              style={{
                aspectRatio: '600/500',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  )
}
