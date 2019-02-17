import React, { useState, useEffect } from "react";
import styles from "./Board.module.css";
import { Board, Clues } from "./";

let initialBoard = [];
for (let i = 0; i < 15; i++) {
  let row = [];
  for (let x = 0; x < 15; x++) {
    row.push(" ");
  }
  initialBoard.push(row);
}
const Workspace = () => {
  let currentClue = "1A";
  let setClue = () => "1D";

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Board
          initialBoard={initialBoard}
          currentClue={currentClue}
          setClue={setClue}
        />
        <div className={styles.clues}>
          <Clues clues={[]} setClue={setClue} currentClue={currentClue} />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
