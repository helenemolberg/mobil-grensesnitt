import React, { Component } from "react";
import { Map, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import LocateControl from "../LocateControl";
import Control from "react-leaflet-control";
import Select from "react-select";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Card,
  CardTitle,
} from "reactstrap";
import SearchField from "react-search-field";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import { getPictures, getImages, getFilesProject } from "../../API";
import * as e6kaaData from "../../data/e6kaa.json";
import DateInfo from "../infoToolTips/DateInfo";
import CategoryInfo from "../infoToolTips/CategoryInfo";
import ProjectInfo from "../infoToolTips/ProjectInfo";
import ParsellInfo from "../infoToolTips/ParsellInfo";
import { FaSearch } from "react-icons/fa";

import "./Map.css";

import { gpsDirectionMarker } from "../Markers";
// Rotere markørene
import "leaflet-rotatedmarker";

// Options for the different projects
const projectOptions = [
  { value: [63.55144, 10.933473], label: "E6 Kvithammar - Åsen" },
  { value: [58.093886, 7.644329], label: "E39 Mandal" },
  { value: [59.001439, 9.613338], label: "E18 Rugtvedt Dørdal" },
  //Legge til resterende
];
// Options for the different categories
const categoryOptions = [
  { value: "Elektro", label: "Elektro" },
  { value: "Fjellsikring", label: "Fjellsikring" },
  { value: "Fundamentering", label: "Fundamentering" },
  { value: "Geomatikk", label: "Geomatikk" },
  { value: "Konstruksjon", label: "Konstruksjon" },
  { value: "Riving og sanering", label: "Riving og sanering" },
  { value: "Tunnel", label: "Tunnel" },
  { value: "Vann og avløp", label: "Vann og avløp" },
  { value: "Veg", label: "Veg" },
  { value: "Markedsbilder", label: "Markedsbilder" },
];

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
    images: [],
    imageURLS: [],
  };

  componentDidMount() {
    getImages().then((images) => {
      this.setState({
        images: images.images,
      });

    });
  }


  handleChange = (selectedOption) => {
    this.setState({
      location: {
        lat: selectedOption.value[0],
        lng: selectedOption.value[1],
      },
      selectedOption: selectedOption,
      zoom: 11,
    });

    // SORTERER PÅ PROSJEKT
    getFilesProject(selectedOption.label)
    .then(images => {
      this.setState({
        images: images.files
      });
    });
  }

  handlePictures = (name) => {
    Promise.resolve(getPictures(name)).then(function (value) {
      console.log(value);
      return value;
    })
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    const dropdownOpen = this.state.dropdownOpen;
    const selectedOption = this.state;

    console.log(this.state.images);

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
            <Dropdown
              isOpen={dropdownOpen}
              toggle={() => {
                this.setState({ dropdownOpen: !this.state.dropdownOpen });
              }}
            >
              <DropdownToggle caret>
                <FaSearch />
              </DropdownToggle>
              <DropdownMenu>
                <Card className="message-form">
                  <CardTitle className="title">Bildesøk</CardTitle>
                  <ProjectInfo />
                  <Select
                    className="select-option"
                    value={selectedOption.label}
                    onChange={this.handleChange}
                    options={projectOptions}
                    placeholder="Velg Prosjekt"
                    menuColor="blue"
                  />
                  <ParsellInfo />
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
                    onChange={(dates) => this.setState({ dates })}
                    value={this.state.dates}
                    locale
                    className="daterangePicker"
                  />
                </Card>
              </DropdownMenu>
            </Dropdown>
          </Control>
          <MarkerClusterGroup>
            {this.state.images.length > 0 &&
              this.state.images.map((image) => (
                <Marker
                  key={image._id}
                  position={[image.latitude, image.longitude]}
                  icon={gpsDirectionMarker}
                  rotationAngle={image.GPSImgDirection}
                >
                  <Popup>
                    <b>Prosjekt: </b>
                    {image.prosjekt} {image.prosjektOmrade}
                    <p />
                    <b>Parsell: </b>
                    {image.parsell}
                    <p />
                    <b>Kommentar: </b>
                    {image.kommentar}
                    <p />
                    <b>Kategori: </b>
                    {image.kategori}
                    <p />
                    <b>Høydemeter: </b>
                    {image.GPSAltitude}
                    <p />
                    <b>Dato tatt: </b>
                    {image.captureDate}
                    <p />
                    <img
                      src={`"${this.handlePictures(image.imageName)}"`}
                      width="100"
                      height="100"
                      alt={image.imageName}
                    />
                  </Popup>
                </Marker>
              ))}
          </MarkerClusterGroup>
        </Map>
      </div>
    );
  }
}
