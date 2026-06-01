import './Actions.scss';
import strengthImg from '../../../images/icon-strength.png';
import goldImg from '../../../images/icon-gold.png';

const ArmySpending = ({ strength, gold, isSelected, isDisabled, onClick }) => {
  return (
    <li
      className={`li-army-gold ${isSelected ? 'selected-military' : ''} ${isDisabled ? 'li-army-gold-disabled' : ''}`}
      onClick={!isDisabled ? onClick : undefined}
    >
      <div className="player-stat-strength no-select">
        <img
          src={strengthImg}
          className="recourse-img strength-recourse-img"
          alt="strength"
        />
        {strength > 0 ? `+${strength}` : strength}
      </div>
      <div className="player-stat-gold no-select">
        <img src={goldImg} className="recourse-img" alt="gold" />
        {gold > 0 ? `+${gold}` : gold}
      </div>
    </li>
  );
};

export default ArmySpending;
