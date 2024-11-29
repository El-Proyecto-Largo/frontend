import Map from 'ol/Map';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View.js';
import { OSM, TileArcGISRest, Vector } from 'ol/source';
import { useEffect } from 'react';
import { useState } from 'react';

import 'ol/ol.css'
import { Switch } from "@/components/ui/switch";
import MapControls from './MapControls';
import Circle from 'ol/geom/Circle.js';
import Feature from 'ol/Feature.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style.js';
import axios from 'axios';
import { useQuery } from 'react-query';
import VectorSource from 'ol/source/Vector';

export default function MapView({ className }: any) {
  const [toggleStates, setToggleStates] = useState({ layer1: true, layer2: true, layer3: true });
  const [vectorSource, setVectorSource] = useState(null);

  async function getPinGeoJSON() {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getpins`);
    return response;
  }

  const {
    data: geoJSON,
    error,
    isLoading,
  } = useQuery("geoJSONData", getPinGeoJSON, {
    onSuccess: (geoJSON) => {
      const source = new VectorSource({
        features: new GeoJSON().readFeatures(geoJSON.data, {
          featureProjection: "EPSG:3857"
        })
      });

      console.log(geoJSON.data);

      setVectorSource(source);
    },

  });

  const handleToggle = (key) => {
    console.log(`Toggling ${key}`); // <-- This should log on every toggle
    setToggleStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({ 
          anchor: [0.5, 1], src: 'src/assets/pin.png',
          width: 25,
        })
      })
    });

    const map: Map = new Map({
      layers: [
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
        //   visible: toggleStates.layer0,
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
        vectorLayer,
      ],
      target: "map",
      view: new View({
        center: [-11097148, 4509099],
        zoom: 5,
        extent: [-16097148, 509099, -1097148, 7569099],
      }),
    });

    return () => map.dispose();
  }, [toggleStates, vectorSource]);

  return (
    <div>
      <MapControls toggleStates={toggleStates} setToggleStates={setToggleStates} />
      <div id="map" className={className} />
    </div>
  )
}