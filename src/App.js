import { app } from "./firebase";
import { useState ,useEffect} from "react";
import { Box ,Container,VStack,Button,Input,HStack} from "@chakra-ui/react";
import Message from "./Components/Message";
import {GoogleAuthProvider,signInWithPopup,getAuth,onAuthStateChanged,signOut} from "firebase/auth"

import {getFirestore,addDoc,collection,serverTimestamp,onSnapshot,query,orderBy } from "firebase/firestore"
import { useRef } from "react";


//login

const auth=getAuth(app)
const database=getFirestore(app)

const loginHandler=()=>{
  const provider=new GoogleAuthProvider();

  signInWithPopup(auth,provider);
}

//logout
const logoutHandler=()=>{
  signOut(auth)
}





function App() {
  const q=query(collection(database,"messages"),orderBy("createdAt","asc"))
  const [user,setuser]=useState(false);
  const[message,setMessage]=useState("")
  const[messages,setMessages]=useState([])
  const divforscroll=useRef(null)



  const submithandler=async(e)=>{
    console.log("this is called")
    e.preventDefault();

    try{
      await addDoc(collection(database,"messages"),{
        text:message,
        uid:user.uid,
        uri:user.photoURL,
        createdAt:serverTimestamp(),
      
        
      })
      setMessage("");
      divforscroll.current.scrollIntoView({behaviour:"smooth"})
      
    }
    catch{
      alert("error")
    }

  }

 

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(data)=>{
      setuser(data);

    })

    const unsubscribeFormessage=onSnapshot(q,(snap)=>{
      setMessages(
        snap.docs.map((item)=>{
          const id=item.id;
          return{id,...item.data()}
        })
      )
    })

    return()=>{
      unsubscribe();
      unsubscribeFormessage();
    }

  },[]);

  



  return (
    <Box  h={"100vh"} bg={"lightblue"}>
      {
        user?(<Container paddingY={"4"} h={"full"} bg={"white"}>
        <VStack h={"full"} >
          <Button onClick={logoutHandler}w={"full"} bg={"red.500"}>Log out</Button>
          <VStack overflowY={"auto"} w={"full"} h={"full"} css={{"&::-webkit-scrollbar":{
            display:"none"
          }}} >
           
          {
            messages.map((item)=>(
              

              <Message key={item.id} text={item.text}
               uri={item.uri} 
               user={item.uid===user.uid?"me":"other"}/>
            ) )
          }
          
          
          


           
          <div ref={divforscroll}>

          </div>
          </VStack>

          
          <form onSubmit={submithandler}style={{width:"100%"}}>
          <HStack w={"full"}>
          <Input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={"Enter message to your loved one"}w={"full"}/>
          <Button  bg={"purple"} type="submit">send</Button>

          </HStack>
            
          </form>
          
          

        </VStack>

      </Container>
):<VStack h={"100vh"} justifyContent={"center"}>
  <Button onClick={loginHandler} bg={"purple"}  >Sign in with google</Button>
</VStack>
      }

    </Box>
    
  );
}

export default App;
