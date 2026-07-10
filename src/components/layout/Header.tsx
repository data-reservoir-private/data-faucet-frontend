import { Show, SignOutButton } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { LinkIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="grow w-full bg-white/5 border-b border-gray-200/20">
      <div className="flex justify-between px-4 py-3">
        {/* Title */}
        <div className="flex items-center">
          <Link to="/">
            <p className="text-xl font-bold">Admin</p>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-2">
          <Link to="/link">
            <Button variant="outline">
              <LinkIcon size={28} /> Links
            </Button>
          </Link>
          {/* <Tooltip>
            <TooltipTrigger render={<div></div>}>
              <Link to='/image'>
                <Button variant='outline'>
                  <ImageIcon size={28}/> 
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>{m.image()}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger render={<div></div>}>
              <Link to='/text'>
                <Button variant='outline'>
                  <FileTextIcon size={28}/>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>{m.text()}</TooltipContent>
          </Tooltip> */}

          <Show when="signed-in">
            <SignOutButton>
              <Button variant="success">Logout</Button>
            </SignOutButton>
          </Show>
          {/* <Show when="signed-in">
            <HeaderMenu />
          </Show> */}
        </div>
      </div>
    </div>
  );
}
