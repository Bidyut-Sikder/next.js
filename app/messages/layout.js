




// export default async function MessagesLayout({ children }) {
//   const response = await fetch('http://localhost:8080/messages', {
//     headers: {
//       'X-ID': 'laout',
//     },
//   });
//   const messages = await response.json();
//   const totalMessages = messages.length;

import { getMessages } from "@/lib/messages";

//   return (
//     <>
//       <h1>Important Messages</h1>
//       <p>{totalMessages} messages  found</p>
//       <hr />
//       {children}
//     </>
//   );
// }




























export default async  function MessagesLayout({ children }) {

  // const response = await fetch('http://localhost:8080/messages');

  // const messages = await response.json();

  // const totalMessages = messages.length;

   const messages =await getMessages()

   const totalMessages = messages.length;

   // console.log(getMessages)
  return (
    <>
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}


    </>
  );
} 
