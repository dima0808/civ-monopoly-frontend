import './Profile.scss';
import { useTranslation } from 'react-i18next';
import rankIron from '../../images/Rank_Iron.png';
import viewImg from '../../images/view-icon.png';
import { Link, useParams } from 'react-router-dom';
import { setOpenedChat, turnOnChat } from '../../store/slices/chatSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const ProfileStats = ({ user }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { username } = useParams();
  const currentUser = useSelector((state) => state.auth.user);

  const onOpenChatClick = () => {
    dispatch(turnOnChat());
    dispatch(
      setOpenedChat({
        users: [
          {
            username: currentUser.username,
          },
          {
            username: username,
          },
        ],
        messages: [],
      }),
    );
  };

  return (
    <div className="profile-right-top">
      <div className="profile-right-top-flex">
        <div className="profile-statuses">
          <h1 className="profile-right-top-h1">{username}</h1>

          {user.room?.isStarted && (
            <div className="in-game-div">
              <p className="in-game-p">{t('profile.inGame')}</p>
              <Link to="/game/sample-game" className="view-img-btn">
                <img src={viewImg} alt="viewImg" className="view-img" />
              </Link>
            </div>
          )}

          <div className="flex-ranked">
            <img src={rankIron} className="ranked-img" alt="unkownImg" />
            <p className="flex-ranked-p">{user.stats.elo}</p>
          </div>
        </div>

        <div className="profile-right-top-flex-btns">
          {currentUser?.username !== username && (
            <button
              onClick={onOpenChatClick}
              className="update-profile-btn profile-btn"
            >
              {t('profile.writeMessage')}
            </button>
          )}
          <div className="profile-right-top-btns">
            <div className="profile-statistic">
              <p className="profile-statistic-circle">
                {user.stats.gamesPlayed}
              </p>
              <p className="profile-statistic-p">{t('profile.matches')}</p>
            </div>
            <div className="profile-statistic">
              <p className="profile-statistic-circle">{user.stats.gamesWon}</p>
              <p className="profile-statistic-p">{t('profile.wins')}</p>
            </div>
            <div className="profile-statistic">
              <p className="profile-statistic-circle">
                {user.stats.averagePlace}
              </p>
              <p className="profile-statistic-p">{t('profile.average')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
