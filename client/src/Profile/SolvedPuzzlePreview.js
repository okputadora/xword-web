import React from 'react';
import PropTypes from 'prop-types';
import Stack from '../Layouts/Stack';
import PuzzleIcon from '../Shared/PuzzleIcon';
import styles from './SolvedPuzzles.module.css';

const SolvedPuzzlesPreview = ({ puzzles }) => {
  return (
    <Stack>
      <div>
        <div className={styles.stats}>
          {/* <div>games played: {puzzles.length}</div> */}
        </div>
        <div>Recent puzzles</div>
        <div className={styles.Row}>
          {puzzles.length > 0 ? (
            puzzles.map(p => {
              // let fillPercent = 0;
              // let total = p.board.length * p
              return (
                <PuzzleIcon
                  id={p.puzzle._id}
                  key={p._id}
                  date={p.puzzle.date}
                  fillPercent={0}
                  size={50}
                />
              );
            })
          ) : (
            <div>You dont have any recent puzzles yet</div>
          )}
        </div>
      </div>
    </Stack>
  );
};

SolvedPuzzlesPreview.propTypes = {
  puzzles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      puzzle: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
      board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    }).isRequired
  ).isRequired,
};
export default SolvedPuzzlesPreview;
