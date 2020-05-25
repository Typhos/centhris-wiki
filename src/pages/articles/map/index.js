import React, { Component } from 'react';
import WikiUtils from 'components/utils/wikiUtils';
import Page from 'components/page';
import { TitleComponent } from 'components/titleComponent.js';

import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf'
import "styles/mapStyles.scss";

import cities from "data/map/cities.geojson";
import poi from "data/map/poi.geojson";
import keeps from "data/map/keeps.geojson";
import dwarfHolds from "data/map/dwarfHolds.geojson";
import capitals from "data/map/capitals.geojson";

import dot from "img/city-dot.png";
import star from "img/capital.png";
import castle from "img/castle.png";
import dwarf from "img/hammer.png";
import dungeon from "img/dungeon.png";

mapboxgl.accessToken = "pk.eyJ1IjoidHlwaG9zIiwiYSI6ImNrOTNrM2x5MzAweW4zZm1tZHY3d3ZtbmUifQ.eMdubQ_r2bfdI72pcCwNMg";

class InteractiveMap extends Component {

  constructor (props) {
    super(props);
    this.state = {
      map: undefined,
      lng: 30,
      lat: -10,
      zoom: 3,
      minZoom: 3,
      maxZoom: 8,
      distanceContainer: document.getElementById('distance'),
      measuring: false,
      geojson: undefined,
      units: "mi",
      linestring: undefined
    };

    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.loadPoints = this.loadPoints.bind(this);
    this.createPopup = this.createPopup.bind(this);
    this.homeButtonEvent = this.homeButtonEvent.bind(this);
    this.measuringEvent = this.measuringEvent.bind(this);
    this.removeMeasure = this.removeMeasure.bind(this);
    this.rightClickRemoveMeasuringIcon = this.rightClickRemoveMeasuringIcon.bind(this);
    this.clickMeasureFunction = this.clickMeasureFunction.bind(this);
    this.changeMeasuringMouseIcon = this.changeMeasuringMouseIcon.bind(this);
  }

  componentDidMount() {
    let loadPoints = this.loadPoints;
    const geojson = {
      'type': 'FeatureCollection',
      'features': []
    };

    const linestring = {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': []
      }
    };

    this.setState({
      resetGeoJson: geojson,
      geojson: geojson,
      linestring: linestring
    });

