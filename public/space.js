const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const badImg = new Image()
const hurtBadImg = new Image()
const heroImg = new Image()
const explosion = new Image()
let gameStarted = false
let level = 0
let shootingCooldown = 0
let pts = 0
let time = 100
let lost = false
let won = false
let stars = []
for (let i = 0; i < 49; i += 1) {
    stars.push([getRandomInteger(300), getRandomInteger(150)])
}
heroImg.src = '/hero.png'
badImg.src = '/alien.png'
hurtBadImg.src = '/alien-hurt.png'
explosion.src = '/explosion.png'
function Explosion(x,y){
    this.x = x
    this.y = y
    this.xVel = 0
    this.yVel = 0
    this.timeIWasBorn = new Date()
    this.animate = function (){
        ctx.drawImage(explosion, this.x, this.y, 10, 10)
    }
}
function renderStars() {
    ctx.fillStyle="white"
    let newStars = []
    stars.forEach(star => {
        ctx.fillRect(star[0], star[1], 2, 2)
        if (star[1] > 150) {
            newStars.push([getRandomInteger(300), 0])
        } else {
            newStars.push([star[0], star[1] + 1])
        }
    })
    stars = newStars
}
function Hero(x, y) {
    this.x = x
    this.y = y
    this.xVel = 0
    this.yVel = 0
    this.liveCounter = 3000
    this.isHit = function (x,y) {
        if (x >= this.x && x <= this.x + 10 && y >= this.y && y <= this.y + 15){
            return true
            
        } else {
            return false
        }
    }
    this.isAlive = true
    
    this.animate = function () {
        if (this.x + this.xVel > 0 && this.x + this.xVel < 290){
            this.x = this.x + this.xVel
        }
        if (this.y + this.yVel > 80 && this.y + this.yVel < 140){
            this.y = this.y + this.yVel
        }
        ctx.drawImage(heroImg, this.x, this.y, 10, 10)
    

    }
}
let audioObj = new Audio('/explosion.wav')
function Bullet(x, y, xVel=0, yVel=0, hurtsAlien=false) {
    this.x = x
    this.y = y
    this.xVel = xVel
    this.yVel = yVel
    this.isAlive = true
    this.hurtsAlien = hurtsAlien
    

    this.animate = function () {
        ctx.beginPath()
        this.x = this.x + this.xVel
        this.y = this.y + this.yVel
        if (this.hurtsAlien) {
            ctx.fillStyle="blue"
        } else {
            ctx.fillStyle="red"
        }
        ctx.arc(this.x, this.y, 2, 0, 2*Math.PI, false)
        ctx.fill()
    }
}

function BadGuy(x,y,hp=3) {
    this.x = x
    this.y = y
    this.xVel = 0
    this.yVel = 0
    this.cd = 0
    this.isAlive = true
    this.hp = hp
    
    this.animate = function () {
        
                
           
        this.x = this.x + this.xVel
        this.y = this.y + this.yVel
        if (hp == 3){
            ctx.drawImage(badImg, this.x, this.y, 15, 15)

        } else if (hp <= 2){
            ctx.drawImage(hurtBadImg, this.x, this.y, 15, 15)
        }

    }
    this.isHit = function (x,y) {
        if (x >= this.x && x <= this.x + 15 && y >= this.y && y <= this.y + 15){
            pts += 50
            hp -= 1

            document.getElementById("pts").innerHTML = pts
            return true
        } else {
            return false
        }

    }
}
const hero1 = new Hero(150,100)
let aliens = []
let explosions = []
function generateBadGuys (r, c){
    for (let y = 0; y < r; y += 1) {
        for (let i = 0; i < c; i += 1) {
            const alien = new BadGuy(0 + i * 20, y * 20)
            aliens.push(alien)
        }
    }
}
generateBadGuys(1,1)
const alien = new BadGuy(122,122,5)
let bullets = []

window.addEventListener("keydown" , function(event) {
    console.log(event.key)
    if (hero1.isAlive == false){
        return
    }
    if (event.key == 'Enter'){
        gameStarted = true
    }
    if (event.key == 'w') {
        hero1.yVel = -2
    } else if (event.key == 'a'){
        hero1.xVel = -2
    } else if (event.key == 's'){
        hero1.yVel = 2
    } else if (event.key == 'd'){
        hero1.xVel = 2
    } else if (event.key == ' '){
        if (shootingCooldown <= 0){
            const bullet = new Bullet(hero1.x + 5, hero1.y + 5, 0, -3, true)
            shootingCooldown += 1
            bullets.push(bullet)      
        }
            
    }
})

