import React, { Component } from 'react';
import DataLoader from 'components/utils/dataLoader';
import WikiUtils from 'components/utils/wikiUtils';
// import Back from 'components/back';
// import Page from 'components/page';
// import { TitleComponent } from 'components/titleComponent.js';
// import { Redirect } from "react-router-dom";


import mapboxgl from 'mapbox-gl';
import "styles/mapStyles.scss";

import cities from "data/map/cities.geojson";
import poi from "data/map/poi.geojson";
import keeps from "data/map/keeps.geojson";
import dwarfHolds from "data/map/dwarfHolds.geojson";

import dot from "img/city-dot.png";
import castle from "img/castle.png";
import dwarf from "img/hammer.png";
import dungeon from "img/dungeon.png";
// import popupBg from "img/popup.png";

mapboxgl.accessToken = "pk.eyJ1IjoidHlwaG9zIiwiYSI6ImNrOTNrM2x5MzAweW4zZm1tZHY3d3ZtbmUifQ.eMdubQ_r2bfdI72pcCwNMg";

class InteractiveMap extends Component {

  constructor (props) {
    super(props);
    this.state = {
      lng: 41,
      lat: -10,
      zoom: 3.3,
      minZoom: 3,
      maxZoom: 8,
      distanceContainer: document.getElementById('distance'),
      measuring: false,
      geojson: undefined,
      linestring: undefined
    };

    this.numberWithCommas = this.numberWithCommas.bind(this);
    // this.clickMeasureFunction = this.clickMeasureFunction.bind(this);
  }

