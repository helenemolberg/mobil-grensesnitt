import React, { Component } from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import LocateControl from "../LocateControl";
import Control from "react-leaflet-control";
import Select from "react-select";
import {Dropdown, DropdownToggle, DropdownMenu, Card, CardTitle} from 'reactstrap';
import SearchField from "react-search-field";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import * as e6kaaData from '../../data/e6kaa.json';
import DateInfo from '../infoToolTips/DateInfo';
import CategoryInfo from '../infoToolTips/CategoryInfo';
import ProjectInfo from '../infoToolTips/ProjectInfo';
import ParsellInfo from '../infoToolTips/ParsellInfo';
import { FaSearch } from "react-icons/fa";

import "./Map.css";

//import {gpsDirectionMarker, positionMarker} from '../Markers';
// Rotere markørene 
//import 'leaflet-rotatedmarker';

// Options for the different projects
const projectOptions = [
  {value: [63.551440, 10.933473], label: 'E6 Kvithammar - Åsen'},
  {value: [58.093886,7.644329], label: 'E39 Mandal'},
  {value: [59.001439, 9.613338], label: 'E18 Rugtvedt Dørdal'}
  //Legge til resterende
];
// Options for the different categories
const categoryOptions = [
  {value: 'Elektro', label: 'Elektro'},
  {value: 'Fjellsikring', label: 'Fjellsikring'},
  {value: 'Fundamentering', label: 'Fundamentering'},
  {value: 'Geomatikk', label: 'Geomatikk'},
  {value: 'Konstruksjon', label: 'Konstruksjon'},
  {value: 'Riving og sanering', label: 'Riving og sanering'},
  {value: 'Tunnel', label: 'Tunnel'},
  {value: 'Vann og avløp', label: 'Vann og avløp'},
  {value: 'Veg', label: 'Veg'},
  {value: 'Markedsbilder', label: 'Markedsbilder'},
]

export default class Kart extends Component {
  state = {
    location: {
      lat: 63.430515,
      lng: 10.395053,
    },
    positionCoord: {
      lat: 0,
      lng: 0,
    },
    zoom: 5,
    dropdownOpen: false,
    selectedOption: null,
    dates: null,
  };

  componentDidMount() {
    console.log(e6kaaData.features);
  }

  handleChange = (selectedOption) => {
    this.setState({
      location: {
        lat: selectedOption.value[0],
        lng: selectedOption.value[1]
      },
      selectedOption,
      zoom: 11,
    });
  } 


  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    const dropdownOpen = this.state.dropdownOpen;
    const selectedOption = this.state;

    // Position of user
    const locateOptions = {
      position: "topleft",
      strings: {
        title: "Vis posisjon min",
      },
      onActive: () => {}, // callback before engine starts retrieving locations
    };


    return (
      <div className="app">
        <Map
          className="map"
          center={position}
          zoom={this.state.zoom}
          zoomControl={false}
        >

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocateControl options={locateOptions} />

          <GeoJSON color="red" data={e6kaaData.features} />


          <Control position="topright">
            <Dropdown isOpen={dropdownOpen} toggle={() => { this.setState({ dropdownOpen: !this.state.dropdownOpen }); }}>
              <DropdownToggle caret>
                  <FaSearch/>
              </DropdownToggle>
              <DropdownMenu>
                <Card className="message-form">
                  <CardTitle className="title">Bildesøk</CardTitle>
                  <ProjectInfo/>
                  <Select 
                    className="select-option"
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={projectOptions}
                    placeholder="Velg Prosjekt"
                    menuColor="blue"
                  />
                  <ParsellInfo/>
                  <SearchField 
                    placeholder="parsellnummer"
                    onSearchClick={(par) => console.log(par)}
                    onEnter={(par) => console.log(par)}
                    classNames="search-Field"
                  />
                  <CategoryInfo />
                  <Select 
                    className="select-category"
                    options={categoryOptions}
                    isMulti
                    menuPlacement="auto" 
                    maxMenuHeight={160}                  
                  />
                  <DateInfo />
                  <DateRangePicker 
                    onChange={(dates) => this.setState({dates})}
                    value={this.state.dates}
                    locale
                    className="daterangePicker"
                  />
                </Card>
              </DropdownMenu>
            </Dropdown>
          </Control>
        </Map>
      </div>
    );
  }
}
