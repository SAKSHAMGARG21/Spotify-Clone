import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import LeftSideBar from '@/components/HomePage/LeftSideBar';
import FriendsActivity from '@/components/HomePage/FriendsActivity';
import AudioPlayer from '@/components/common/AudioPlayer';


function MainLayout() {
    const [isMobile, setIsMoblie] = useState(false);
    return (
        <div className='h-screen bg-black text-white flex flex-col'>
            <ResizablePanelGroup direction="horizontal" className='flex-1 flex h-full overflow-hidden p-2 gap-[1px]' >
                {/* Left Song Area  */}
                <AudioPlayer />
                <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 20} maxSize={30}>
                    <LeftSideBar />
                </ResizablePanel>
                <ResizableHandle className='bg-black hover:bg-zinc-700 w-1' />

                {/* Main Content  */}
                <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                    <Outlet></Outlet>
                </ResizablePanel>
                <ResizableHandle className='bg-black hover:bg-zinc-700 w-1' />

                {/* Chat Box Area  */}
                <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                    <FriendsActivity />
                </ResizablePanel>
            </ResizablePanelGroup>

        </div>
    )
}

export default MainLayout