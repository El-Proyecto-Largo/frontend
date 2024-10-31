import Map from 'ol/Map';
import TileLayer from 'ol/layer/WebGLTile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View.js';
import { OSM, TileArcGISRest } from 'ol/source';
import { useEffect } from 'react';
import { useState } from 'react';

import 'ol/ol.css'
import { Switch } from "@/components/ui/switch";

export default function MapView( {className} ) {

  const[toggleStates, setToggleStates] = useState({layer1: false, layer2: false, layer3: false});

  const handleToggle = (key) => {
    console.log(`Toggling ${key}`); // <-- This should log on every toggle
    setToggleStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  useEffect(() => {
    let layers: TileLayer[] = [
      new TileLayer({
        source: new OSM(),
      }),
      // new TileLayer({
      //   source: new TileWMS({
      //     url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi?',
      //     params: {'LAYERS': 'fulldisk_ch13', 'TILED': true},
      //     serverType: 'geoserver',
      //     // Countries have transparency, so do not fade tiles:
      //     transition: 0,
      //   }),
      //   opacity: 0.25,
      // }),
      new TileLayer({
        source: new TileArcGISRest({
          url: 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity/MapServer',
        }),
        visible: toggleStates.layer1,
      }),
      new TileLayer({
        source: new TileArcGISRest({
          url: "https://mapservices.weather.noaa.gov/tropical/rest/services/tropical/NHC_tropical_weather/MapServer",
        }),
        visible: toggleStates.layer2,
        opacity: 0.25,
      }),
      new TileLayer({
        source: new TileArcGISRest({
          url: "https://mapservices.weather.noaa.gov/eventdriven/rest/services/WWA/watch_warn_adv/MapServer",
        }),
        visible: toggleStates.layer3,
        opacity: 0.5,
      }),
    ];

    const map: Map = new Map({
      layers: layers,
      target: "map",
      view: new View({
        center: [-11097148, 4509099],
        zoom: 5,
        extent: [-16097148, 509099, -1097148, 7569099],
      }),
    });

     //Update layer visibility whenever toggleStates changes
     layers[1].setVisible(toggleStates.layer1);
     layers[2].setVisible(toggleStates.layer2);
     layers[3].setVisible(toggleStates.layer3);
 
    return () => map.dispose();
  }, [toggleStates]);

  return (
    <div>
      <div id="map" className={className}>
  
      </div>
      <div className='absolute top-20 right-10 bg-white p-4 shadow-lg rounded-md z-10'>
        <div className="p-4 pt-1">
          <h1 className="text-lg font-bold mb-2">Toggle Layers On/Off</h1>

          <div>
            <h3>Radar</h3>
            <Switch id='radar-switch' checked={toggleStates.layer1} onCheckedChange={() => handleToggle('layer1')}/>
          </div>
          <div>
            <h3>Tropical Cyclones</h3>
            <Switch id='tropical-weather-switch' checked={toggleStates.layer2} onCheckedChange={() => handleToggle('layer2')}/>
          </div>
          <div>
            <h3>Watches and Warnings</h3>
            <Switch id='watch-warning-switch'checked={toggleStates.layer3} onCheckedChange={() => handleToggle('layer3')}/>
          </div>
        </div>
      </div>
    </div>
  )
}