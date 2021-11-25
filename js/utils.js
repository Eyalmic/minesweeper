
// Getting a random integer between two values
// This example returns a random integer between the specified values. The value is no lower than min 
// (or the next integer greater than min if min isn't an integer), and is less than (but not equal to) max.

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


//create SQUARE board,
// turn on dead line to place value in cell [i][j] (z)

function buildMat(x = 5, cellContent) {
  var board = [];
  for (var i = 0; i < x; i++) {
    board.push([]);
    for (var j = 0; j < x; j++) {
      board[i][j] = cellContent;
    }
  }
  return board;
}

//counts runs on neighbours of [i][j], counts condition (LIFE) - change to what you're looking for or send as parameter???
function countNeighbors(cellI, cellJ, mat) {
  var neighborsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= mat[i].length) continue;
      if (mat[i][j] === LIFE) neighborsCount++;
      //multiple condition example:
      // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++;
    }
  }
  return neighborsCount;
}



// Recieves MAT/BOARD - Return copy of it,
// good for when you want to make changes to mat while still
// running on it

function copyMat(mat) {
  var newMat = [];
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = [];
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j];
    }
  }
  return newMat;
}


//Returns array with all empty floor tiles on gBoard
//x = what ur looking for, value of empty for example

function getEmptyCells(board, x) {
  // console.table(gBoard);
  var emptyCells = [];

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {

      if (board[i][j] === x) {
        emptyCells.push({ i, j });
      }
    }
  }
  // console.log('emptyCells: ', emptyCells);
  return emptyCells;
}


function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}



function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
