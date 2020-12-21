import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const TrucksPage = () => {
  const { push } = useHistory();
  const [truckList, setTruckList] = useState([]);

  return (
    <div className="truckPage-container">
      {truckList.map((car) => (
        <div className="truckPage-item" key={car.id}>
          <img src={car.truck_photo} alt={car.name} width="250" />
          <p>
            <b>{car.name}</b>
          </p>
          <p>Cuisine: {car.cuisine_type}</p>
          <p>{car.description}</p>
          {/* <button
                            color="danger"
                            style={{ width: 100 }}
                            onClick={() => {
                                dispatch(actions.delete_truck(car.id));
                            }}
                        >
                            Remove F
                        </button> */}
          <p>
            <button
              type="button"
              color="success"
              onClick={() => {
                push(`/trucks/${car.id}`);
              }}
            >
              Checkout!
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrucksPage;