  componentDidMount() {
    const places = DataLoader.places;
    const numberWithCommas = this.numberWithCommas;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/typhos/cka7tjdyw00f31iohzjmsb85t',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      minZoom: this.state.minZoom,
      maxZoom: this.state.maxZoom,
    });

    const cityIconOptions = [
      "interpolate", ["linear"], ["zoom"],
      // zoom is 4 (or less) -> circle radius will be minimum size
      3, 0.025,
      // zoom is 18 (or greater) -> circle radius will be maximum size
      8, 0.15
    ];

    const cityLabelOptions = [
      "interpolate", ["linear"], ["zoom"],
      // zoom is 0 (or less) -> text will be minimum size
      2, 10,
      // zoom is 5 (or greater) -> text will be maximum size
      6, 16
    ];

    const castleIconOptions = [
      "interpolate", ["linear"], ["zoom"],
      // zoom is 4 (or less) -> circle radius will be minimum size
      3, 0.005,
      // zoom is 18 (or greater) -> circle radius will be maximum size
      8, 0.066
    ];

    const dwarfHoldIconOptions = [
      "interpolate", ["linear"], ["zoom"],
      // zoom is 4 (or less) -> circle radius will be minimum size
      3, 0.0075,
      // zoom is 18 (or greater) -> circle radius will be maximum size
      8, 0.1
    ];

    map.on('load',function(){
      //url, layername, icon, source, radialOffset, iconOptions, labelOptions
      loadPoints(poi, 'interest_points', dungeon, 'poi', [0.01,0.6], castleIconOptions, cityLabelOptions, 0);
      loadPoints(cities, 'city_points', dot, 'cities', [0.01,0.6], cityIconOptions, cityLabelOptions, 0);
      loadPoints(keeps, 'castle_points', castle, 'castles', [0.01,0.6], castleIconOptions, cityLabelOptions, 0);
      loadPoints(dwarfHolds, 'dwarf_points', dwarf, 'dwarfHolds', [0.01,0.6], dwarfHoldIconOptions, cityLabelOptions, 0);
    });

    // map.on('move', () => {
    //   this.setState({
    //     lng: map.getCenter().lng.toFixed(2),
    //     lat: map.getCenter().lat.toFixed(2),
    //     zoom: map.getZoom().toFixed(2)
    //   });
    // });

    function loadPoints(url, layername, icon, source, radialOffset, iconOptions, labelOptions, sortkey){
      map.loadImage(icon, function(error, image) {
        var iconLayer = 'icon_' + layername;
      if (error) throw error;
        map.addImage(iconLayer, image);
          map.addSource(source, { type: 'geojson', data: url});
          map.addLayer({
            "id": layername,
            "type": "symbol",
            "source": source,
            "layout": {
              "icon-image": iconLayer,
              "icon-size": iconOptions,
              "icon-allow-overlap": false,
              "text-allow-overlap": false,
              "text-field": ["get", "Name"],
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

      map.on("click", layername, function(e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const name = e.features[0].properties.name;
        const info = e.features[0].properties.info;
        const population = e.features[0].properties.population;
        const type = e.features[0].properties.type;
        
        // create a variable to hold the popupcontent so we can conditionally add to it
        var popupContent;

        const linking = (string) => {
          let obj = WikiUtils.linkContent(name, name);
          
          console.log( obj[0].props.children[0] )
          console.log( typeof obj[0].props.children[0] )

          if ( typeof obj[0].props.children[0] !== "string" ) {
            return `<a href="/location/${string.replace(/\s+/g,"-")}">${string}</a>`
          } else {
            return string;
          }
        }

        if (type != 'null' && type != undefined){
          popupContent = "<p>"+type+ " of</p><h2 style='padding-bottom: 5px;'>"+ linking(name) + "</h2><hr>";
        } else {
          popupContent = "<h2 style='padding-bottom: 5px;'>"+ linking(name) +"</h2><hr>";
        }

        if (population !== 'null' && population !== undefined){
          popupContent += (`<p><strong>Population:</strong> ${ numberWithCommas(population) }</p>`);
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
          .addTo(map);
      });

      map.on("mouseenter", layername, function() {
        map.getCanvas().style.cursor = "pointer";
      });
      
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', layername, function () {
        map.getCanvas().style.cursor = '';
      });

    }

    function createPopup(e){
      var coordinates = e.features[0].geometry.coordinates.slice();
      var name = e.features[0].properties.name;
      var population = e.features[0].properties.population;
      var category = e.features[0].properties.type;
      var info =  e.features[0].properties.descrip;
      // var pois = e.features[0].properties.POIs;
      // var cityMap = e.features[0].properties.CityMap;
      var popupContent;
      if (category !== 'null' && category !== undefined){
        popupContent = "<p>"+category+ " of</p><h2 style='padding-bottom: 5px;'>"+name+"</h2><hr>";
      } else {
        popupContent = "<h2 style='padding-bottom: 5px;'>"+name+"</h2><hr>";
      }

      if (population !== 'null' && population !== undefined){
        popupContent += ("<h3>Population: </h3>" + String(population));
      }

      if (info !== 'null'){
        popupContent += ("<h3>Details: </h3>" + info);
      }

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(popupContent)
      .addTo(map);
    }
  }

  render () {

    return (
      <div>
        {/*<div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>*/}
        <div ref={el => this.mapContainer = el}  className="mapContainer" />
      </div>
    );
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // clickMeasureFunction (e, map) {
  //   let unitDivisor;
  //   if (this.state.units == "mi"){
  //     unitDivisor = 1.609;
  //   } else {
  //     unitDivisor = 1;
  //   }
    
  //   let features = map.queryRenderedFeatures(e.point, {
  //     layers: ['measure-points']
  //   });

  //   // Remove the linestring from the group
  //   // So we can redraw it based on the points collection
  //   if (this.state.geojson.features.length > 1) this.state.geojson.features.pop();

  //   // Clear the Distance container to populate it with a new value
  //   distanceContainer.innerHTML = '';

  //   // If a feature was clicked, remove it from the map
  //   if (features.length) {
  //     let id = features[0].properties.id;
      
  //     this.state.geojson.features = this.state.geojson.features.filter(function(point) {
  //       return point.properties.id !== id;
  //     });

  //   } else {

  //     let point = {
  //       'type': 'Feature',
  //       'geometry': {
  //       'type': 'Point',
  //       'coordinates': [e.lngLat.lng, e.lngLat.lat]
  //       },
  //       'properties': {
  //       'id': String(new Date().getTime())
  //       }
  //     };

  //     this.state.geojson.features.push(point);
  //   }

  //   if (this.state.geojson.features.length > 1) {
  //     linestring.geometry.coordinates = this.state.geojson.features.map(function(point) {
  //       return point.geometry.coordinates;
  //     });

  //     this.state.geojson.features.push(linestring);

  //     // Populate the distanceContainer with total distance
  //     let value = document.createElement('pre');
  //     value.textContent ='Total distance: ' + (Math.round((turf.lineDistance(linestring)/unitDivisor)*1.05*10)/10).toLocaleString() + ' ' + units;
  //     distanceContainer.appendChild(value);
  //   }

  //   map.getSource('geojson').setData(this.state.geojson);
  // }
  
}

export {InteractiveMap};