import MaxWidthWrapper from '@/components/max-width-wrapper'
import SocialMediaSignin from '@/components/social-media-signin'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <main>
      <MaxWidthWrapper className="py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="hidden md:block">
            <Image
              alt="Events management thumbnail 2"
              src="https://img.freepik.com/free-vector/workplace-culture-abstract-concept-vector-illustration-shared-values-belief-systems-attitude-work-company-team-corporate-culture-high-performance-employee-health-abstract-metaphor_335657-6126.jpg?t=st=1716174803~exp=1716178403~hmac=fad6c10dc37647c87dbb550826ec005df9afd3135d6bc7b3760e3d220063ed7a&w=740"
              height={500}
              width={600}
              style={{
                aspectRatio: '600/500',
                objectFit: 'cover'
              }}
            />
          </div>
          <div className="space-y-4">
            <p className="text-center text-xl font-bold">Please sign in to proceed</p>
            <SocialMediaSignin />
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  )
}
