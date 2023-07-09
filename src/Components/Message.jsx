import React from 'react'
import{HStack,Text,Avatar} from '@chakra-ui/react'

const Message = ({text,uri,user="other"}) => {
  return (
 
        <HStack alignSelf={user=="me"?"flex-end":"flex-start"} borderRadius={"base"} bg={"gray.100"} paddingY={"2"} paddingx={"4"}>
            
            
            {
                user=="other" && <Avatar src={uri}></Avatar>
            }
            <Text padding={"3"}>{text}</Text>
            {
                user=="me" && <Avatar src={uri}></Avatar>
            }
            
            

        </HStack>
   
  )
}

export default Message