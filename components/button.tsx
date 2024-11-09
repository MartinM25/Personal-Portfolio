import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ResumeButton() {
  return (
    <Link href="https://drive.google.com/file/d/1EV0F-Mk15BCbctAxH2uiiVmoUU5k0EZa/view?usp=sharing">  
      <Button className="justify-center bg-blue hover:bg-blue/90 font-KodeMono transition ease-in-out delay-150 hover:scale-110 duration-300">
        Resume 
      </Button>
      
    </Link>
  )
}