function getRandomInteger(x){
    return Math.floor(Math.random() * x)
}
function enemyShoots() {
    const randAlien = aliens[getRandomInteger(aliens.length)]
    if (aliens.length != 0){
        if (getRandomInteger(10) == 1){
            const bullet = new Bullet(randAlien.x + 5, randAlien.y + 5, 0, 3)
            bullets.push(bullet)
        }
        

    } else {
        won = true
    }


}
let postScore = function(score) {
    fetch("/game/highscore", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ score: score, game: 'space' })
    }).then(res => {
    console.log("Request complete! response:", res);
    })
}

function gamePlay(){
    time -= 0.005
    enemyShoots()
    
    if (shootingCooldown >= 0){
        shootingCooldown -= 0.04


    }
    
    if (hero1.isAlive) {
        hero1.animate()
    }
    aliens.forEach(alien => {
        alien.animate()
    })
    if (hero1.liveCounter == 0){
        hero1.isAlive = false
    }
    aliens.forEach(alien => {
        bullets.forEach((bullet) => {
            if (bullet.hurtsAlien && alien.isHit(bullet.x, bullet.y)) {
                bullet.isAlive = false
                alien.hp = alien.hp - 1
                if (alien.hp <= 0) {
                    alien.isAlive = false
                }
                let explosion = new Explosion(alien.x, alien.y)
                explosions.push(explosion)    
                audioObj.play()
            }
            if (bullet.hurtsAlien == false && hero1.isHit(bullet.x, bullet.y)){
                
                hero1.liveCounter -= 1
                let explosion = new Explosion(hero1.x, hero1.y)
                explosions.push(explosion)
                document.getElementById("lives").innerHTML = hero1.liveCounter
                bullet.isAlive = false
                bullets = []
                audioObj.play()
                return
            }
        })
    })
    aliens.forEach(alien => {
        if (alien.x <= 10){
            alien.xVel = 2
        } else if (alien.x >= 275) {
            alien.xVel = -2
        }
        if (alien.xVel == 0){
            alien.xVel = 2
          
        }
            
    })
    explosions = explosions.filter(function(explosion){
        
        if ((new Date() - explosion.timeIWasBorn) >= 2000){
            return false
        } else {
            return true
        }
    })
    aliens = aliens.filter(alien => alien.isAlive)
    bullets = bullets.filter(bullet => bullet.isAlive)
    bullets.forEach(bullet => {
        bullet.animate()
    })
    explosions.forEach(explosion => {
        explosion.animate()
    })

    bullets = bullets.filter(function (bullet){
        if (bullet.y <= 0){
            return false
        } else if (bullet.y > 500){
            return false
        } else {
            return true
        }
    })
    if (hero1.liveCounter > 0){
        
        requestAnimationFrame(someSortOfFunction)

    } else {
        lost = true
    }
    if (won == true){
        ctx.fillStyle = "white"
        ctx.font = '48px serif';
        let points = Math.floor(pts + (time) * (hero1.liveCounter + 2) / 1.5)

        ctx.fillText('You Won', 30, 85);
        return postScore(points)
    }
    if (lost == true){
        ctx.fillStyle = "white"
        let points = Math.floor(pts + (time) * (hero1.liveCounter + 2) / 1.5)
        ctx.font = '48px serif';
        ctx.fillText('Game Over', 30, 85);
        return postScore(points)

        
    }
    if (aliens.length == 0){
        if (level == 0){
            generateBadGuys(1,5)
            level += 1
        } else if (level == 1){
            generateBadGuys(2,4)
            level += 1
        } else if (level == 2){
            generateBadGuys(3,5)
            level += 1
        }
    }
    
}

function gameIntro() {
    ctx.fillStyle = "white"
    ctx.font = '24px serif';
    
    ctx.fillText("Press 'Enter' to start", 30, 85);
    ctx.font = '48px serif'
    ctx.fillText('Some Game', 30, 55);
    requestAnimationFrame(someSortOfFunction)


}

function someSortOfFunction() {
    void ctx.clearRect(0, 0, 1000, 1000);
    if (gameStarted && won == false){
        renderStars()
        gamePlay()
    } else {
        gameIntro()
        
    }
}


someSortOfFunction()