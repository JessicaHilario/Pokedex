import React, { Component } from "react";
import {
  Flex,
  Input,
  Card,
  Header,
  Text,
  Image,
  Label,
} from "@fluentui/react-northstar";
import "./App.css";
import Axios from "axios";
import { type, weaknesses } from "./utils/filterable.util";

class App extends Component<AppProps, AppState> {
  constructor(props: Readonly<AppProps>) {
    super(props);
    this.state = { pokeData: [], search: "", filterTypeSearch: [] };
  }

  getPokemon = () => {
    Axios.get(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then((data) => {
        this.setState({ pokeData: data.data.pokemon });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onSearch = (event: { target: { value: any } }) => {
    this.setState({ search: event.target.value });
  };
  onFilter = (event: { target: { value: any } }, field: string) => {
    console.log(event.target.value);
    var value = event.target.value;
    if (field === "type") {
      this.setState((prevState) => ({
        filterTypeSearch: !prevState.filterTypeSearch.includes(value)
          ? prevState.filterTypeSearch.concat(value)
          : prevState.filterTypeSearch,
      }));
      console.log(this.state.filterTypeSearch);
      //   var newList: string[] = [];
      //   if (!this.state.filterTypeSearch.includes(event.target.value)) {
      //     newList = this.state.filterTypeSearch.concat(event.target.value);
      //   } else {
      //     newList = this.state.filterTypeSearch.splice(
      //       this.state.filterTypeSearch.indexOf(event.target.value, 0),
      //       1
      //     );
      //   }
      //   this.setState({ filterTypeSearch: newList });
    }
  };
  componentDidMount = () => {
    this.getPokemon();
  };

  searchOnName = () => {
    return this.state.pokeData.filter((poke) =>
      poke.name.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };

  render() {
    const { search } = this.state;
    const searchData = this.searchOnName();
    const cardsDisplay = searchData.map(
      (data: {
        name: any;
        num: any;
        type: any;
        weaknesses: any;
        img: any;
        id: any;
      }) => {
        const { name, num, type, weaknesses, img, id } = data;
        return (
          <Card compact horizontal key={id} className="card">
            <Card.Preview horizontal>
              <Image
                style={{
                  height: "115px",
                  width: "115px",
                  padding: 0,
                }}
                src={img}
              />
            </Card.Preview>
            <Card.Column>
              <Card.Header>
                <Text content={name} style={{ margin: "0 0.3rem 0 0" }} />
                <Text content={num} />
              </Card.Header>
              <Card.Body>
                <Header as="h3">Type</Header>
                {type.map((t: React.ReactNode) => {
                  return (
                    <Text
                      content={t}
                      weight="light"
                      style={{ margin: "0 0.3rem 0 0" }}
                    />
                  );
                })}
                <Header as="h3">Weaknesses</Header>
                {weaknesses.map((weakness: React.ReactNode) => {
                  return (
                    <Text
                      content={weakness}
                      weight="light"
                      style={{ margin: "0 0.3rem 0 0" }}
                    />
                  );
                })}
              </Card.Body>
            </Card.Column>
          </Card>
        );
      }
    );
    return (
      <div>
        <div className="header">
          <Header as="h3" content="Pokedex" className="title" />
          <Flex gap="gap.small">
            {/*Search by name*/}
            <Input
              className="center"
              placeholder="Search Pokemon..."
              value={search}
              onChange={(event: any) => this.onSearch(event)}
            />
          </Flex>
        </div>
        <div className="body">
          <div className="panel">
            <Flex
              className="panelItem"
              style={{ float: "left", marginLeft: "5%" }}
            >
              <Label>Filter by Type</Label>
              <br />
              {type.map((t) => {
                return (
                  <label style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      name="type[]"
                      value={t}
                      onChange={(event: any) => this.onFilter(event, "type")}
                    />{" "}
                    {t}
                  </label>
                );
              })}
            </Flex>
            <Flex className="panelItem" style={{ float: "right" }}>
              <Label>Filter by Weaknesses</Label>
              <br />
              {weaknesses.map((w) => {
                return (
                  <label style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      name="weaknesses[]"
                      value={w}
                      onChange={(event: any) =>
                        this.onFilter(event, "weakness")
                      }
                    />
                    {w}
                  </label>
                );
              })}
            </Flex>
          </div>

          <Flex column gap="gap.large" className="cardDisplay">
            {/* Display cards either by search or no search */}
            {cardsDisplay}
          </Flex>
        </div>
      </div>
    );
  }
}

interface AppProps {}

interface AppState {
  pokeData: any[];
  search: string;
  filterTypeSearch: string[];
}

export default App;
