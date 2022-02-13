import { getCookie, setCookie } from './cookies.js';


export function getPiecesTheme() {
    let piecesTheme = getCookie("piecesTheme");

    if (piecesTheme === '') {
        piecesTheme = "chess_v2";
        setCookie("piecesTheme", piecesTheme);
    }

    return piecesTheme;
}