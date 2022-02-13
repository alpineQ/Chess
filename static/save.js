import { setCookie, getCookie } from './cookies.js';

export function getDefaultBoard() {
    return [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
}

export function saveGame(board, history) {
    setCookie("board", board.join('.'));
    setCookie("history", history.join('.'))
}

export function loadBoard() {
    let savedBoard = getCookie("board");
    if (savedBoard === "")
        return getDefaultBoard();
    let lines = savedBoard.split(".");
    let board = [];
    for (let i = 0; i < lines.length; ++i) {
        board.push(lines[i].split(','));
    }
    return board;
}

export function loadHistory() {
    let savedHistory = getCookie("history");
    if (savedHistory === "")
        return [];

    return savedHistory.split(".");
}