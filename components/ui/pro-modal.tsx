
'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge'
import { useProModal } from "@/hooks/use-pro-modal";
import { useState } from "react";
import { MessageSquare, ArrowRight, Music, ImageIcon, VideoIcon, Code, Check, Zap } from 'lucide-react'
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import axios from "axios";
import { toast } from 'react-hot-toast'



const tools = [
    {
        label: 'Conversation',
        icon: MessageSquare,
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
    },
    {
        label: 'Music Generation',
        icon: Music,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: 'text-pink-500',
        bgColor: 'bg-pink-500/10',
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
    },
    {
        label: 'Code Generation',
        icon: Code,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
    },
]

const ProModal = () => {

    const proModal = useProModal()

    const [loading, setLoading] = useState(false);


    const onSubscribe = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe')
            window.location.href = response.data.url
        } catch (error) {
            //console.log(error, 'Stripe client error');
            toast.error('Stripe client error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold text-xl">
                            Upgrade to Genius
                            <Badge variant="premium" className="uppercase text-sm py-1">pro</Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="text-center pt-2 space-y-2 text-zince-900 font-medium"
                    >
                        {
                            tools.map((tool) => (
                                <Card
                                    className="p-3 border-black/5 flex items-center justify-between"
                                    key={tool.label}>
                                    <div className="flex items-center gap-x-4">
                                        <div
                                            className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                            <tool.icon className={cn("w-6 h-6", tool.color)} />
                                        </div>
                                        <div className="font-semibold text-sm">{tool.label}</div>
                                    </div>
                                    <Check className="text-primary w-5 h-5" />
                                </Card>
                            ))
                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        disabled={loading}
                        onClick={onSubscribe} size="lg" variant="premium" className="w-full">
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProModal