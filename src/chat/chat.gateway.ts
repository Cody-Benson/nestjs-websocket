import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket,Server } from "socket.io";

@WebSocketGateway(80,{})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server:Server;

    handleConnection(client: Socket, ...args: any[]) {
        //broadcast to everyone but the client connecting
        client.broadcast.emit('chat',`User ${client.id} has connected`);
    }

    handleDisconnect(client: Socket) {
        //broadcast to everyone but the client disconnecting
        client.broadcast.emit('chat',`User ${client.id} has disconnected`);
    }
    @SubscribeMessage('hello')
    handleNewMessage(@ConnectedSocket() client:Socket, @MessageBody() message:any){
        //this.server.emit('chat',message);
        client.broadcast.emit('chat',message);
    }

    @SubscribeMessage('goodbye')
    handleGoodByeMessage(@MessageBody() message:any){
        this.server.emit('chat',message);
    }
}