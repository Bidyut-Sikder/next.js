import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';


//  export const revalidate = 2;

//export const dynamic = 'force-dynamic';



export default async  function MessagesPage() {
  // unstable_noStore()


  // const response = await fetch(
  //   'http://localhost:8080/messages',
  //   {
  //     cache: 'no-store',
  //     tags:['bidyut']
  //   }
  // );
 // const messages = await response.json();

 const messages =await getMessages()

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }


  return <Messages messages={messages} />;




}  
