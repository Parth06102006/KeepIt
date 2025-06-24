import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { CirclePlus } from "lucide-react"

export function MenubarPage() {
  return (
    <Menubar className="fixed top-5 left-1/2 -translate-x-1/2 backdrop-blur-lg bg-black/10 p-2 border-4 border-green-300/70 gap-4 text-green-100">
      <MenubarMenu>
        <MenubarTrigger>Collection</MenubarTrigger>
        <MenubarContent>
            {/*Here from Collection List array , collections are received by api through fetch/axios method */}
          <MenubarItem>
            Collection List
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Create New Collection<MenubarShortcut><CirclePlus/></MenubarShortcut>
          </MenubarItem>   
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
