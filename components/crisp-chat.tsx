"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

const CrispChat = () => {

    useEffect(() => {
        Crisp.configure("37bbc681-ecf0-4feb-bed9-a925c108856b")
    }, [])

    return null
}

export default CrispChat