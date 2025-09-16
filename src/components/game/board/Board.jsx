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
  getPath,
  getPropertiesForPlacement,
  getTransform,
} from '../../../utils/game.js';
import GoodyHutCell from './cell/GoodyHutCell.jsx';
import BarbCell from './cell/BarbCell.jsx';
import { useEffect, useRef, useState } from 'react';

const STEP_DURATION = 1000; // 500ms на одну клітинку

const Board = () => {
  const propertiesConfig = useSelector((state) => state.config.properties);
  const { room } = useSelector((state) => state.room);

  // Локальний стан для відображення позицій фішок
  const [chipPositions, setChipPositions] = useState({});

  // Зберігаємо попередні позиції (щоб визначати шлях)
  const prevPositionsRef = useRef({});

  // Коли room.members змінюється — анімуємо переміщення
  useEffect(() => {
    const newPositions = {};
    room.members.forEach((member) => {
      newPositions[member.username] = member.position;
    });

    const prevPositions = prevPositionsRef.current;
    const animations = [];

    room.members.forEach((member) => {
      const prevPos = prevPositions[member.username];
      const newPos = member.position;

      if (prevPos !== undefined && prevPos !== newPos) {
        // Отримуємо шлях переміщення
        const path = getPath(prevPos, newPos);

        // Анімація: поступово оновлюємо позицію
        path.forEach((pos, stepIndex) => {
          const timeout = setTimeout(
            () => {
              setChipPositions((prev) => ({
                ...prev,
                [member.username]: pos,
              }));
            },
            STEP_DURATION * (stepIndex + 1),
          );
          animations.push(timeout);
        });
      } else {
        // Якщо новий гравець або не рухався — просто ставимо на місце
        setChipPositions((prev) => ({
          ...prev,
          [member.username]: newPos,
        }));
      }
    });

    // Запам'ятовуємо нові позиції
    prevPositionsRef.current = newPositions;

    return () => {
      animations.forEach(clearTimeout);
    };
  }, [room.members]);

  const membersByPosition = room.members.reduce((acc, member) => {
    const pos = chipPositions[member.username] ?? member.position;
    if (!acc[pos]) {
      acc[pos] = [];
    }
    acc[pos].push(member);
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
          const pos = chipPositions[member.username] ?? member.position;
          const { topValue, leftValue, orientation } = calculatePosition(pos);
          const samePositionMembers = membersByPosition[pos] || [];
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
                // transition: `top ${STEP_DURATION}ms linear, left ${STEP_DURATION}ms linear`,
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
