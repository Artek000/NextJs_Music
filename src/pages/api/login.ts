import type { NextApiRequest, NextApiResponse } from "next"
import jsonwebtoken from "jsonwebtoken"
import pool from "@/lib/db/db";

type ResponseData = {
    msg: string
}

const jwt = jsonwebtoken

export default function loginHandler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {

    req.method !== "GET" && res.status(400).json({msg: 'error'})

    const bodyData: ResponseData = {
        msg: jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh')
    }

    res.status(200).json(bodyData)
}