import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Toolbar from './components/Toolbar';

const EditMap = () => {
    const navigate = useNavigate();
    
    const map = useRef(null);
    const storeMap = useSelector((state) => state.map.map);

    const addJson = (mapobj, map) => {
        for (let i = 0; i < map.geometry.data.length; i++) {
            const feature = {
                type: 'Feature',
                properties: map.properties.data[i],
                geometry: map.geometry.data[i],
                index: i,
            };
            
            L.geoJSON(feature, {
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
                    if (label.showLabels) {
                        layer.bindTooltip("" + property[label.dataProperty], {
                            permanent: true,
                            direction: label.position
                        });
                    }
                }
            }).addTo(mapobj);
        }
    };

    useEffect(() => {
        // TODO: Fix this.
        if (storeMap == null) {
            navigate('/app/home');
        }

        if (!map.current) {
            map.current = L.map('map', { preferCanvas: true }).setView(
                [39.74739, -105],
                2
            );

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map.current);

            var southWest = L.latLng(-90, -180);
            var northEast = L.latLng(90, 180);
            var bounds = L.latLngBounds(southWest, northEast);

            map.current.setMaxBounds(bounds);
            map.current.on('drag', function () {
                map.current.panInsideBounds(bounds, { animate: false });
            });

            if (storeMap) {
                addJson(map.current, storeMap);
            }
        }
    }, []);

    useEffect(() => {
        if (map.current) {
            addJson(map.current, storeMap);
        }
    }, [storeMap])

    return (
        <div className="text-[13px]">
            <div className="flex gap-4 mt-5 mb-2 text-2xl font-bold justify-center items-center">
                {storeMap ? storeMap.name : '---'}
                <button
                    onClick={() => {
                        openCurrentModal('RENAME_MAP');
                    }}
                >
                    <i className="fa fa-edit mr-2 text-xl text-indigo-500" />
                </button>
            </div>
            <div id="map" className="w-full h-[63vh] mt-[65px] !absolute"></div>
            {/* {storeMap ? <Toolbar /> : null} */}
            <div className="relative top-[calc(63vh+75px)] z-[3000] flex gap-3 items-center mx-5 my-3">
                {storeMap
                    ? storeMap.tags.map((tag, key) => {
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
                {storeMap && storeMap.tags.length == 0 ? (
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
        </div>
    );
};

export default EditMap;
