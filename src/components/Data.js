import React from "react";
import Search from "./components/Search";
import Table from "./components/Table";
import axios from 'axios'
import "./App.css";

class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      make: "All Cars",
      model: "",
      year: "",
    };
  }

   submitSearch = async (e) => {
    e.preventDefault()
    const {make, model, year} = this.state
    
    const results = await axios.get(`/api/make?make=${make}`)
    console.log(results)

  }

  changeHandler = (name, value) => {

    if(name===''){name = 'make'}

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { make, model, year, cars } = this.state;
    console.log("make",make)

    return (
      <div className="App">
        <h1>A Grand List of Cars</h1>
        <Search
          changeHandler={this.changeHandler}
          // submitSearch={this.submitSearch}
          cars={cars}
          make={make}
          model={model}
          year={year}
        />
        <Table />{" "}
      </div>
    );
  }
}

export default Data;
