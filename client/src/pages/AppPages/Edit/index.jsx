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
import { setMap, setMapContainer, setRegion } from '../../../actions/map';
import { convert } from '../../../helpers';

import Tags from './components/Tags';

const EditMap = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const refMap = useRef(null);
    const refMapContainer = useRef(null);
    const layerControl = useRef(null); // keeping track of the layer control so that I can delete it later
    const legendControl = useRef(null); // keeping track of legend so that I can delete later
    const { id } = useParams();
    const { map } = useSelector((state) => state.map.present);

    const MAP_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

    const clearMap = () => {
        if (refMap.current) {
            refMap.current.eachLayer((layer) => {
                if (!layer._url && layer._url !== MAP_URL) {
                    refMap.current.removeLayer(layer);
                }
            });
        }
        if (layerControl.current) layerControl.current.remove(refMap.current); // removing old layer control
        if (legendControl.current) legendControl.current.remove(refMap.current); // removing old legend control
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
        dispatch(setMapContainer(refMapContainer.current));
    }, [refMapContainer.current])

    useEffect(() => {
        // Clear Map
        clearMap();

        // Init Map
        if (map && !refMap.current) {
            refMap.current = L.map('map').setView(
                [39.74739, -105],
                2
            );

            L.tileLayer(MAP_URL, {
                minZoom: 3,
                maxZoom: 19,
            }).addTo(refMap.current);

            var southWest = L.latLng(-90, -180);
            var northEast = L.latLng(90, 180);
            var bounds = L.latLngBounds(southWest, northEast);

            refMap.current.setMaxBounds(bounds);
            refMap.current.on('drag', function () {
                refMap.current.panInsideBounds(bounds, { animate: false });
            });

            // panes to help preserve layer order when you use the layer control
            refMap.current.createPane('0');
            refMap.current.createPane('1');
            refMap.current.createPane('2');
            refMap.current.createPane('3');
            refMap.current.getPane('0').style.zIndex = 200;
            refMap.current.getPane('1').style.zIndex = 250;
            refMap.current.getPane('2').style.zIndex = 300;
            refMap.current.getPane('3').style.zIndex = 350;
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
            refMap.current.fitBounds(target.getBounds());

            // set the selected feature in store
            dispatch(setRegion(target));
        };

        if (map && refMap.current) {
            apis.updateMap(id, {
                name: map.name,
                tags: map.tags,
                graphics: map.graphics,
                properties: map.properties,
            }).catch((err) => console.log(err));

            const geojson = convert(map);

            var overlays = {}; // keeps track of the overlay layers (for layer control)

            if (map.graphics.choropleth.isDisplayed) { // if there is a choropleth map, display this layer
                const choropleth = L.choropleth(geojson, {
                    valueProperty: map.graphics.choropleth.property,
                    scale: ['white', map.graphics.choropleth.color],
                    steps: 6,
                    mode: 'q',
                    style: {
                        fillOpacity: 0.9,
                    },
                    pane: '0'
                }).addTo(refMap.current);
                overlays["Hide/Show Choropleth"] = choropleth;

                if (map.graphics.legend.visible) { // auto generated choropleth legend
                    var legend = L.control({position: map.graphics.legend.position});
                    legend.onAdd = function (m) {
                        const div = L.DomUtil.create('div', 'legend');
                        const colors = choropleth.options.colors;
                        const limits = choropleth.options.limits;
                        div.style = 'background: rgba(255, 255, 255, .8); padding: 10px;'
                        div.innerHTML = map.graphics.legend.name ? `<h2 style="font-weight: 500; font-size: 1.1em; padding-bottom: 10px;">${map.graphics.legend.name}</h2>` : '';

                        for (var i = 0; i < colors.length; i++) {
                            div.innerHTML +=
                                '<div style="display: flex; align-items: center; gap: 10px;">' +
                                    `<div style="width: 25px; height: 25px; background:${colors[i]}"></div> ` + 
                                    `<div>< ${Number(limits[i]).toFixed(2)}</div>` +
                                '</div>';
                        }
                        return div;
                    };
                    
                    legend.addTo(refMap.current);
                    legendControl.current = legend;
                }
            }

            const geo = L.geoJSON(geojson, {
                style: (feature) => {
                    const style = map.graphics.style[feature.properties.index];
                    return {
                        color: style.border,
                        fillColor: style.fill,
                        fillOpacity: 0.8
                    };
                },
                onEachFeature: (feature, layer) => {
                    const label = map.graphics.label;
                    const property = map.properties.data[feature.properties.index];
   
                    layer.on({
                        mouseover: increaseStroke,
                        mouseout: resetStroke,
                        click: clickFeature,
                    });

                    if (label.isDisplayed) {
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
            }).addTo(refMap.current);
            
            overlays["Hide/Show Your Edits"] = geo;

            const featurePropArr = map.properties.data;
            if (map.graphics.heat.isDisplayed) { // if there is a heat map, display this layer
                const heatProperty = map.graphics.heat.property;
                const points = []
                for (let i = 0; i < map.geometry.data.length; i++) {
                    const point = centroid(map.geometry.data[i]); // get the center coordinates of polygon
                    points.push([point.geometry.coordinates[1], point.geometry.coordinates[0], featurePropArr[i][heatProperty]]); // heat map will update based on selected data property
                }
                const heat = L.heatLayer(points, {pane: '2', radius: 30, minOpacity: 0.55}).addTo(refMap.current);
                overlays["Hide/Show Heat Map"] = heat // add heat layer to overlays object
            }

            if (map.graphics.bubble.isDisplayed) { // if there is a bubble map, display this layer
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
                var bubble = L.layerGroup(circles, {pane: '3'}).addTo(refMap.current); // put all the circles in one layer so i can easily hide/show all of them at once
                overlays["Hide/Show Bubbles"] = bubble // add bubble layer to overlays object
            }
            const c = L.control.layers({}, overlays, {collapsed: false, position: 'bottomright'}).addTo(refMap.current);
            layerControl.current = c; // ref to layer control so that I can delete it later
        }
    }, [map]);

    if (!map) {
        return <div>Loading Map...</div>;
    }

    return (
        <div className="flex flex-col grow text-sm space-y-2">
            <div className="flex grow">
                <div
                    ref={refMapContainer}
                    id="map"
                    className="w-full leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
                ></div>
            </div>
            <Tags />
        </div>
    );
};

export default EditMap;
