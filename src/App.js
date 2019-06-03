import React from 'react';
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      activeTab: 0
    }
  }
  componentDidMount() {
    fetch("https://raw.githubusercontent.com/nnnkit/json-data-collections/master/got-houses.json")
    .then(results => {
      return results.json()
    }).then(data => this.setState({ data }));
  }
  handleClick = (tab) => {
    this.setState({ activeTab: tab})}

  render() {
    return (
      <div className="container">
        <DisplayHeader />
        <DisplayContent houses={this.state.data.houses} handleClick={this.handleClick} activeTab={this.state.activeTab} />
        <div className="columns is-multiline">
          {
            this.state.data.houses && this.state.data.houses[this.state.activeTab].people.map(d => <DisplayCards {...d} />)
          }
        </div>
      </div>
    );
  }

}
function DisplayHeader() {
  return (
    <section className="hero is-dark is-bold is-normal margin-bottom">
      <div className="hero-body">
        <div className="container container-header">
          <h1 className="title">
            👑 Peoples Of GOT
           </h1>
        </div>
      </div>
    </section>
  )
}

function DisplayContent(props) {
  return (
    <div className="tabs is-toggle is-toggle-rounded margin-bottom">
      <ul >
        {
          props.houses && props.houses.map((house, i) => {
            return (
              <li className={i === props.activeTab ? "is-active" : ""}>
                <a>
                  <span className="icon is-small"><i className="fas fa-image"></i></span>
                  <span onClick={() => props.handleClick(i)} >{house.name}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

function DisplayCards({name,image,description}) {
  return (
    <div className="column is-one-quarter">
    <div className="card">
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src={image} />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-4">{name}</p>
        </div>
      </div>
  
      <div className="content">{description}</div>
    </div>
  </div>
    </div>
  )
}
        
export default App;
