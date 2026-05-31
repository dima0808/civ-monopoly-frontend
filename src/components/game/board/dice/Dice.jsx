import { useEffect, useRef, useState } from 'react';
import './Dice.css';

const Dice = ({ dice }) => {
  const [showDice, setShowDice] = useState(false);
  const containerRef = useRef(null);
  const die1Ref = useRef(null);
  const die2Ref = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (dice.firstRoll !== null && dice.secondRoll !== null) {
      setShowDice(true);

      setTimeout(() => {
        if (die1Ref.current && die2Ref.current && containerRef.current) {
          die1Ref.current.classList.toggle('odd-roll');
          die1Ref.current.classList.toggle('even-roll');
          die2Ref.current.classList.toggle('odd-roll');
          die2Ref.current.classList.toggle('even-roll');

          die1Ref.current.dataset.roll = dice.firstRoll;
          die2Ref.current.dataset.roll = dice.secondRoll;
          containerRef.current.classList.add('dice-roll');
        }
      }, 100);

      timerRef.current = setTimeout(() => {
        setShowDice(false);
        if (containerRef.current) {
          containerRef.current.classList.remove('dice-roll');
        }
      }, 3500);

      return () => clearTimeout(timerRef.current);
    }
  }, [dice]);

  return (
    <div
      ref={containerRef}
      className={`dice-container${showDice ? '' : ' none'}`}
    >
      <div className="dice">
        <ol className="die-list even-roll" data-roll="1" ref={die1Ref}>
          <li className="die-item one-dot" data-side="1">
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="2">
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="3">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="4">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="5">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item die-item-6" data-side="6">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
        </ol>
        <ol className="die-list odd-roll" data-roll="1" ref={die2Ref}>
          <li className="die-item one-dot" data-side="1">
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="2">
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="3">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="4">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="5">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item die-item-6" data-side="6">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Dice;
