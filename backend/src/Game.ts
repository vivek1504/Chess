import { WebSocket } from "ws";
import { Chess } from "chess.js"
import { GAME_OVER, INIT_GAME, MOVE } from "./Messages";
import {z} from "zod";

const moveSchema = z.object({
    from : z.string(),
    to : z.string()
})


export class Game{
    public player1 : WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private startTime: Date;
    private moves = 0;

    constructor(player1:WebSocket, player2:WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess()
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type : INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "black"
            }
        }))
    }

    makeMove(socket:WebSocket, move:{
        from : string;
        to: string;
    }){

        try{
            moveSchema.parse(move);
        }
        catch(e){
            console.log(e)
            return;
        }   
        // validate the type using zod
        if(this.moves % 2 === 0 && socket !=this.player1){
            console.log("early error")
            return;
        }

        if(this.moves % 2 === 1 && socket !=this.player2){
            console.log("late error")
            return
        }

        try{
            this.board.move(move)
            console.log("made move")
            console.log(this.moves)
        }
        catch(e){
            console.log(e)
            return;
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.board.turn() === "w" ? "black" : "white"
                }
            }))
            this.player2.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return;
        }

        if(this.moves % 2 === 0){
            console.log("1");
            this.player2.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }
        else{
            console.log("2")
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload : move
            }))
        }
        this.moves++;
        console.log(this.moves)
    }
}