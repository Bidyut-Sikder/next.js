import { NextResponse } from "next/server"



export const middleware =  (req) => {
//console.log(req)

    return NextResponse.next()
}





// export const config={
//     // matcher: '/news'
//     matcher: ["/:path*"]
// }


