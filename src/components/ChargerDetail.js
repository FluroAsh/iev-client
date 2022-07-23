// import { Link, useParams } from "react-router-dom"
// import { useGlobalState } from "../utils/stateContext"
// import { Card, CardContent, Typography } from "@mui/material"



// export const ChargerDetail = () => {
//     const {store} = useGlobalState()
//     const {messageList} = store
//     const params = useParams()
//     console.log(params)

//     const getMessage = (id) => {
//         return messageList.find(m => m.id === parseInt(id))
//     }

//     const message = getMessage(params.messageId)//{text: "test message", user: "Test user"}
//     return (
//         <>
//             { message ?
//                 <Card>
//                     <CardContent>
//                         <Typography variant='h5'>{message.text}</Typography>
//                         <Typography variant='p'>{message.username}</Typography>
//                         <Typography variant='p'>{message.posted}</Typography>
//                     </CardContent>    
//                 </Card>
//                 :
//                 <>
//                     <p>Message not found</p>
//                     <Link to="/messages">Go back to the main page</Link>
//                 </>
//             }
            
//         </>
//     )

// }




