import { useSelector } from 'react-redux';
import PropertyCard from '../empire/PropertyCard.jsx';

const Property = ({ position, ownedProperties, propertyRequirements }) => {
  const propertiesConfig = useSelector((state) => state.config.properties);

  if (position == null || !propertiesConfig?.[position]) {
    return (
      <div className="empire-empty">
        <p>Select a property on the board.</p>
      </div>
    );
  }

  return (
    <div className="empire-list scroll">
      <PropertyCard
        position={position}
        ownedProperty={ownedProperties[position]}
        reqData={propertyRequirements[position]}
      />
    </div>
  );
};

export default Property;
