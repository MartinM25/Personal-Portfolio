import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Contact = ({email}: {email: string}) => {

  return (
    <div className="text-center text-[#a1a1aa]">
      <p>
        Feel free to reach out anytime! Whether you have a question or simply want to chat, I'm here to respond and connect with you.
      </p>
      <Button asChild className="bg-blue w-[100px] text-foreground my-6 hover:bg-blue/90">
        <Link href={`mailto:${email}`}>
          Say Hi
        </Link>
      </Button>
    </div>
  )
}

export default Contact