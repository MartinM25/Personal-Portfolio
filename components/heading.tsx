import React from 'react'
import { Separator } from './ui/separator'

interface HeadingProps {
  title: string;
  centerHorizontally?: boolean;
}

const Heading = ({ title, centerHorizontally }: HeadingProps) => {

  const containerClassName = centerHorizontally ? "flex flex-col items-center md:items-center" : "flex flex-col items-center md:items-start";

  return (
    <div className={containerClassName}>
      <div className="flex flex-row items-center text-gray">
        <h2 className="text-2xl lg:text-3xl mb-4 font-bold tracking-tight">
          {title}
        </h2>
      </div>
    </div>
  )
}

export default Heading