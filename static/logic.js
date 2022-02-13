export function getPossibleMoves(board, cell) {
    let moves = [];
    let y = cell[0];
    let x = cell[1];
    let piece = board[y][x];
    switch (piece) {
        case 'p':
            if (isLegal(board, [y + 1, x], piece) && board[y + 1][x] === ' ')
                moves.push([y + 1, x]);
            if (y === 1 && board[y + 1][x] === ' ' && board[y + 2][x] === ' ')
                moves.push([y + 2, x]);
            if (isLegal(board, [y + 1, x + 1], piece) && board[y + 1][x + 1] !== ' ' && isWhite(board[y + 1][x + 1]))
                moves.push([y + 1, x + 1]);
            if (isLegal(board, [y + 1, x - 1], piece) && board[y + 1][x - 1] !== ' ' && isWhite(board[y + 1][x - 1]))
                moves.push([y + 1, x - 1]);
            break;
        case 'P':
            if (isLegal(board, [y - 1, x], piece) && board[y - 1][x] === ' ')
                moves.push([y - 1, x]);
            if (y === 6 && board[y - 1][x] === ' ' && board[y - 2][x] === ' ')
                moves.push([y - 2, x]);
            if (isLegal(board, [y - 1, x + 1], piece) && board[y - 1][x + 1] !== ' ' && !isWhite(board[y - 1][x + 1]))
                moves.push([y - 1, x + 1]);
            if (isLegal(board, [y - 1, x - 1], piece) && board[y - 1][x - 1] !== ' ' && !isWhite(board[y - 1][x - 1]))
                moves.push([y - 1, x - 1]);
            break;
        case 'n':
        case 'N':
            [
                [y - 2, x + 1],
                [y + 2, x + 1],
                [y - 2, x - 1],
                [y + 2, x - 1],
                [y - 1, x + 2],
                [y + 1, x + 2],
                [y - 1, x - 2],
                [y + 1, x - 2]
            ].forEach(move => {
                if (isLegal(board, move, piece))
                    moves.push(move);
            });
            break;
        case 'k':
        case 'K':
            [
                [y - 1, x],
                [y + 1, x],
                [y - 1, x + 1],
                [y + 1, x + 1],
                [y - 1, x - 1],
                [y + 1, x - 1],
                [y, x - 1],
                [y, x + 1]
            ].forEach(move => {
                if (isLegal(board, move, piece))
                    moves.push(move);
            });
            break;
        case 'q':
        case 'Q':
            moves = moves.concat(getLinearMoves(board, x, y, piece));
            moves = moves.concat(getDiagonalMoves(board, x, y, piece));
            break;
        case 'R':
        case 'r':
            moves = moves.concat(getLinearMoves(board, x, y, piece));
            break;
        case 'B':
        case 'b':
            moves = moves.concat(getDiagonalMoves(board, x, y, piece));
            break;
    }
    return moves;
}

function getLinearMoves(board, x, y, piece) {
    let moves = [];
    for (let i = 1; i < board.length; i++) {
        if (isLegal(board, [y - i, x], piece)) {
            moves.push([y - i, x]);
            if (board[y - i][x] !== ' ' && isWhite(piece) != isWhite(board[y - i][x]))
                break;
        }
        else
            break;
    }
    for (let i = 1; i < board.length; i++) {
        if (isLegal(board, [y + i, x], piece)) {
            moves.push([y + i, x]);
            if (board[y + i][x] !== ' ' && isWhite(piece) != isWhite(board[y + i][x]))
                break;
        }
        else
            break;
    }
    for (let i = 1; i < board[x].length; i++) {
        if (isLegal(board, [y, x - i], piece)) {
            moves.push([y, x - i]);
            if (board[y][x - i] !== ' ' && isWhite(piece) != isWhite(board[y][x - i]))
                break;
        }
        else
            break;
    }
    for (let i = 1; i < board[x].length; i++) {
        if (isLegal(board, [y, x + i], piece)) {
            moves.push([y, x + i]);
            if (board[y][x + i] !== ' ' && isWhite(piece) != isWhite(board[y][x + i]))
                break;
        }
        else
            break;
    }
    return moves;
}

function getDiagonalMoves(board, x, y, piece) {
    let moves = [];
    for (let i = 1; i < board.length; i++) {
        if (isLegal(board, [y - i, x - i], piece)) {
            moves.push([y - i, x - i]);
            if (board[y - i][x - i] !== ' ' && isWhite(piece) != isWhite(board[y - i][x - i]))
                break;
        }
        else
            break;
    }
    for (let i = 1; i < board.length; i++) {
        if (isLegal(board, [y + i, x - i], piece)) {
            moves.push([y + i, x - i]);
            if (board[y + i][x - i] !== ' ' && isWhite(piece) != isWhite(board[y + i][x - i]))
                break;
        }
        else
            break;
    }
    for (let i = 1; i < board[x].length; i++) {
        if (isLegal(board, [y - i, x + i], piece)) {
            moves.push([y - i, x + i]);
            if (board[y - i][x + i] !== ' ' && isWhite(piece) != isWhite(board[y - i][x + i]))
                break;
        }
        else
            break;
    }
    for (let i = 1; i < board[x].length; i++) {
        if (isLegal(board, [y + i, x + i], piece)) {
            moves.push([y + i, x + i]);
            if (board[y + i][x + i] !== ' ' && isWhite(piece) != isWhite(board[y + i][x + i]))
                break;
        }
        else
            break;
    }
    return moves;
}

function isLegal(board, move, piece) {
    if (move[0] >= 8 || move[1] >= 8 || move[0] < 0 || move[1] < 0)
        return false;
    if (board[move[0]][move[1]] === ' ')
        return true;

    return isWhite(piece) !== isWhite(board[move[0]][move[1]]);
}

export function isWhite(piece) {
    return piece.toUpperCase() === piece;
}