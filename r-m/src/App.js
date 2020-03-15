import React from "react";
// import logo from './logo.svg';
import "./App.css";
import "./lib/api";
import api from "./lib/api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActivo: false,
      personajes: [],
      selectedChar: {}
    };
  }

  componentDidMount() {
    api
      .getAllChars()
      .then(results => {
        this.setState({
          personajes: results
        });
      })
      .catch(e => console.error(e));
  }

  activarModal(id) {
    api.getCharacterById(id).then(p => {
      this.setState({
        modalActivo: true,
        selectedChar: p
      });
    });
  }

  desactivarModal() {
    this.setState({
      modalActivo: false
    });
  }

  renderCards(p) {
    return (
      <div key={p.id} className="Card" onClick={personaje => this.activarModal(p.id)}>
        <div className="Card-imagen">
          <figure>
            <img alt="test" src={p.image} />
          </figure>
        </div>
        <div className="Card-descripcion">
          <div className="Card-name">
            <h3>{p.name}</h3>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { modalActivo, personajes } = this.state;
    const fakeData = [0, 1, 2, 3, 4, 5, 6, 7];
    const cards = personajes.map(p => this.renderCards(p));
    console.log(cards);
    return (
      <div className="App">
        <div className="App-contenedor">
          <h1>Rick and Morty</h1>
          <div className="Cards-contenedor">{cards}</div>
          {modalActivo ? (
            <div className="Modal" onClick={e => this.desactivarModal()}>
              <div className="Card-detalle">
                <div className="Card-imagen">
                  <figure>
                    <img
                      alt={this.state.selectedChar.name}
                      src={this.state.selectedChar.image}
                    />
                  </figure>
                </div>
                <div className="Card-detalle-descripcion">
                  <div className="descripcion">
                    <h3>{this.state.selectedChar.name}</h3>
                    <div className="caracteristica">
                      <p>Status</p>
                      <p className="caracteristica-valor">{this.state.selectedChar.status}</p>
                    </div>
                    <div className="caracteristica">
                      <p>Species</p>
                      <p className="caracteristica-valor">{this.state.selectedChar.species}</p>
                    </div>
                    <div className="caracteristica">
                      <p>Gender</p>
                      <p className="caracteristica-valor">{this.state.selectedChar.gender}</p>
                    </div>
                    <div className="caracteristica">
                      <p>Origen</p>
                      <p className="caracteristica-valor">{this.state.selectedChar.origin.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
