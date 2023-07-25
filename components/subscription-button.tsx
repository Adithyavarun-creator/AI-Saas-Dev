'use client'

import { Zap } from "lucide-react"
import { Button } from "./ui/button"
import axios from "axios"
import { useState } from "react"
import { toast } from 'react-hot-toast'


interface SubscriptionButtonProps {
    isPro?: boolean
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ isPro = false }) => {

    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe')

            window.location.href = response.data.url
        } catch (error) {
            // console.log('BILLING ERROR', error);
            toast.error('Billing error')
        } finally {
            setLoading(false)

        }
    }


    return (
        <Button onClick={onClick} disabled={loading} variant={isPro ? 'default' : 'premium'}>
            {isPro ? 'Manage Subscription' : 'Upgrade'}
            {!isPro &&
                <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}

export default SubscriptionButton