import './Board.scss';

import startImg from '../../../images/corner_start.png';
import projectsImg from '../../../images/corner-projects.png';
import bermudaImg from '../../../images/corner_bermuda_triangle.png';
import SideBoard from './SideBoard.jsx';
import EdgeCell from './cell/EdgeCell.jsx';
import Chat from './chat/Chat.jsx';
import { useSelector } from 'react-redux';
import {
  calculatePosition,
  getPropertiesForPlacement,
  getTransform,
} from '../../../utils/game.js';
import GoodyHutCell from './cell/GoodyHutCell.jsx';
import BarbCell from './cell/BarbCell.jsx';

const Board = () => {
  const propertiesConfig = useSelector((state) => state.config.properties);
  const { room } = useSelector((state) => state.game);

  const membersByPosition = room.members.reduce((acc, member) => {
    if (!acc[member.position]) {
      acc[member.position] = [];
    }
    acc[member.position].push(member);
    return acc;
  }, {});

  const displayLoadingBoard = () => {
    return (
      <div className="loading">
        <p className="loading--message"> Loading...</p>
      </div>
    );
  };

  const displayBoard = () => {
    return (
      <>
        <EdgeCell src={startImg} alt="start" direction="left-up" />

        <SideBoard
          placement="up"
          properties={getPropertiesForPlacement('up', propertiesConfig)}
          uniqueCells={[<GoodyHutCell />]}
        />

        <EdgeCell src={projectsImg} alt="projects" direction="right-up" />

        <SideBoard
          placement="left"
          properties={getPropertiesForPlacement('left', propertiesConfig)}
        />

        <Chat />

        <SideBoard
          placement="right"
          properties={getPropertiesForPlacement('right', propertiesConfig)}
        />

        <EdgeCell src={projectsImg} alt="projects" direction="left-down" />

        <SideBoard
          placement="down"
          properties={getPropertiesForPlacement('down', propertiesConfig)}
          uniqueCells={[<BarbCell />]}
        />

        <EdgeCell src={bermudaImg} alt="bermuda" direction="right-down" />

        {room.members.map((member, index) => {
          const { topValue, leftValue, orientation } = calculatePosition(
            member.position,
          );
          const samePositionMembers = membersByPosition[member.position];
          const transform = getTransform(
            samePositionMembers.indexOf(member),
            samePositionMembers.length,
            orientation,
          );
          return (
            <div
              key={index}
              style={{
                top: `${topValue}px`,
                left: `${leftValue}px`,
                transform,
              }}
              className={'game-chip color-' + member.color.toLowerCase()}
            ></div>
          );
        })}
      </>
    );
  };

  return (
    <section className="board">
      {propertiesConfig ? displayBoard() : displayLoadingBoard()}
    </section>
  );
};

export default Board;
