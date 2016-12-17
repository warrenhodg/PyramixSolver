"use strict";

var SIDES = [
    "FRONT ",
    "BOTTOM",
    "LEFT  ",
    "RIGHT "
];

var ROT_TOP     = 0;
var ROT_LEFT    = 1;
var ROT_RIGHT   = 2;
var ROT_BACK    = 3;
var ROT_TOP_r   = 4;
var ROT_LEFT_r  = 5;
var ROT_RIGHT_r = 6;
var ROT_BACK_r  = 7;

//Use this set for only the trivial corners - show usage quicker
var ROTATION_LOGIC = [
    [[8, 18, 31]], //TOP
    [[0, 13, 26]], //LEFT
    [[4, 35, 9]], //RIGHT
    [[27, 22, 17]] //BACK
];
/*
//Use this set for the true solution
var ROTATION_LOGIC = [
    [[8, 18, 31], [5, 20, 34], [6, 19, 30], [7, 23, 29]], //TOP
    [[0, 13, 26], [2, 16, 23], [1, 12, 24], [5, 11, 25]], //LEFT
    [[4, 35, 9], [7, 32, 11], [3, 33, 10], [2, 34, 14]], //RIGHT
    [[27, 22, 17], [29, 25, 14], [28, 21, 15], [32, 20, 16]] //BACK
];
*/

function PyramixPuzzle () {
    this.start();
}

PyramixPuzzle.prototype.start = function () {
    this.state = [];
    for (var i = 0; i < 36; i++) this.state.push(Math.floor(i / 9));
};

PyramixPuzzle.prototype.rotate = function (rotationType, reverse) {
    if (rotationType >= 4) {
        rotationType -= 4;
        reverse = !reverse;
    }

    var pattern = ROTATION_LOGIC [rotationType];
    for (var block in pattern) {
        if (reverse) {
            var r = this.state[pattern[block][0]];
            this.state[pattern[block][0]] = this.state[pattern[block][1]];
            this.state[pattern[block][1]] = this.state[pattern[block][2]];
            this.state[pattern[block][2]] = r;
        } else {
            var r = this.state[pattern[block][0]];
            this.state[pattern[block][0]] = this.state[pattern[block][2]];
            this.state[pattern[block][2]] = this.state[pattern[block][1]];
            this.state[pattern[block][1]] = r;
        }
    }
};

PyramixPuzzle.prototype.display = function () {
    var lines = ["", "", "", "", "", ""];

    for (var i = 0; i < 4; i++) {
        var p0 = this.state[i*9+0];
        var p1 = this.state[i*9+1];
        var p2 = this.state[i*9+2];
        var p3 = this.state[i*9+3];
        var p4 = this.state[i*9+4];
        var p5 = this.state[i*9+5];
        var p6 = this.state[i*9+6];
        var p7 = this.state[i*9+7];
        var p8 = this.state[i*9+8];

        lines[0] += "  " + SIDES [i] + "   ";
        lines[1] += "    |      ";
        lines[2] += "   /" + p8 + "\\     ";
        lines[3] += "  /" + p5 + p6 + p7 + "\\    ";
        lines[4] += " /" + p0 + p1 + p2 + p3 + p4 + "\\   ";
        lines[5] += "---------  ";
    }

    for (var i = 0; i < 6; i++) {
        console.log(lines[i]);
    }
};

PyramixPuzzle.prototype.setState = function (state) {
    for (var i = 0; i < state.length; i++) {
        this.state[i] = Number(state.substring(i, i+1));
    }
}

PyramixPuzzle.prototype.getState = function () {
    var ret = "";
    for (var i = 0; i < 36; i++) ret += this.state[i];
    return ret;
};

PyramixPuzzle.prototype.moveNames = [
    "TOP    ",
    "LEFT   ",
    "RIGHT  ",
    "BACK   ",

    "TOP_r  ",
    "LEFT_r ",
    "RIGHT_r",
    "BACK_r "
];

PyramixPuzzle.prototype.moveTypes = 8;

module.exports = PyramixPuzzle;
