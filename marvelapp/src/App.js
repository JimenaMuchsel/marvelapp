import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Character from "./components/Character";
import Comics from "./components/Comics";
import ComicDescription from "./components/ComicDescription";
import axios from "axios";
import Marvel_Comics_logo from "./assets/Marvel_Comics_logo.svg";

//Public and Private Keys
// Private Key 26259d5f1153c5f9f8d0e8bcbc9a0907cb15b4a1 is hashed with Md5 (ts + Private Key + Public Key)
const API_KEY_Public = "cc67371d906b5819805dc9d3b2000689";
const API_KEY_Private = "002a8455ab9ae3861ea65519da3d9b3c";

//Example url: http://gateway.marvel.com/v1/public/characters?ts=1&apikey=cc67371d906b5819805dc9d3b2000689&hash=002a8455ab9ae3861ea65519da3d9b3c&limit=100

const App = props => {
  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [comicdes, setComicDes] = useState([]);
  const [characterId, setCharacterId] = useState();
  const [getcomicId, setComicId] = useState();
  const [characterName, setCharacterName] = useState();
  const [isSelected, setIsSelected] = useState();

  const options = { year: "numeric", month: "long", day: "numeric" };

  //Get the Character Info
  const getCharacter = async () => {
    await axios
      .all([
        //Hulk
        axios.get(
          `http://gateway.marvel.com/v1/public/characters/1009351?ts=1&apikey=${API_KEY_Public}&hash=${API_KEY_Private}&limit=100&offset=500`
        ),
        //Ironman
        axios.get(
          `http://gateway.marvel.com/v1/public/characters/1009368?ts=1&apikey=${API_KEY_Public}&hash=${API_KEY_Private}&limit=100&offset=500`
        ),
        //Spiderman
        axios.get(
          `http://gateway.marvel.com/v1/public/characters/1009610?ts=1&apikey=${API_KEY_Public}&hash=${API_KEY_Private}&limit=100&offset=1100`
        ),
        //Thor
        axios.get(
          `http://gateway.marvel.com/v1/public/characters/1009664?ts=1&apikey=${API_KEY_Public}&hash=${API_KEY_Private}&limit=100&offset=1300`
        )
      ])
      .then(
        axios.spread((...response) => {
          const allCharacters = response[0].data.data.results.concat(
            response[1].data.data.results,
            response[2].data.data.results,
            response[3].data.data.results
          );
          setCharacters(allCharacters);
          console.log(allCharacters);
        })
      )
      .catch(errors => console.log(errors));
  };

  useEffect(() => {
    getCharacter(characterId);
  }, [characterId]);

  //Get the Comics Info
  const getComics = async charId => {
    await axios
      .get(
        `http://gateway.marvel.com/v1/public/characters/${charId}/comics?ts=1&apikey=${API_KEY_Public}&hash=${API_KEY_Private}&`,
        {
          params: {
            limit: 12
          }
        }
      )
      .then(response => setComics(response.data.data.results))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getComics(characterId);
  }, [characterId]);

  //Get the Comic Description Info
  const getComicDescription = async comicId => {
    await axios
      .get(
        `http://gateway.marvel.com/v1/public/comics/${comicId}?ts=1&apikey=${API_KEY_Public}&hash=${API_KEY_Private}`
      )
      .then(response => setComicDes(response.data.data.results))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getComicDescription(getcomicId);
  }, [getcomicId]);

  return (
    <div className="App">
      <div className="row">
        <div className="character-container">
          <img src={Marvel_Comics_logo} className="marvel-logo" />
          {characters.map((item, index) => (
            <div>
              <div //retrieving id and name from onClick
                onClick={() => {
                  setCharacterId(item.id);
                  setCharacterName(item.name);
                  setIsSelected(item.id);
                }}
                className={
                  item.id === isSelected ? "selected" : "character-box"
                }
              >
                <Character
                  key={index}
                  name={item.name}
                  thumbnail={
                    item.thumbnail.path +
                    "/standard_medium." +
                    item.thumbnail.extension
                  }
                  id={item.id}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="comics-container py-4">
          <h1 className="mx-4">Comics featuring {characterName}</h1>
          <div className="comic-collection">
            {comics.map((item, index) => (
              <div onClick={() => setComicId(item.id)}>
                <div className="p-2">
                  <Comics
                    key={index}
                    id={item.id}
                    thumbnail={
                      item.thumbnail.path +
                      "/portrait_xlarge." +
                      item.thumbnail.extension
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="comicdescription-container col">
          {comicdes.map((item, index) => (
            <ComicDescription
              key={index}
              thumbnail={
                item.thumbnail.path +
                "/portrait_uncanny." +
                item.thumbnail.extension
              }
              title={item.title}
              dateonsale={item.dates[0]?.date}
              focdate={item.dates[1]?.date}
              uldate={item.dates[2]?.date}
              dpdate={item?.dates[3]?.date}
              creatorrole1={item.creators?.items[0]?.role}
              creatorname1={item.creators?.items[0]?.name}
              creatorrole2={item.creators?.items[1]?.role}
              creatorname2={item.creators?.items[1]?.name}
              creatorrole3={item.creators?.items[2]?.role}
              creatorname3={item.creators?.items[2]?.name}
              creatorrole4={item.creators?.items[3]?.role}
              creatorname4={item.creators?.items[3]?.name}
              description={item.description && item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
