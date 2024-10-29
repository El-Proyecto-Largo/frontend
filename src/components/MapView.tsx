import Map from 'ol/Map';
import TileLayer from 'ol/layer/WebGLTile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View.js';
import { OSM, Source, TileArcGISRest } from 'ol/source';
import { useEffect } from 'react';

import 'ol/ol.css'

export default function MapView() {
  useEffect(() => {
    let layers: TileLayer[] = [
      new TileLayer({
        source: new OSM(),
      }),
      // new TileLayer({
      //   // extent: [-13884991, 2870341, -7455066, 6338219],
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
      }),
      new TileLayer({
        source: new TileArcGISRest({
          url: "https://mapservices.weather.noaa.gov/tropical/rest/services/tropical/NHC_tropical_weather/MapServer",
        }),
        opacity: 0.25,
      }),
      new TileLayer({
        source: new TileArcGISRest({
          url: "https://mapservices.weather.noaa.gov/eventdriven/rest/services/WWA/watch_warn_adv/MapServer",
        }),
        opacity: 0.5,
      }),
    ];

    const map: Map = new Map({
      layers: layers,
      target: "map",
      view: new View({
        center: [-10997148, 4569099],
        zoom: 4,
      }),
    });

    return () => map.dispose();
  }, []);

  return (
    <div id="map" className='h-screen w-screen'>

    </div>
  )
}