    let map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/typhos/cka7tjdyw00f31iohzjmsb85t',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      minZoom: this.state.minZoom,
      maxZoom: this.state.maxZoom,
    });

    this.setState({"map": map});
    this.setState({distanceContainer: document.getElementById('distance')})

    const cityIconOptions = [
      "interpolate", ["linear"], ["zoom"],
      4, 0.025,
      8, 0.15
    ];

    const cityLabelOptions = [
      "interpolate", ["linear"], ["zoom"],
      4, 8,
      6, 14
    ];

    const castleIconOptions = [
      "interpolate", ["linear"], ["zoom"],
      4, 0.005,
      8, 0.066
    ];

    const dwarfHoldIconOptions = [
      "interpolate", ["linear"], ["zoom"],
      // zoom is 4 (or less) -> circle radius will be minimum size
      4, 0.0075,
      // zoom is 18 (or greater) -> circle radius will be maximum size
      8, 0.1
    ];

    map.on('load',function(){
      //url, layername, icon, source, radialOffset, iconOptions, labelOptions
      loadPoints(poi, 'interest_points', dungeon, 'poi', [0.01,0.6], castleIconOptions, cityLabelOptions, 0);
      loadPoints(cities, 'city_points', dot, 'cities', [0.01,0.6], cityIconOptions, cityLabelOptions, 0);
      loadPoints(capitals, 'capitals', star, 'capitals', [0.01,0.6], cityIconOptions, cityLabelOptions, 0);
      loadPoints(keeps, 'castle_points', castle, 'castles', [0.01,0.6], castleIconOptions, cityLabelOptions, 0);
      loadPoints(dwarfHolds, 'dwarf_points', dwarf, 'dwarfHolds', [0.01,0.6], dwarfHoldIconOptions, cityLabelOptions, 0);
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    const homeButtonControl = new NewButtonControl('home','Home', this.homeButtonEvent);
    const rulerButtonControl = new NewButtonControl('ruler','Ruler', this.measuringEvent);

    map.addControl(homeButtonControl, 'top-left');
    map.addControl(rulerButtonControl, 'top-left');
  }

  render () {

    return (
      <Page.Location>
        <TitleComponent title={`Map of Ulfwyst`} />
        {/*<div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>*/}
        <div ref={el => this.mapContainer = el}  className="mapContainer" />
        <div id="distance" className="distanceContainer"></div>
      </Page.Location>
    );
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  loadPoints(url, layername, icon, source, radialOffset, iconOptions, labelOptions, sortkey){
    let map = this.state.map;

    map.loadImage(icon, function(error, image) {
      var iconLayer = 'icon_' + layername;
      
      if (error) throw error;
      map.addImage(iconLayer, image);
      map.addSource(source, { type: 'geojson', data: url});
      map.addLayer({
        "id": layername,
        "type": "symbol",
        "source": source,
        "minzoom": 4,
        "layout": {
          "icon-image": iconLayer,
          "icon-size": iconOptions,
          "icon-allow-overlap": false,
          "text-allow-overlap": false,
          "text-field": ["get", "name"],
          "text-size": labelOptions,
          "text-variable-anchor": ["top", "bottom", "left", "right"],
          "text-radial-offset": [
          "interpolate", ["linear"], ["zoom"],
            // zoom is 0 (or less) -> circle radius will be minimum size
            0, radialOffset[0],
            // zoom is 5 (or greater) -> circle radius will be maximum size
            5, radialOffset[1]
          ],
          "text-justify": "left",
          "symbol-sort-key": sortkey
        },
        "paint": {
          // symbol label options
          "text-halo-color": "#fff7e4",
          "text-halo-width": 2
        }
      });
    
    });

    map.on("click", layername, this.createPopup);

    map.on("mouseenter", layername, function() {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on('mouseleave', layername, function () {
      map.getCanvas().style.cursor = '';
    });
  }

  createPopup (e) {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const name = e.features[0].properties.name;
    const info = e.features[0].properties.info;
    const population = e.features[0].properties.population;
    const type = e.features[0].properties.type;
    
    // create a variable to hold the popupcontent so we can conditionally add to it
    var popupContent;

    const linking = (string) => {
      let obj = WikiUtils.linkContent(name, name);

      if ( typeof obj[0].props.children[0] !== "string" ) {
        return `<a href="/location/${string.replace(/\s+/g,"-")}">${string}</a>`
      } else {
        return string;
      }
    }

    if (type !== 'null' && type !== undefined){
      popupContent = "<p>"+type+ " of</p><h2 style='padding-bottom: 5px;'>"+ linking(name) + "</h2><hr>";
    } else {
      popupContent = "<h2 style='padding-bottom: 5px;'>"+ linking(name) +"</h2><hr>";
    }

    if (population !== 'null' && population !== undefined){
      popupContent += (`<p><strong>Population:</strong> ${ this.numberWithCommas(population) }</p>`);
    }

    if (info !== null) {
      popupContent += `<p><strong>Details:</strong> ${info}</p>`;
    }

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // once the we've defined the properties for our popup, this part actually
    // displays that popup at the coordinates of the click event, with the inner html
    // we defined, and adds it to the map object.
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(popupContent)
      .addTo(this.state.map);
  }

  homeButtonEvent() {

    this.state.map.flyTo({
      center: [this.state.lng, this.state.lat],
      bearing: 0,
      pitch: 0,
      zoom: this.state.zoom,
      speed: 1.2,

      // slow fly animation settings
      // speed: 0.01,
      // curve: 0.2,
      // center: [20, 10],

      easing: function(t) {
      return t;
      },
      essential: true
    });
  }

  measuringEvent() {
    //event handler for measuring control button

    const map = this.state.map;
    const geojson = this.state.geojson;
    const measureBtnElement = document.getElementsByClassName('mapboxgl-ctrl-ruler')[0];

    let elements = [
      "interest_points",
      "city_points",
      "castle_points",
      "dwarf_points"
    ];
    elements.forEach( p => this.state.map.off('click', p, this.createPopup) );

    this.setState({'measuring': !this.state.measuring});

    if (this.state.measuring === true){
      measureBtnElement.classList.add('active');

      let tempObj = map;

      tempObj.addSource('geojson', {
        'type': 'geojson',
        'data': geojson
      });

      // Add styles to the map
      tempObj.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'geojson',
        paint: {
          'circle-radius': 5,
          'circle-color': '#222'
        },
        filter: ['in', '$type', 'Point']
      });

      tempObj.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'geojson',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#222',
          'line-width': 2.5
        },
        filter: ['in', '$type', 'LineString']
      });

      this.setState({map: tempObj});

      map.on('mousemove', this.changeMeasuringMouseIcon);
      map.on('click', this.clickMeasureFunction );

      document.addEventListener('mousedown', this.rightClickRemoveMeasuringIcon);

    } else {
      measureBtnElement.classList.remove('active');
      this.removeMeasure(measureBtnElement);
      map.getCanvas().style.cursor = "pointer";
    }
  }

  clickMeasureFunction(e){
    let map = this.state.map;
    let geojson = this.state.geojson;
    let units = this.state.units;
    let distanceContainer = document.getElementById("distance");
    let unitDivisor;

    if (units === "mi"){
      unitDivisor = 1.609;
    } else {
      unitDivisor = 1;
    }

    let features = map.queryRenderedFeatures(e.point, {
      layers: ['measure-points']
    });

    // Remove the linestring from the group
    // So we can redraw it based on the points collection
    if (geojson.features.length > 1) geojson.features.pop();
    
    // Clear the Distance container to populate it with a new value
    distanceContainer.innerHTML = '';

    // If a feature was clicked, remove it from the map
    if (features.length) {
      let id = features[0].properties.id;
      geojson.features = geojson.features.filter(function (point) {
        return point.properties.id !== id;
      });
    } else {
      let point = {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [e.lngLat.lng, e.lngLat.lat]
        },
        'properties': {
          'id': String(new Date().getTime())
        }
      };

      geojson.features.push(point);
    }

    if (geojson.features.length > 1) {

      let obj = this.state.linestring;
      obj.geometry.coordinates = geojson.features.map(function (point) {
        return point.geometry.coordinates;
      });

      this.setState({
        linestring: obj
      })

      geojson.features.push(this.state.linestring);

      // Populate the distanceContainer with total distance
      let value = document.createElement('pre');
      value.textContent = 'Total distance: ' + (Math.round((turf.lineDistance(this.state.linestring) / unitDivisor) * 4) / 10).toLocaleString() +' ' + units;
      distanceContainer.appendChild(value);  
    }

    map.getSource('geojson').setData(this.state.geojson);

    this.setState({
      map: map,
      geojson: geojson
    });
    
  }
  
  removeMeasure(measureBtnElement){
    const map = this.state.map;
    const line = this.state.linestring;
    const geojson = this.state.geojson;

    let elements = [
      "interest_points",
      "city_points",
      "castle_points",
      "dwarf_points"
    ];

    elements.forEach( p => this.state.map.on('click', p, this.createPopup) );

    let distanceElement = document.getElementById('distance');
    distanceElement.innerHTML = '';

    if (map.getLayer('measure-points')) {
      map.removeLayer('measure-points');
    }

    if (map.getLayer('measure-lines')) {
      map.removeLayer('measure-lines');
    }

    map.removeSource('geojson');
    map.getCanvas().style.cursor = 'pointer';
    map.off("mousemove", this.changeMeasuringMouseIcon);
    map.off("click", this.clickMeasureFunction);

    line.geometry.coordinates = [];
    geojson.features = [];

    document.removeEventListener('mousedown', this.rightClickRemoveMeasuringIcon);

    this.setState({
      map: map,
      linestring: line,
      geojson: geojson
    });
  }

  rightClickRemoveMeasuringIcon(e){
    let map = this.state.map;

    if (e.button === 2){
      let measureBtnElement = document.getElementsByClassName('mapboxgl-ctrl-ruler')[0];
      // this.state.measuring = false;
      this.setState({measuring: false});
      this.removeMeasure(measureBtnElement);
      measureBtnElement.classList.remove('active');
      map.getCanvas().style.cursor = "pointer";
    }
  }

  changeMeasuringMouseIcon(e) {
    const map = this.state.map;
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['measure-points']
    });
    // UI indicator for clicking/hovering a point on the map
    map.getCanvas().style.cursor = features.length ? 'pointer' : 'crosshair';
  }

}

class NewButtonControl {
  constructor(className, title, eventHandler) {
    this._className = className;
    this._title = title;
    this._eventHandler = eventHandler;
  }

  onAdd(map){
    this.map = map;
    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this.child = document.createElement('button');
    this.child.className = `mapboxgl-ctrl-${this._className}`;
    this.child.textContent = this._title;
    this.container.append(this.child);

    this.container.onclick = this._eventHandler;

    return this.container;
  }

  onRemove(){
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

export {InteractiveMap};