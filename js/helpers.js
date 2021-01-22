
'use strict'

/// cell & neighboars sneak peak
var gSneakPeekOn = false;

function sneakPeekOn() {
    if (gLevel.hints === 0) return;
    if (!gGame.isOn) return;
    gSneakPeekOn = true;
    gLevel.hints--;

    var elLightBulbs = document.querySelector('.sneak-peek');
    if (gLevel.size === 4) {
        elLightBulbs.innerText = '✨';
        return;
    }

    if (gLevel.hints === 2) elLightBulbs.innerText = '💡💡✨'
    else if (gLevel.hints === 1) elLightBulbs.innerText = '💡✨✨'
    else elLightBulbs.innerText = '✨✨✨'
}

function showSneakPeek(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;
            var currCell = gBoard[i][j];
            if (currCell.isShown || currCell.isMarked) continue;

            if (currCell.isMine) renderCell(i, j, MINE);
            else if (currCell.minesAroundCount) renderCell(i, j, currCell.minesAroundCount);
            else renderCell(i, j, ' ');
            var elCell = document.querySelector(`.cell${i}-${j}`);
            // elCell.style = 'background-color: #d49d9d' 

            setTimeout(renderCell, 1000, i, j, ' ');
            // setTimeout(() => {
            //     elCell.style = 'background-color: #ecc1c1' //// BUG- only returns 1 to the original color ***
            // }, 1000);

        }
    }
    gSneakPeekOn = false;
}


//// *** additionally, when using elCell.classList.addClass('whatever-class'), the class's background-color will not work for some reason.
/// it will change the cell's content using color but will not change the background using background-color.