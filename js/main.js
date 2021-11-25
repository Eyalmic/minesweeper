'use strict'

//SETUP

const BOMB = '💣';
const FLAG = '🚩';




// var cell = document.querySelectorAll(".cell").addEventListener('contextmenu', (e) => {
// 	e.preventDefault();
//     alert('Success');
// }, false);


var gBoard;
var gDifficulty = 'easy';
var gLevel = {
    size: 4,
    mines: 2,
}

var gGame =
{
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


//FOR REFRENCE WHILE WORKING
// var cellTemplate = {
//     cellContent: ' ',
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: true
// }


//START

//FUNCTIONS

function init() {


    gBoard = buildBoard(gLevel.size);
    placeMines(gBoard);

    //check each cell and set it's mines around count
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            setMinesNegCount(i, j, gBoard);
        }
    }

    //test flag
    // gBoard[3][3].isMarked = true;
    cellMarked(3, 3);

    //render the board
    printBoard(gBoard, '.board');
    // console.table(gBoard);


}


//gets string from buttons, changes gLevel settings
function handleDifficulty(difficulty) {
    if (difficulty === 'easy') {
        gLevel.size = 4;
        gLevel.mines = 2;
    }
    if (difficulty === 'medium') {
        gLevel.size = 8;
        gLevel.mines = 12;
    }
    if (difficulty === 'hard') {
        gLevel.size = 12;
        gLevel.mines = 30;
    }
    init();
    return;
}

function cellClicked(elCell, i, j, event) {
    // Called when a cell (td) is clicked
    // if (gBoard[i][j].isMine) checkGameOver;
    var ev = event;
    console.log(ev);

    if (ev.button === 0) {

        if (gBoard[i][j].isMine) {
            console.log('MINE');
            gBoard[i][j].isShown = true;
            renderCell(i, j, gBoard);
            return;
        }
        if (gBoard[i][j].isShown) return;
        else if (!gBoard[i][j].isShown) {
            elCell.classList.add("revealed")
            if (!gBoard[i][j].minesAroundCount) expandShown(gBoard, null, i, j);
            gBoard[i][j].isShown = true;
            // expandShown(gBoard, elCell, i, j);
            console.log(i, j, ' clicked', gBoard[i][j].isMine);
            renderCell(i, j, gBoard);
            return;
        }

    } else if (ev.button === 2){
        gBoard[i][j].isMarked = true;
        console.log('marking');
        cellMarked(i,j);
    }
    



}

function checkGameOver() {

    // Game ends when all mines are marked, and all the other cells are shown

}

// function cellMarked(elCell)

function cellMarked(i, j) {

    if (gBoard[i][j].isMarked) {
        gBoard[i][j].cellContent = FLAG;
    }
    renderCell(i, j, gBoard);

    // Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click

}



function expandShown(board, elCell, cellI, cellJ) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board.length) continue;
            board[i][j].isShown = true;
            renderCell(i, j, board);
        }
    }


    //     // NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors 

    //     // BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
    //     return;
    // }



}


function buildBoard(x = 5) {
    var board = [];
    for (var i = 0; i < x; i++) {
        board.push([]);
        for (var j = 0; j < x; j++) {
            var cell = {
                cellContent: ' ',
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            board[i][j] = cell;

        }

    }
    return board;
}


function printBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];

            if (mat[i][j].isMine) mat[i][j].isShown = false;
            if (mat[i][j].isMine && mat[i][j].isShown) mat[i][j].cellContent = BOMB;
            if (mat[i][j].isShown && !mat[i][j].isMine) mat[i][j].cellContent = mat[i][j].minesAroundCount;


            var className = 'cell cell' + i + '-' + j;
            strHTML += `<td onmousedown="cellClicked(this, ${i} , ${j}, event)"  class="` + className + '"> ' + cell.cellContent + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}


function setMinesNegCount(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) neighborsCount++;
        }
    }
    mat[cellI][cellJ].minesAroundCount = neighborsCount;
    return neighborsCount;
}


function neighboursCheckMines(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) neighborsCount++;
        }
    }
    return neighborsCount;
}



function renderCell(i, j, board, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${i}-${j}`);
    if (board[i][j].isShown) elCell.classList.add("revealed");
    if ((board[i][j].isShown) && board[i][j].isMine) {
        elCell.classList.add("mine");
        elCell.innerText = BOMB;
    }
    if (board[i][j].isMarked) elCell.innerHTML = FLAG;
    if (board[i][j].isShown && board[i][j].minesAroundCount !== 0 && !board[i][j].isMine) elCell.innerText = `${board[i][j].minesAroundCount}`;

}

function placeMines(board) {

    for (var i = 0; i < gLevel.mines; i++) {
        var randomI = getRandomInt(0, board.length);
        var randomJ = getRandomInt(0, board.length);
        board[randomI][randomJ].isMine = true;
        // console.table(board);

    }
}

