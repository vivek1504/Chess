import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "../pages/Game";

export const ChessBoard = ({ chess,board, socket, setBoard }:{
    setBoard : any;
    chess: any;
    board : ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
})=>{

    const [from, setFrom] = useState<null| Square>(null);
    const [to, setTo] = useState<null | Square>(null);

    return <div className="text-white-200">
        {board.map((row,i)=>{
            return <div key={i} className="flex">
                {row.map((square,j)=> {
                    const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8-i) as Square
                    return <div onClick={()=> {
                        if(!from){
                            setFrom(squareRepresentation)
                        }else{
                            socket.send(JSON.stringify({
                                type: MOVE,
                                payload: {
                                    move: {
                                        from,
                                        to: squareRepresentation
                                    }
                                }
                            }))

                            setFrom(null)
                            chess.move({
                                from,
                                to: squareRepresentation
                            });
                            setBoard(chess.board());
                        }
                    }} key={j} className={`w-16 h-16 ${(i+j)%2 ===0 ? 'bg-green-800' : 'bg-[#f5f5dc]'}`}>
                        <div className="w-full justify-center flex h-full">
                            <div className="h-full justify-center flex flex-col ">
                                {square ? <img className="w-12" src={`/${square?.color === "b"? square?.type :  `${square?.type?.toUpperCase()} copy`}.png`}></img> : null}
                            </div>
                        </div>
                    </div>
                })} 
            </div>
        })}
    </div>
}