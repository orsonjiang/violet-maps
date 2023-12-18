import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionCreators } from 'redux-undo';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-choropleth/dist/choropleth';
import centroid from "@turf/centroid"; // calculate center point
import "../../../plugins/leaflet-heat";

import apis from '../../../api/api';
import { setMap, setRegion } from '../../../actions/map';
import { convert } from '../../../helpers';

const EditMap = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const refmap = useRef(null);
    const layerControl = useRef(null); // keeping track of the layer control so that I can delete it later
    const { id } = useParams();
    const { map } = useSelector((state) => state.map.present);

    const MAP_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

    const clearMap = () => {
        if (refmap.current) {
            refmap.current.eachLayer((layer) => {
                if (!layer._url && layer._url !== MAP_URL) {
                    refmap.current.removeLayer(layer);
                }
            });
        }
        if (layerControl.current) layerControl.current.remove(refmap.current); // removing old layer control
    };

    useEffect(() => {
        clearMap();

        if (!map || map._id !== id) {
            apis.getMap(id, ['owner', 'geometry', 'properties', 'graphics'])
                .then((res) => {
                    dispatch(setMap(res.data.map));
                    dispatch(ActionCreators.clearHistory());
                })
                .catch((err) => console.log(err));
        }
    }, []);

    useEffect(() => {
        // Clear Map
        clearMap();

        // Init Map
        if (map && !refmap.current) {
            refmap.current = L.map('map', { preferCanvas: true }).setView(
                [39.74739, -105],
                2
            );

            L.tileLayer(MAP_URL, {
                minZoom: 3,
                maxZoom: 19,
            }).addTo(refmap.current);

            var southWest = L.latLng(-90, -180);
            var northEast = L.latLng(90, 180);
            var bounds = L.latLngBounds(southWest, northEast);

            refmap.current.setMaxBounds(bounds);
            refmap.current.on('drag', function () {
                refmap.current.panInsideBounds(bounds, { animate: false });
            });

            // panes to help preserve layer order when you use the layer control
            refmap.current.createPane('0');
            refmap.current.createPane('1');
            refmap.current.createPane('2');
            refmap.current.createPane('3');
            refmap.current.getPane('0').style.zIndex = 200;
            refmap.current.getPane('1').style.zIndex = 250;
            refmap.current.getPane('2').style.zIndex = 300;
            refmap.current.getPane('3').style.zIndex = 350;
        }

        // Edit Map
        const increaseStroke = (e) => {
            const layer = e.target;

            // increase stroke weight to show that feature can be selected
            layer.setStyle({
                weight: 5,
            });
        };

        const resetStroke = (e) => {
            const layer = e.target;

            // return to original stroke weight
            layer.setStyle({
                weight: 3,
            });
        };

        const clickFeature = (e) => {
            const target = e.target;
            // zoom into feature
            refmap.current.fitBounds(target.getBounds());

            // set the selected feature in store
            dispatch(setRegion(target));
        };

        if (map && refmap.current) {
            apis.updateMap(id, {
                graphics: map.graphics,
                properties: map.properties,
            }).catch((err) => console.log(err));

            const geojson = convert(map);

            var overlays = {}; // keeps track of the overlay layers (for layer control)

            if (map.graphics.choropleth) { // if there is a choropleth map, display this layer
                const choropleth = L.choropleth(geojson, {
                    valueProperty: map.graphics.choropleth.property,
                    scale: ['white', map.graphics.choropleth.color],
                    steps: 6,
                    mode: 'q',
                    style: {
                        fillOpacity: 0.9,
                    },
                    pane: '0'
                }).addTo(refmap.current);
                overlays["Hide/Show Choropleth"] = choropleth;
            }

            const geo = L.geoJSON(geojson, {
                style: (feature) => {
                    const style = map.graphics.style[feature.index];
                    return {
                        color: style.border,
                        fillColor: style.fill,
                    };
                },
                onEachFeature: (feature, layer) => {
                    const label = map.graphics.label;
                    const property = map.properties.data[feature.index];
   
                    layer.on({
                        mouseover: increaseStroke,
                        mouseout: resetStroke,
                        click: clickFeature,
                    });

                    if (label.showLabels) {
                        layer.bindTooltip(
                            `<div style="font-size: ${label.fontSize}px"> ${
                                property[label.property]
                            } </div>`,
                            {
                                permanent: true,
                                direction: label.position,
                                className: `bg-white border-transparent shadow-none ${label.fontStyle}`,
                            }
                        );
                    }
                },
                pane: '1'
            }).addTo(refmap.current);
            overlays["Hide/Show Your Edits"] = geo;

            const featurePropArr = map.properties.data;
            if (map.graphics.heat) { // if there is a heat map, display this layer
                const heatProperty = map.graphics.heat.property;
                const points = []
                for (let i = 0; i < map.geometry.data.length; i++) {
                    const point = centroid(map.geometry.data[i]); // get the center coordinates of polygon
                    points.push([point.geometry.coordinates[1], point.geometry.coordinates[0], featurePropArr[i][heatProperty]]); // heat map will update based on selected data property
                }
                const heat = L.heatLayer(points, {pane: '2', radius: 30, minOpacity: 0.55}).addTo(refmap.current);
                overlays["Hide/Show Heat Map"] = heat // add heat layer to overlays object
            }

            if (map.graphics.bubble) { // if there is a bubble map, display this layer
                const bubbleProperty = map.graphics.bubble.property;
                let max = featurePropArr[0][bubbleProperty]; // finding the max value
                let val = max; // temp value
                for (let i = 0; i < featurePropArr.length; i++) { // finding max
                    val = featurePropArr[i][bubbleProperty];
                    if (val > max) max = val;
                }
                
                const circles = []
                for (let i = 0; i < map.geometry.data.length; i++) {
                    const point = centroid(map.geometry.data[i]); // get the center coordinates of polygon
                    circles.push(L.circleMarker([point.geometry.coordinates[1], point.geometry.coordinates[0]], {
                        radius: (featurePropArr[i][bubbleProperty] * 30) / max,
                        color: map.graphics.bubble.color,
                        fillOpacity: 0.3
                    }));
                }
                var bubble = L.layerGroup(circles, {pane: '3'}).addTo(refmap.current); // put all the circles in one layer so i can easily hide/show all of them at once
                overlays["Hide/Show Bubbles"] = bubble // add bubble layer to overlays object
            }
            const c = L.control.layers({}, overlays, {collapsed: false}).addTo(refmap.current);
            layerControl.current = c; // ref to layer control so that I can delete it later
        }
    }, [map]);

    if (!map) {
        return <div>Loading Map...</div>;
    }

    return (
        <div className="flex flex-col grow text-sm">
            {/* <div className="flex px-2 gap-4 mb-2 text-2xl font-bold justify-between items-center">
                <div className="flex gap-3 items-center mx-5 text-sm">
                    {map
                        ? map.tags.map((tag, key) => {
                              return (
                                  <div
                                      key={key}
                                      className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 "
                                  >
                                      {tag}
                                  </div>
                              );
                          })
                        : null}
                    {map && map.tags.length == 0 ? (
                        <div className="text-gray-400">No tags</div>
                    ) : null}
                    <button
                        onClick={() => {
                            openCurrentModal('MAP_PROPS_MODAL');
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div> */}
            <div className="flex grow">
                <div
                    id="map"
                    className="w-full leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
                ></div>
            </div>
        </div>
    );
};

export default EditMap;
