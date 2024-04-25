import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ResumeButton() {
  return (
    <Link href="https://drive.google.com/file/d/195E10JOwYAuHdq785eW-8aXT82ZPEanC/view">  
      <Button className="justify-center bg-blue hover:bg-blue/90 font-KodeMono">
        Resume 
      </Button>
    </Link>
  )
}