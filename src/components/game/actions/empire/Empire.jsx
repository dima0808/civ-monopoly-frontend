import './Empire.scss';
import { useSelector } from 'react-redux';
import PropertyCard from './PropertyCard.jsx';

const Empire = ({ ownedProperties, propertyRequirements }) => {
  const { user } = useSelector((state) => state.auth);
  const propertiesConfig = useSelector((state) => state.config.properties);

  const myProperties = Object.values(ownedProperties).filter(
    (p) => p.member?.username === user?.username,
  );

  if (!propertiesConfig) return null;

  if (myProperties.length === 0) {
    return (
      <div className="empire-empty">
        <p>No properties owned yet.</p>
      </div>
    );
  }

  return (
    <div className="empire-list scroll">
      {myProperties.map((property) => (
        <PropertyCard
          key={property.position}
          position={property.position}
          ownedProperty={property}
          reqData={propertyRequirements[property.position]}
        />
      ))}
    </div>
  );
};

export default Empire;
