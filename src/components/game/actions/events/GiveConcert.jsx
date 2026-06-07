import goldImg from '../../../../images/icon-gold.png';
import tourismImg from '../../../../images/icon-tourism.png';
import concertImg from '../../../../images/icon_project_enhance_district_theatre_square.png';

const GiveConcert = ({
  member,
  price,
  lowerBound,
  upperBound,
  onConfirm,
  onSkip,
}) => {
  return (
    <div className="event-card project-card">
      <div className="event-card-header">Concert</div>
      <div className="event-card-body">
        <div className="event-card-grid">
          <div className="event-card-img-div">
            <img src={concertImg} className="event-card-img" alt="concert" />
          </div>
          <div className="event-card-stats">
            <p className="project-desc">
              Host a concert and gain
              <span className="event-stat-value">
                <img
                  src={tourismImg}
                  className="event-stat-icon"
                  alt="tourism"
                />
                {lowerBound}–{upperBound}
              </span>
            </p>
          </div>
        </div>
        <div className="event-card-buttons">
          <button
            disabled={member.gold < price}
            onClick={onConfirm}
            className="event-btn event-btn-buy"
          >
            buy:
            <img src={goldImg} className="event-stat-icon" alt="gold" />
            {price}
          </button>
          <button onClick={onSkip} className="event-btn event-btn-skip">
            skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiveConcert;
