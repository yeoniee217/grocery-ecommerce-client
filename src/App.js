import React from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }


  componentDidMount() {
    fetch('/categories/all_categories').then(response => {
      return response.json();
    }).then(json => {
      this.setState({categories: json});
      return json;
    }).then(json => console.log(this.state.categories))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        Hello World
      </div>
    );
  }
}

export default App;
