import { BellDotIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


const MainNav = () => {
  return (
    <header className="bg-white flex items-center  h-[100px] w-full">
        <div className="flex w-[1137px] mx-auto h-[60px] justify-end items-center">
        <div className="flex items-center  space-x-4">
             <Button variant="ghost" size="icon" className="text-[#666666]">
              <BellDotIcon className="h-7 w-7" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-9 w-9">
               <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
             </Avatar>
            <div className="text-sm">
              <div className="font-semibold text-[#2c2a29]">Jane Doe</div>
              <div className="text-[#808080]">Manager</div>
            </div>

        </div>
        </div>
    </header>
  )
}

export default MainNav;
