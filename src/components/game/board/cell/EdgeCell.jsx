import './Cell.scss';

const EdgeCell = ({ src, alt, direction }) => {
  const positionClass = `edge__img-${direction}`;
  return (
    <div
      {...(alt === 'bermuda triangle' && { id: 'bermudaTriangle' })}
      className="board__element board__element-edge"
    >
      <img
        src={src}
        alt={alt}
        className={`edge__img ${positionClass} border`}
      />
    </div>
  );
};

export default EdgeCell;
