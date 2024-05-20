'use client'

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

function SocialMediaSignin() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button className="w-full" variant="outline" onClick={() => signIn('google')}>
        <Image className="mr-3" src="/login-google.png" alt="Google logo" width={20} height={20} />
        Sign in with Google
      </Button>
      <Button
        className="w-full bg-blue-500 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600"
        variant="outline"
        onClick={() => signIn('facebook')}
      >
        <Image className="mr-3" src="/login-fb.png" alt="Facebook logo" width={20} height={20} />
        Sign in with Facebook
      </Button>
    </div>
  )
}

export default SocialMediaSignin
