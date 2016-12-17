"use strict";

var Loki = require('lokijs');
var PyramixPuzzle = require('./pyramixPuzzle');

function Scrambler () {
    console.log("Scrambler");
    this.db = new Loki();
    this.c = this.db.addCollection("states", {indices: ["state"]});
    this.puzzle = new PyramixPuzzle();
}

Scrambler.prototype.run = function () {
    var first = this.c.insert({
        state: this.puzzle.getState(),
        level: 0,
        previous: null
    });

    var q = [first];
    var turn = 0;
    var moveTypes = this.puzzle.moveTypes;
    var level = 0;

    while (q.length > 0) {
        var current = q.shift();
        if (current.level != level) {
            level = current.level;
            console.error(new Date().toLocaleString() + " : Now at depth " + level);
        }

        for (var i = 0; i < moveTypes; i++) {
            this.puzzle.setState (current.state);
            this.puzzle.rotate(i, false);

            var newState = this.puzzle.getState();
            var found = this.c.findOne({state: newState});

            if (!found) {
                var inserted = this.c.insert({
                    state: newState,
                    level: current.level + 1,
                    previous: current,
                    move: i
                });

                q.push(inserted);
            }

        }

        turn += moveTypes;
        if (turn % 1000 === 0) console.error(new Date().toLocaleString() + " : Turn: " + turn + " states: " + this.c.count());
    }
};

Scrambler.prototype.display = function() {
    var _ = this;

    this.c.where(function (item) {
        if (item.previous) {
            console.log(item.state + " " + _.puzzle.moveNames[(item.move + 4) % 8] + " " + item.previous.state);
        } else {
            console.log(item.state);
        }
        return false;
    })
};

module.exports = Scrambler;
