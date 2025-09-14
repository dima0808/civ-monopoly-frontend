import { useEffect, useState } from 'react';
import { changeColor, getAllColors } from '../../../http/requests/game.js';
import { useDispatch, useSelector } from 'react-redux';
import { pushNotification } from '../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../constants/notification.js';
import { displayError, displayLoading } from '../../../utils/component.jsx';

const MemberChooseColor = ({ member }) => {
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.game);

  const [colors, setColors] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllColors()
      .then((data) => setColors(data.colors))
      .catch((e) => setError(e.message));
  }, []);

  const onChangeColor = (color, isChosen, isTaken) => {
    if (isChosen || isTaken) return;

    changeColor(color)
      .then()
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
  };

  const displayColors = () => {
    return colors.map((color, index) => {
      const isChosen = member.color === color;
      const isTaken = room.members.some((m) => m.color === color);
      return (
        <div
          key={index}
          onClick={() => onChangeColor(color, isChosen, isTaken)}
          className={`color-option color-${color.toLowerCase()} ${isChosen ? 'color-option--selected' : ''} ${!isChosen && isTaken ? 'color-option--used' : ''}`}
        ></div>
      );
    });
  };

  return (
    <div className="color-picker">
      <h1 className="color-picker--h1">Choose Color</h1>
      <div className="color-picker--div">
        {colors == null && !error && displayLoading()}
        {error && displayError(error)}

        {colors && displayColors()}
      </div>
    </div>
  );
};
export default MemberChooseColor;
