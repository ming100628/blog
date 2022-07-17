let index = 0
let x = 0
let y = 1
let row = 0
let column = 0
let snakeLength = 1
let snakeBody = []
let snakeFood = []
let foodNo = 10
let timer = document.querySelector('#timer')
while (snakeFood.length < foodNo) {
    let randomIndex = Math.floor(Math.random() * 100)
    if (snakeFood.indexOf(randomIndex) == -1) {
        snakeFood.push(randomIndex)
        let foodBox = document.querySelector(`[data-index='${randomIndex}']`)
        foodBox.classList.add('bg-red-900')
    }
}

let postScore = function(time) {
    fetch("/game/highscore", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ score: time, game: 'snake' })
    }).then(res => {
    console.log("Request complete! response:", res);
    })
}

var snakeStart = function () {
    snakeBody.unshift(index)

    row += y
    row %= 10
    if (row < 0) row += 10

    column += x
    column %= 10
    if (column < 0) column += 10

    index = column + (row * 10)

    if (snakeBody.indexOf(index) !== -1) {
        clearInterval(snakePlay)
        alert('Game Over!')
        return location.reload()
    }

    if (snakeBody.length > snakeLength){
        let removedIndex = snakeBody.pop()
        let removedBox = document.querySelector(`[data-index='${removedIndex}']`)
        removedBox.classList.remove('bg-black')
    }

    let nextBox = document.querySelector(`[data-index='${index}']`)
    if (nextBox.classList.contains('bg-red-900')){
        nextBox.classList.remove('bg-red-900')
        snakeLength += 1
        audioObj.play()
    }

    if (snakeLength > foodNo) {
        clearInterval(snakePlay)
        postScore(timer.innerHTML)
        alert(`You Won! ${timer.innerHTML}`)
        return location.reload()
    }
    nextBox.classList.add('bg-black')
};

setInterval(function (){
    
    timer.innerHTML = parseInt(timer.innerHTML) + 1

},1000)
var snakePlay = setInterval(snakeStart, 200)

let audioObj = new Audio('/3.wav')
audioObj.volume = 0.3
window.addEventListener("keyup", function(event) {
    if (event.key == 'ArrowUp' && y != 1){
        y = -1
        x = 0
    } else if (event.key == 'ArrowDown' && y != -1){
        y = 1
        x = 0
    } else if (event.key == 'ArrowLeft' && x != 1){
        x = -1
        y = 0
    } else if (event.key == 'ArrowRight' && x != -1){
        x = 1
        y = 0
    } else if (event.key == 'p'){
        clearInterval(snakePlay)
    } else if (event.key == 's'){
        snakePlay = setInterval(snakeStart, 200)
    }

}, true);




