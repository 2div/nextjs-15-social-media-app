"use client"

import { useSession } from "@/app/(main)/SessionProvider";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";

interface UserButtonProps{
    className?: string;
}

export default function UserButton({className}: UserButtonProps) {
    const {user} = useSession()
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="">
                <UserAvatar avatarUrl={user.avatarUrl} size={40 }  />
            </button>
        </DropdownMenuTrigger>
    </DropdownMenu>
}