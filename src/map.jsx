import React, { useEffect, useRef, useState } from 'react';
import '../node_modules/ol/ol.css'; 
import { Map as OlMap, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { Feature } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { useGeographic } from 'ol/proj'; // Import the useGeographic function
import TextBox from './textbox';
import './textbox.css';


const Map = (props) => {
  const mapRef = useRef(null);
  const [pointCoordinates, setPointCoordinates] = useState([31, 30]); // Initial coordinates
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  useGeographic();

  const view = new View({
    center: [pointCoordinates[0], pointCoordinates[1]],
    zoom: 8,
  });

  useEffect(() => {
    const map = new OlMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: view
    });
    
    // Add a point feature to the map
    const point = new Point([31, 30]); // Longitude, Latitude
    const feature = new Feature(point);
    const iconStyle = new Style({
      image: new Icon({
        src: 'marker2.png', // Path to the image representing the point
        scale: 0.02, 
      }),
    });

    feature.setStyle(iconStyle);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [feature],
      }),
    });

    map.addLayer(vectorLayer);

      // Add a pointermove event listener to the map
    map.on('pointermove', (event) => {
      const coordinates = map.getEventCoordinate(event.originalEvent);
      setMouseCoordinates({
        x: coordinates[0].toFixed(2),
        y: coordinates[1].toFixed(2),
      });
    });


    // Keyboard event listener
    const handleKeyDown = (event) => {
      const { key } = event;
      const coordinates = point.getCoordinates();


      // Adjust the longitude and latitude based on the pressed key
      switch (key) {
        case 'ArrowUp':
          coordinates[1] += 1;
          break;
        case 'ArrowDown':
          coordinates[1] -= 1;
          break;
        case 'ArrowLeft':
          coordinates[0] -= 1;
          break;
        case 'ArrowRight':
          coordinates[0] += 1;
          break;
        default:
          return;
      }
        // Update the state with the new coordinates
        point.setCoordinates(coordinates);
      };
       // Attach the event listener to the window
    window.addEventListener('keydown', handleKeyDown);
    // Clean up the map instance and remove the event listener when the component unmounts
    return () => {
      
      window.removeEventListener('keydown', handleKeyDown);
      map.setTarget(null);
    };
  }, [pointCoordinates]);

  const getCoordinates = () => {
    const myInput = document.getElementById("myInput");
    let inputValue = myInput.value;
    inputValue=inputValue.split('/');
    inputValue = inputValue.map(str => parseInt(str));
    setPointCoordinates(inputValue);
 }

  return (
    <React.Fragment>
  <div ref={mapRef} className="map-container"  />
  <div className="textbox-container">
  <TextBox getCoordinates={getCoordinates} />
  <p style={{backgroundColor:'Gainsboro'}}>
  {mouseCoordinates.x} / {mouseCoordinates.y} 

  </p>

  </div>
  </React.Fragment>
  );
};

export default Map;