import { Feature, View } from "ol";
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { Icon, Style } from "ol/style";
import { useState,useEffect } from "react";
const MapTest = () => {
    const[pointCoordinates,setPointCoordinates]=useState([30,31]);

    useEffect(()=>{
        const map=new Map({
            target:'map',
            layers:[
                new TileLayer({
                    source:new OSM(),
                }),
            ],
            View:new View({
                center:[32,31],
                zoom:8,
            }),
        });
        // Add a point feature to the map
        const point =new Point([31,30]);
        const feature=new Feature(point);
        const iconStyle=new Style({
            image:new Icon({
                src:'marker2.png',
                scale:0.02,
            }),
        });
        feature.setStyle(iconStyle);
        map.addLayer(feature);

        const handleKeyDown=(event)=>{
            const {key}=event;
            const coordinates=point.getCoordinates();
            switch (key) {
                case 'ArrowUp':
                    coordinates[1]+=1;
                    break;
                case 'ArrowDown':
                    coordinates[1]-=1;
                    break;
                case 'ArrowLeft':
                    coordinates[0]-=1;
                    break;
                case 'ArrowRight':
                    coordinates[0]+=1;
                    break;
                default:
                    return;                       
            }
            point.setCoordinates(coordinates);
        };




    },[])

    return ( 0);
}
 
export default MapTest;