import React from "react";
import Search from "./components/Search";
import Table from "./components/Table";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      response: [],
      lenoIsChecked: false,
      clarksonIsChecked: false,
      hammondIsChecked: false,
      // mayIsChecked: false,
      make: "Acura",
      model: "",
      year: "",
    };
  }

  componentDidMount() {
    axios.get("/api/cars").then((res) => {
      this.setState({
        cars: res.data,
      });
    });
  }

  resetTable = () => {
    this.setState({
      response: [],
    });
  };

  submitSearch = async () => {
    const {
      make,
      lenoIsChecked,
      hammondIsChecked,
      clarksonIsChecked,
      // mayIsChecked,
    } = this.state;

    const JC = "Jeremy Clarkson";
    const JL = "Jay Leno";
    const RH = "Richard Hammond";
    // const JM = 'James May'

    if (clarksonIsChecked && hammondIsChecked && lenoIsChecked) { // leno and hammond and clarkson
      console.log('1')

      const makes = await axios.get(`/api/make?make=${make}&name=${JL}&name=${RH}&name=${JC}`);
      this.setState({
        response: makes.data,
      });
    } 
    else if (!clarksonIsChecked && hammondIsChecked && lenoIsChecked) { // leno and hammond
      console.log('2')

      const makes = await axios.get(`/api/make?make=${make}&name=${JL}&name=${RH}`);
      this.setState({
        response: makes.data,
      });
    } 
    else if (clarksonIsChecked && !hammondIsChecked && lenoIsChecked) { // leno and clarkson
      console.log('3')

      const makes = await axios.get(`/api/make?make=${make}&name=${JL}&name=${JC}`);
      this.setState({
        response: makes.data,
      });
    }
    else if (clarksonIsChecked && hammondIsChecked && !lenoIsChecked) { // hammond and clarkson
      console.log('4')
      const makes = await axios.get(`/api/make?make=${make}&name=${RH}&name=${JC}`);
      this.setState({
        response: makes.data,
      });
    }
    else if (!clarksonIsChecked && !hammondIsChecked && lenoIsChecked) { // leno only
      console.log('5')
      const makes = await axios.get(`/api/make?make=${make}&name=${JL}`);
      this.setState({
        response: makes.data,
      });
    }
    else if (clarksonIsChecked && !hammondIsChecked && !lenoIsChecked) { // clarkson only
      console.log('6')
      const makes = await axios.get(`/api/make?make=${make}&name=${JC}`);
      this.setState({
        response: makes.data,
      });
    }
    else if (!clarksonIsChecked && hammondIsChecked && !lenoIsChecked) { // hammond only
      console.log('7')
      const makes = await axios.get(`/api/make?make=${make}&name=${RH}`);
      this.setState({
        response: makes.data,
      });
    }
    else {
      console.log('8')
      const makes = await axios.get(`/api/make?make=${make}&name=&name=&name=`); // no one
      this.setState({
        response: makes.data,
      });
    }
  }

  changeHandler = (name, value) => {
    if (!name) {
      name = "make";
    }

    this.setState({
      [name]: value,
    });
  };

  toggleIsChecked = (event) => {
    // console.log(event.target.checked)

    const target = event.target;
    const value = target.name === target.name ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      make,
      model,
      year,
      cars,
      response,
      clarksonIsChecked,
      lenoIsChecked,
      hammondIsChecked,
    } = this.state;

    // console.log("clarkson", this.state.clarksonIsChecked);
    // console.log("hammond", this.state.hammondIsChecked);
    // console.log("leno", this.state.lenoIsChecked);

    return (
      <div className="App">
        <h1>A List of Cars</h1>
        <Search
          changeHandler={this.changeHandler}
          submitSearch={this.submitSearch}
          resetTable={this.resetTable}
          toggleIsChecked={this.toggleIsChecked}
          cars={cars}
          make={make}
          model={model}
          year={year}
          clarksonIsChecked={clarksonIsChecked}
          lenoIsChecked={lenoIsChecked}
          hammondIsChecked={hammondIsChecked}
          // mayIsChecked={mayIsChecked}
        />
        <Table cars={cars} response={response} />
      </div>
    );
  }
}

export default App;
