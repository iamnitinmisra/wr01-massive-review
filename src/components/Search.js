import React from "react";

export default function Search(props) {
  //Create the options for the drop down based on makes in the database
  const carData = props.cars.map((car) => (
    <option key={car.id} value={car.make}>
      {car.make}
    </option>
  ));

  return (
    <div>
      <h3>Search by Vehicle Make and/or Owner:</h3>
      <form onSubmit={(e) => props.submitSearch(e)}>
        <div>
          <input
            type="checkbox"
            name="lenoIsChecked"
            onChange={props.toggleIsChecked}
            checked={props.lenoIsChecked}
          />
          <label htmlFor="Leno">Jay Leno</label>

          <input
            type="checkbox"
            name="clarksonIsChecked"
            onChange={props.toggleIsChecked}
            checked={props.clarksonIsChecked}
          />
          <label htmlFor="Clarkson">Jeremy Clarkson</label>

          <input
            type="checkbox"
            name="hammondIsChecked"
            onChange={props.toggleIsChecked}
            checked={props.hammonIsChecked}
          />
          <label htmlFor="Hammond">Richard Hammond</label>

          {/* <input
            type="checkbox"
            name="mayIsChecked"
            onChange={props.toggleIsChecked}
            checked={props.mayIsChecked}
          />
          <label for="May">James May</label> */}
        </div>
        <div>
          <select
            value={props.make}
            onChange={(e) => props.changeHandler(e.target.name, e.target.value)}
          >
            {carData}
          </select>

          <input
            type="button"
            value="Search"
            onClick={() => props.submitSearch()}
          />
          <input
            type="button"
            value="Reset"
            onClick={() => props.resetTable()}
          />
        </div>
      </form>
      <br />
    </div>
  );
}
