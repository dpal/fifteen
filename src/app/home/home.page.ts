import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  playerName: string;
  timer: number;
  gamesPlayed: number;
  bestTime: number;
  grid: number[][];
  cells: number[];

  constructor() {
    // Initialize variables
    this.playerName = 'Dmitri Pal';
    this.timer = 0;
    this.gamesPlayed = 0;
    this.bestTime = Infinity;
    this.cells = [0, 1, 2, 3];
    this.grid = [[1, 2, 3, 4],
                 [5, 6, 7, 8],
                 [9,10,11,12],
                 [13,14,15,0]
                ];
    this.scrambleTiles();
  }
  editName() {
    // Prompt the user for a name
    // this.playerName = prompt('Enter your name');
  }

  scrambleTiles() {
      // Create an array with numbers from 1 to 15 and one 0
      let numbers = Array.from({length: 16}, (_, i) => i === 15 ? 0 : i + 1);
  
      // Fisher-Yates shuffle algorithm
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
  
      // Fill the grid with the scrambled numbers
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          this.grid[i][j] = numbers[i * 4 + j];
        }
      }
    }
  
    moveTile(i: number, j: number) {
    // The directions to check for a neighboring empty tile
    const directions = [
      { dx: -1, dy: 0 },  // Up
      { dx: 1, dy: 0 },   // Down
      { dx: 0, dy: -1 },  // Left
      { dx: 0, dy: 1 }    // Right
    ];

    for (const { dx, dy } of directions) {
        const newX = i + dx;
        const newY = j + dy;
    
        // Check if the neighboring tile is within the grid and is empty
        if (newX >= 0 && newX < 4 && newY >= 0 && newY < 4 && this.grid[newX][newY] === 0) {
          // Swap the clicked tile with the empty tile
          [this.grid[i][j], this.grid[newX][newY]] = [this.grid[newX][newY], this.grid[i][j]];
          break;
        }
    }
  }
}
