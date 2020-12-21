import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/AxiosWithAuth';

const TruckList = ({ OperatorDashboard, ...props }) => {
  const { push } = useHistory();
  const starStyle = { fontSize: '20px' };
  const [truckList, setTruckList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // fetch current trucks
    console.log("FETCH USER'S FAVORITE TRUCKS");
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="truckListCardContainer">
        {truckList.map((truck) => (
          <div key={truck.id} className="truckListCard">
            <img
              src={truck.truck_photo}
              alt="truckImage"
              className="truckPictures"
              width="425px"
            />
            <div className="truckCardText">
              <Link to={`/trucks/${truck.id}`}>
                <h3 style={{ textAlign: 'center' }}>
                  Truck Name: {truck.name}
                </h3>
              </Link>
              <h4>Distance: {truck.location}</h4>
              <h5>Food Description: {truck.description}</h5>
              <h5>
                Rating: <i className="fas fa-star 8x" style={starStyle} />
                <i className="fas fa-star" style={starStyle} />
                <i className="fas fa-star" style={starStyle} />
                <i className="fas fa-star" style={starStyle} />
                <i className="far fa-star" />
              </h5>
              <h5>Price Range: {truck.price_range}</h5>

              {OperatorDashboard && (
                <>
                  <button
                    type="button"
                    color="primary"
                    // className="btn"
                    // style={buttonStyle}
                    onClick={(e) => {
                      e.preventDefault();
                      // dispatch(actions.edit_truck(truck));
                      push(`/edit-truck/${truck.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    color="danger"
                    // className="btn"
                    onClick={(e) => {
                      e.preventDefault();
                      axiosWithAuth()
                        .delete(`/trucks/${truck.id}`)
                        .then((resp) => {
                          // console.log(resp);
                          push('/operator');
                        })
                        .catch((err) => console.error(err));
                    }}
                    id={truck.id}
                    // style={buttonStyle}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TruckList;
