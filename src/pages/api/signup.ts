'use server'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    req.method !== "POST" && res.status(400).json({msg: 'error'})

    const data = req.body

    console.log('-=-=-', data)

    res.status(200).json({msg : 'ok'})
}