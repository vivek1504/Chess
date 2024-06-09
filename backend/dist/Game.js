"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Messages_1 = require("./Messages");
const zod_1 = require("zod");
const moveSchema = zod_1.z.object({
    from: zod_1.z.string(),
    to: zod_1.z.string()
});
class Game {
    constructor(player1, player2) {
        this.moves = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        try {
            moveSchema.parse(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        // validate the type using zod
        if (this.moves % 2 === 0 && socket != this.player1) {
            console.log("early error");
            return;
        }
        if (this.moves % 2 === 1 && socket != this.player2) {
            console.log("late error");
            return;
        }
        try {
            this.board.move(move);
            console.log("made move");
            console.log(this.moves);
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        if (this.moves % 2 === 0) {
            console.log("1");
            this.player2.send(JSON.stringify({
                type: Messages_1.MOVE,
                payload: move
            }));
        }
        else {
            console.log("2");
            this.player1.send(JSON.stringify({
                type: Messages_1.MOVE,
                payload: move
            }));
        }
        this.moves++;
        console.log(this.moves);
    }
}
exports.Game = Game;
