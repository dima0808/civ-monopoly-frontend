import './Maintenance.scss';
import potatoesImg from '../../images/potato-network.jpg';

const Maintenance = () => {
  return (
    <div>
      <div className="gradiant-violet tech-problems-up">
        <img
          className="potato-network"
          src={potatoesImg}
          alt="potato-network"
        />
      </div>
      <div className="gradiant-violet-reverse tech-problems-down">
        <h1>There's might be some technical issues</h1>
        <p>Some potatoes have rotted and need to be replaced</p>
      </div>
    </div>
  );
};
export default Maintenance;
