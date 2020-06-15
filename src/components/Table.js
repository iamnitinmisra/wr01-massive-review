import React from "react";

export default function Table(props) {
  let tableRows = <div></div>;
  console.log(props);
  if (props.response.length) {
    tableRows = props.response.map((car) => (
      <div id="vehicles" key={car.id}>
        <div className="make">{car.make}</div>
        <div className="model">{car.model}</div>
        <div className="year">{car.year}</div>
        <div className="name">{car.name}</div>
      </div>
    ));
  } else if (props.response === []) {
    tableRows = <div>No Results Found</div>;
  } else {
    tableRows = props.cars.map((car) => (
      <div id="vehicles" key={car.id}>
        <div className="make">{car.make}</div>
        <div className="model">{car.model}</div>
        <div className="year">{car.year}</div>
      </div>
    ));
  }

  return (
    <div>
      <div>Table Component</div>
      <div id="vehicle">
        <div className="make">
          <b>Make</b>
        </div>
        <div className="model">
          <b>Model</b>
        </div>
        <div className="year">
          <b>Year</b>
        </div>
        <div className="name">
          <b>Name</b>
        </div>
      </div>
      {tableRows}
    </div>
  );
}
