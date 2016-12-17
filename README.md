# PyramixSolver
Solver for pyramix. It works by starting with a solved cube, then performing all the non-trivial moves possible on the puzzle that result in unique states.

By performing a breadth-first search, it should find only best routes.

## Quick Run
By swapping out the various `ROTATION_LOGIC` implementations in `pyramixPuzzle.js`, one can quickly see the results of just rotating the 1-level deep corners, or rotating the 2-level deep corners.

## Usage
Because the app periodically outputs debug text to stderr, and the solutions to stdout, it it best to split them :

`node index.js > solutions.txt`

The solutions are displayed as a pair of strings of numbers representing the 36 tiles on the puzzle. The first string is the more mixed-up state, and the transition name to get to the less mixed-up state.

## Display
The string is made up of this cube folded into a pyramid :
Triangles 00 - 08 make up the front.
Triangles 09 - 17 make up the bottom.
Triangles 18 - 26 make up the left.
Triangles 27 - 35 make up the right.

```
           /\
          /26\
         /\24/\
        /23\/25\
       /\19/\21/\
      /18\/20\/22\
     /\31/\29/\27/\
    /08\/30\/28\/17\
   /\06/\34/\32/\15/\
  /05\/07\/33\/14\/16\
 /\01/\03/\35/\10/\12/\
/00\/02\/04\/09\/11\/13\
```
