import { appendHistory, createBoard, drawHistory, movePiece, selectCells, unselectCells } from './draw.js';
import { getPossibleMoves, isWhite } from './logic.js';
import { loadBoard, loadHistory, saveGame, getDefaultBoard } from './save.js';


let selectedCell = null;

let board = loadBoard();
createBoard(board);

let movesHistory = loadHistory();
drawHistory(movesHistory);

let table = document.getElementById("table");
table.onclick = (ev) => {
    let piece = '';
    let cell = null;

    switch (ev.target.tagName) {
        case "TD":
            cell = ev.target;
            if (ev.target.firstElementChild != null)
                piece = ev.target.firstElementChild.id;
            else if (selectedCell == null)
                return;
            break;
        case "IMG":
            piece = ev.target.id;
            cell = ev.target.parentElement;
            break;
        default:
            return;
    }
    let x = 0;
    let y = 0;
    for (let i = 0; i < board.length; ++i)
        for (let j = 0; j < board[i].length; ++j)
            if (table.childNodes[i].childNodes[j] === cell) {
                x = j;
                y = i;
                break;
            }

    if (selectedCell == null && (piece === ' ' || isWhite(board[y][x]) !== (movesHistory.length % 2 == 0)))
        return;

    if (selectedCell != null) {
        let possibleMoves = getPossibleMoves(board, selectedCell);
        possibleMoves.push(selectedCell);
        unselectCells(possibleMoves);
        if (selectedCell[0] === y && selectedCell[1] === x) {
            selectedCell = null;
            return;
        }
        for (let i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i][0] !== y || possibleMoves[i][1] !== x)
                continue;
            board[y][x] = board[selectedCell[0]][selectedCell[1]];
            board[selectedCell[0]][selectedCell[1]] = ' ';
            if (board[y][x] == 'P' && y == 0)
                board[y][x] = 'Q'
            if (board[y][x] == 'p' && y == 7)
                board[y][x] = 'q'
            movePiece(board, selectedCell, [y, x]);

            piece = board[y][x].toUpperCase();
            if (piece === 'P')
                piece = ''
            movesHistory.push(piece + 'abcdefgh'[x] + (board.length - y));
            appendHistory(movesHistory, piece, board, 'abcdefgh'[x], board.length - y);
            saveGame(board, movesHistory);
        }
        selectedCell = null;
        return;
    }
    if (selectedCell != null && board[selectedCell[0]][selectedCell[1]] == ' ')
        return;
    cell.style["background"] = 'red';
    selectedCell = [y, x];
    selectCells(getPossibleMoves(board, selectedCell));
};

document.getElementById("resetButton").onclick = (ev) => {
    let nTableRows = table.childElementCount;
    for (let i = 0; i < nTableRows; ++i)
        table.childNodes[0].remove();
    let movesHistoryElement = document.getElementById("moves");
    let nMovesHistory = moves.childElementCount;

    for (let i = 0; i < nMovesHistory; ++i)
        movesHistoryElement.childNodes[0].remove();
    let historyHeader = document.createElement("h3")
    historyHeader.textContent = "Moves:";
    movesHistoryElement.appendChild(historyHeader);
    movesHistory = [];

    board = getDefaultBoard();
    createBoard(board);
    saveGame(board, []);
}