/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/bird.js":
      /*!*********************!*\
  !*** ./src/bird.js ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Bird)\n/* harmony export */ });\nconst CONSTANTS = {\r\n  GRAVITY: 0.3,\r\n  FLAP_SPEED: -4,\r\n  TERMINAL_VEL: 12,\r\n  BIRD_WIDTH: 50,\r\n  BIRD_HEIGHT: 50,\r\n};\r\n\r\nclass Bird {\r\n  constructor(dimensions, game) {\r\n    this.dimensions = dimensions;\r\n    this.velocity = 0;\r\n    this.x_velocity = -12;\r\n    this.x = dimensions.width / 3;\r\n    this.y = dimensions.height / 2;\r\n    this.game = game;\r\n  }\r\n\r\n  move() {\r\n    if (this.game.gameover) {\r\n      this.x += this.x_velocity;\r\n      this.x_velocity += 1;\r\n      if (this.x_velocity >= 0) {\r\n        this.x_velocity = 0;\r\n      }\r\n    }\r\n    if (this.game.started) {\r\n      this.y += this.velocity;\r\n      this.velocity += CONSTANTS.GRAVITY;\r\n    }\r\n    if (this.velocity > 12) {\r\n      this.velocity = 12;\r\n    }\r\n    if (this.velocity < -12) {\r\n      this.velocity = -12;\r\n    }\r\n    if (this.y < 0) {\r\n      this.y = 0;\r\n    }\r\n    if (this.y > this.dimensions.height - CONSTANTS.BIRD_HEIGHT) {\r\n      this.y = this.dimensions.height - CONSTANTS.BIRD_HEIGHT;\r\n    }\r\n  }\r\n\r\n  flap() {\r\n    this.velocity = CONSTANTS.FLAP_SPEED;\r\n  }\r\n\r\n  drawBird(ctx) {\r\n    // ctx.fillStyle = "yellow";\r\n    // ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\r\n    ctx.drawImage(\r\n      sprite,\r\n      Math.floor(Math.random() * 3) * 28,\r\n      486,\r\n      26,\r\n      26,\r\n      this.x,\r\n      this.y,\r\n      CONSTANTS.BIRD_WIDTH * 1.25,\r\n      CONSTANTS.BIRD_HEIGHT * 1.25\r\n    );\r\n  }\r\n\r\n  animate(ctx) {\r\n    this.move();\r\n    this.drawBird(ctx);\r\n  }\r\n\r\n  getBounds() {\r\n    const topleft = [this.x, this.y];\r\n    const bottomright = [\r\n      this.x + CONSTANTS.BIRD_WIDTH,\r\n      this.y + CONSTANTS.BIRD_HEIGHT,\r\n    ];\r\n    const bounds = [topleft, bottomright];\r\n    return bounds;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/bird.js?'
        );

        /***/
      },

    /***/ "./src/game.js":
      /*!*********************!*\
    !*** ./src/game.js ***!
    \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ FlappyBird)\n/* harmony export */ });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ "./src/level.js");\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bird */ "./src/bird.js");\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu */ "./src/menu.js");\n\r\n\r\n\r\nconst restartButton = document.getElementById("restart-button");\r\nconst birdGame = document.getElementById("bird-game");\r\nclass FlappyBird {\r\n  constructor(canvas) {\r\n    this.ctx = canvas.getContext("2d");\r\n    this.dimensions = { width: canvas.width, height: canvas.height };\r\n    this.restart();\r\n    this.registerEventListener();\r\n    this.gameover = false;\r\n    this.started = false;\r\n  }\r\n\r\n  registerEventListener() {\r\n    restartButton.addEventListener("click", () => {\r\n      this.restart();\r\n    });\r\n    birdGame.addEventListener("click", () => {\r\n      this.started = true;\r\n\r\n      if (this.gameover == false) {\r\n        this.bird.flap();\r\n      }\r\n    });\r\n    birdGame.addEventListener("click", (event) => {\r\n      if (\r\n        this.gameover &&\r\n        168 < event.x &&\r\n        event.x < 328 &&\r\n        349 < event.y &&\r\n        event.y < 387\r\n      ) {\r\n        this.restart();\r\n      }\r\n    });\r\n    birdGame.addEventListener("click", (event) => {\r\n      if (\r\n        this.gameover &&\r\n        168 < event.x &&\r\n        event.x < 328 &&\r\n        409 < event.y &&\r\n        event.y < 447\r\n      ) {\r\n        this.postScore(this.level.score);\r\n      }\r\n    });\r\n  }\r\n\r\n  postScore(score) {\r\n    fetch("/game/highscore", {\r\n      method: "POST",\r\n      headers: { "Content-Type": "application/json" },\r\n      body: JSON.stringify({ score: score, game: "flappybird" }),\r\n    }).then((res) => {\r\n      console.log("Request complete! response:", res);\r\n    });\r\n  }\r\n\r\n  click() {\r\n    this.animate();\r\n    this.bird.flap();\r\n  }\r\n\r\n  play() {\r\n    this.restart();\r\n    this.animate();\r\n  }\r\n\r\n  animate() {\r\n    this.level.animate(this.ctx);\r\n    this.bird.animate(this.ctx);\r\n    if (this.gameover) {\r\n      this.menu.animate(this.ctx);\r\n    }\r\n    if (this.level.collidesWith(this.bird.getBounds())) {\r\n      this.gameover = true;\r\n    }\r\n    if (this.running) {\r\n      requestAnimationFrame(this.animate.bind(this));\r\n    }\r\n  }\r\n\r\n  restart() {\r\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_0__["default"](this.dimensions, this);\r\n    this.bird = new _bird__WEBPACK_IMPORTED_MODULE_1__["default"](this.dimensions, this);\r\n    this.menu = new _menu__WEBPACK_IMPORTED_MODULE_2__["default"](this.dimensions, this);\r\n    this.running = true;\r\n    this.gameover = false;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/game.js?'
        );

        /***/
      },

    /***/ "./src/index.js":
      /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");\n\n\nconst canvas = document.getElementById("bird-game");\nconst sprite = document.getElementById("sprite");\nnew _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas).play();\n\n\n//# sourceURL=webpack:///./src/index.js?'
        );

        /***/
      },

    /***/ "./src/level.js":
      /*!**********************!*\
    !*** ./src/level.js ***!
    \**********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Level)\n/* harmony export */ });\nclass Level {\r\n  constructor(dimensions, game) {\r\n    this.score = 0;\r\n    this.dimensions = dimensions;\r\n    this.pipes = [\r\n      {\r\n        x: 480,\r\n        y: Math.random() * 490,\r\n        c: false,\r\n      },\r\n      {\r\n        x: 480 + 220,\r\n        y: Math.random() * 490,\r\n        c: false,\r\n      },\r\n      {\r\n        x: 480 + 220 + 220,\r\n        y: Math.random() * 490,\r\n        c: false,\r\n      },\r\n    ];\r\n    this.stars = [\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n      {\r\n        x: Math.random() * 480,\r\n        y: Math.random() * 640,\r\n      },\r\n    ];\r\n    this.game = game;\r\n  }\r\n\r\n  animate(ctx) {\r\n    this.drawBackground(ctx);\r\n    this.drawStars(ctx);\r\n    this.moveStars();\r\n    this.drawPipes(ctx);\r\n    this.movePipes();\r\n  }\r\n\r\n  drawStars(ctx) {\r\n    for (let i = 0; i < this.stars.length; i++) {\r\n      this.drawStar(ctx, this.stars[i].x, this.stars[i].y, 6, 1.0, 0.5);\r\n    }\r\n  }\r\n\r\n  movePipes() {\r\n    if (this.game.gameover) return;\r\n    const pipes = this.pipes;\r\n    this.pipes = [];\r\n    for (let i = 0; i < pipes.length; i++) {\r\n      const pipe = pipes[i];\r\n      if (pipe.x < -30) {\r\n        this.pipes.push({ x: 660, y: Math.random() * 490, c: false });\r\n      } else {\r\n        if (pipe.x - 1 < 130 && pipe.c == false) {\r\n          this.score += 1;\r\n          pipe.c = true;\r\n        }\r\n        this.pipes.push({\r\n          x: pipe.x - 1,\r\n          y: pipe.y,\r\n          c: pipe.c,\r\n        });\r\n      }\r\n    }\r\n  }\r\n\r\n  collidesWith(bounds) {\r\n    const birdTopLeft = bounds[0];\r\n    const birdBottomRight = bounds[1];\r\n    const pipes = this.pipes;\r\n    for (let i = 0; i < pipes.length; i++) {\r\n      const pipe = pipes[i];\r\n      const pipeOneTopLeft = [pipe.x, 0];\r\n      const pipeOneBottomRight = [pipe.x + 30, pipe.y];\r\n\r\n      const pipeTwoTopLeft = [pipe.x, pipe.y + 150];\r\n      const pipeTwoBottomRight = [pipe.x + 30, 640];\r\n\r\n      if (\r\n        (birdBottomRight[0] > pipeOneTopLeft[0] &&\r\n          birdTopLeft[0] < pipeOneBottomRight[0] &&\r\n          pipeOneBottomRight[1] >= birdTopLeft[1] &&\r\n          pipeOneTopLeft[1] < birdBottomRight[1]) ||\r\n        (birdBottomRight[0] > pipeTwoTopLeft[0] &&\r\n          birdTopLeft[0] < pipeTwoBottomRight[0] &&\r\n          pipeTwoBottomRight[1] >= birdTopLeft[1] &&\r\n          pipeTwoTopLeft[1] < birdBottomRight[1])\r\n      ) {\r\n        return true;\r\n      }\r\n    }\r\n    return false;\r\n  }\r\n\r\n  drawPipes(ctx) {\r\n    const pipes = this.pipes;\r\n    ctx.fillStyle = "green";\r\n    for (let i = 0; i < pipes.length; i++) {\r\n      const pipe = pipes[i];\r\n      ctx.fillRect(pipe.x, 0, 30, pipe.y);\r\n      ctx.fillRect(pipe.x, pipe.y + 150, 30, 640 - pipe.y - 150);\r\n      ctx.drawImage(sprite, 56, 330, 28, 160, pipe.x, pipe.y - 145, 30, 150);\r\n      ctx.drawImage(sprite, 84, 320, 28, 160, pipe.x, pipe.y + 150, 30, 150);\r\n      ctx.drawImage(sprite, 84, 400, 28, 1, pipe.x, 0, 30, pipe.y - 145);\r\n      ctx.drawImage(sprite, 84, 400, 28, 1, pipe.x, pipe.y + 300, 30, 490);\r\n    }\r\n  }\r\n\r\n  drawBackground(ctx) {\r\n    ctx.fillStyle = "black";\r\n    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\r\n    if (this.game.started) {\r\n      ctx.fillStyle = "white";\r\n      ctx.font = "48px serif";\r\n      ctx.fillText(\r\n        this.score,\r\n        this.dimensions.width / 2,\r\n        this.dimensions.height / 3\r\n      );\r\n    }\r\n  }\r\n\r\n  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {\r\n    var rot = (Math.PI / 2) * 3;\r\n    var x = cx;\r\n    var y = cy;\r\n    var step = Math.PI / spikes;\r\n\r\n    ctx.beginPath();\r\n    ctx.moveTo(cx, cy - outerRadius);\r\n\r\n    for (let i = 0; i < spikes; i++) {\r\n      x = cx + Math.cos(rot) * outerRadius;\r\n      y = cy + Math.sin(rot) * outerRadius;\r\n      ctx.lineTo(x, y);\r\n      rot += step;\r\n\r\n      x = cx + Math.cos(rot) * innerRadius;\r\n      y = cy + Math.sin(rot) * innerRadius;\r\n      ctx.lineTo(x, y);\r\n      rot += step;\r\n    }\r\n    ctx.lineTo(cx, cy - outerRadius);\r\n    ctx.closePath();\r\n    ctx.lineWidth = 5;\r\n    ctx.strokeStyle = "yellow";\r\n    ctx.stroke();\r\n    ctx.fillStyle = "yellow";\r\n    ctx.fill();\r\n  }\r\n\r\n  moveStars() {\r\n    if (this.game.gameover) return;\r\n\r\n    const stars = this.stars;\r\n    this.stars = [];\r\n    for (let i = 0; i < stars.length; i++) {\r\n      const star = stars[i];\r\n      if (star.x < -3) {\r\n        this.stars.push({ x: 480, y: Math.random() * 490 });\r\n      } else {\r\n        this.stars.push({\r\n          x: star.x - 0.2,\r\n          y: star.y,\r\n        });\r\n      }\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/level.js?'
        );

        /***/
      },

    /***/ "./src/menu.js":
      /*!*********************!*\
    !*** ./src/menu.js ***!
    \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Menu)\n/* harmony export */ });\nclass Menu {\r\n  constructor(dimensions, game) {\r\n    this.dimensions = dimensions;\r\n    this.game = game;\r\n  }\r\n\r\n  animate(ctx) {\r\n    this.restartButton(ctx);\r\n    this.highScoreButton(ctx);\r\n  }\r\n\r\n  restartButton(ctx) {\r\n    ctx.fillStyle = "red";\r\n\r\n    ctx.fillRect(160, 270, 160, 40);\r\n\r\n    ctx.fillStyle = "black";\r\n    ctx.font = "36px serif";\r\n    ctx.textAlign = "centre";\r\n    ctx.fillText("Restart", 160, 310, 160);\r\n  }\r\n\r\n  highScoreButton(ctx) {\r\n    ctx.fillStyle = "red";\r\n    ctx.fillRect(160, 330, 160, 40);\r\n\r\n    ctx.fillStyle = "black";\r\n    ctx.font = "36px serif";\r\n    ctx.textAlign = "centre";\r\n\r\n    ctx.fillText("High Score", 160, 370, 160);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/menu.js?'
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__("./src/index.js");
  /******/
  /******/
})();
