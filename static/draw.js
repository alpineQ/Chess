import { setCookie } from './cookies.js';
import { getPiecesTheme } from './theme.js';
import { isWhite } from './logic.js';


export function createBoard(board) {
    let piecesTheme = getPiecesTheme();
    let piecesThemeSelector = document.getElementById("piecesThemeSelector");
    piecesThemeSelector.value = piecesTheme;
    piecesThemeSelector.onchange = (ev) => {
        piecesTheme = piecesThemeSelector.value;
        setCookie("piecesTheme", piecesTheme);
        window.location.reload();
    }

    let table = document.getElementById("table");

    for (let i = 0; i < board.length; i++) {
        let line = document.createElement("tr");
        line.style["border-width"] = "1px";
        line.style["border"] = "black";
        line.style["border-style"] = "solid";
        table.appendChild(line);
        for (let j = 0; j < board[i].length; j++) {
            let cell = document.createElement("td");
            cell.style["height"] = "40px";
            cell.style["width"] = "40px";
            if ((i + j) % 2 === 1)
                cell.style["background"] = "darkgray";
            else
                cell.style["background"] = "darkgreen";

            line.appendChild(cell);
            if (board[i][j] !== ' ')
                cell.appendChild(createPiece(board[i][j]));
        }
    }
}

function createPiece(piece) {
    let piecesTheme = getPiecesTheme();
    let img = document.createElement("img");
    img.id = piece;
    img.style["height"] = "35px";
    img.style["width"] = "35px";
    if (isWhite(piece))
        img.style["filter"] = "invert(100%)";
    switch (piece) {
        case 'Q':
        case 'q':
            img.src = "static/icons/" + piecesTheme + "/queen.png";
            break;
        case 'K':
        case 'k':
            img.src = "static/icons/" + piecesTheme + "/king.png";
            break;
        case 'B':
        case 'b':
            img.src = "static/icons/" + piecesTheme + "/bishop.png";
            break;
        case 'N':
        case 'n':
            img.src = "static/icons/" + piecesTheme + "/knight.png";
            break;
        case 'R':
        case 'r':
            img.src = "static/icons/" + piecesTheme + "/rook.png";
            break;
        case 'P':
        case 'p':
            img.src = "static/icons/" + piecesTheme + "/pawn.png";
            break;
    }
    return img;
}

export function movePiece(board, from, to) {
    let table = document.getElementById("table");
    let pieceImg = table.childNodes[from[0]].childNodes[from[1]].firstElementChild;
    pieceImg.remove();
    pieceImg = createPiece(board[to[0]][to[1]]);
    if (table.childNodes[to[0]].childNodes[to[1]].childElementCount == 1)
        table.childNodes[to[0]].childNodes[to[1]].firstElementChild.remove();
    table.childNodes[to[0]].childNodes[to[1]].appendChild(pieceImg);
}

export function selectCells(cells) {
    let table = document.getElementById("table");
    for (let i = 0; i < cells.length; i++)
        table.childNodes[cells[i][0]].childNodes[cells[i][1]].style["background"] = 'yellow';
}

export function unselectCells(cells) {
    let table = document.getElementById("table");
    for (let i = 0; i < cells.length; i++)
        if ((cells[i][0] + cells[i][1]) % 2 === 1)
            table.childNodes[cells[i][0]].childNodes[cells[i][1]].style["background"] = 'darkgray';
        else
            table.childNodes[cells[i][0]].childNodes[cells[i][1]].style["background"] = 'darkgreen';
}

export function drawHistory(movesHistory) {
    let movesHistoryElement = document.getElementById("moves");
    for (let i = 0; i < movesHistory.length; ++i) {
        if (i % 2 == 0) {
            let historyMoveElement = document.createElement("div");
            historyMoveElement.innerText = (Number.parseInt(i / 2) + 1) + ". " + movesHistory[i];
            movesHistoryElement.appendChild(historyMoveElement);
        } else {
            let historyMoveElement = movesHistoryElement.childNodes[movesHistoryElement.childElementCount - 1]
            historyMoveElement.innerText += " " + movesHistory[i];
        }

    }

}

export function appendHistory(movesHistory, piece, board, x, y) {
    let movesHistoryElement = document.getElementById("moves");
    if (movesHistory.length % 2 == 1) {
        let historyMoveElement = document.createElement("div");
        historyMoveElement.innerText = (Number.parseInt(movesHistory.length / 2) + 1) + ". " + piece + x + y;
        movesHistoryElement.appendChild(historyMoveElement);
    } else {
        let historyMoveElement = movesHistoryElement.childNodes[movesHistoryElement.childElementCount - 1]
        historyMoveElement.innerText += " " + piece + x + y;
    }
}