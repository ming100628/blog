console.log("hello world")

let winningIndices = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8],  [2,4,6]]

let currentPlayer = "X"

function checkIfPlayerWon(player) {
    winningIndices.forEach(indices => {
        if (indices.every(index =>
            gameState[index] == player
        )) {
            document.querySelector('#game-status').innerHTML = `${player} Won`
            anyoneWon = true
            draw()
        }
    })
}

function handleClick(event) {
    if (event.target.innerHTML != '' || anyoneWon) return
    // console.log(event.target.dataset.index)
    console.log(event.target.innerHTML)
    gameState[event.target.dataset.index] = currentPlayer

    draw()
    if (currentPlayer == "X") {
        currentPlayer = "0"
    } else {
        currentPlayer = "X"
    }
    document.querySelector('#game-status').innerHTML = `It's ${currentPlayer}'s turn`
    if (gameState.every(el => {
        return el != ''
    })) {
        document.querySelector('#game-status').innerHTML = `It's a draw`
    }

    
    checkIfPlayerWon("X")
    checkIfPlayerWon("0")

    

}
let anyoneWon = false
let gameState = ['','','','','','','','','']
function draw () {
    document.querySelectorAll('.tictactoe-cell').forEach(cell => {
        cell.innerHTML = gameState[cell.dataset.index]
    })
    
}
document.querySelectorAll('.tictactoe-cell').forEach(cell => {
    draw()
    cell.addEventListener('click', handleClick)
})

document.querySelector('#reset-game').addEventListener('click', function() {
    gameState = ['','','','','','','','','']
    draw()
    anyoneWon = false
})    