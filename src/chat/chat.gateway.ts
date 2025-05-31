import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway(80,{})
export class ChatGateway{
    @SubscribeMessage('newMessages')
    handleNewMessage(@MessageBody() message:any){
        console.log(message);
    }
}