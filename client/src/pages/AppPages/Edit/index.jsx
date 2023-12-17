import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionCreators } from 'redux-undo';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import apis from '../../../api/api';
import { setMap } from '../../../actions/map';

import Toolbar from './components/Toolbar';

const EditMap = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const refmap = useRef(null);
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
    };

    useEffect(() => {
        clearMap();
        if (!map || map._id !== id) {
            apis.getMap(id, ['owner', 'geometry', 'properties', 'graphics'])
                .then((res) => {
                    dispatch(setMap(res.data.map));
                    dispatch(ActionCreators.clearHistory())
                })
                .catch((err) => console.log(err));
            
        }
    }, []);

    useEffect(() => {
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
                            layer.bindTooltip('' + property[label.property], {
                                permanent: true,
                                direction: label.position,
                            });
                        }
                    },
                }).addTo(mapobj);
            }
        };

        clearMap();

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
        }

        if (map && refmap.current) {
            addJson(refmap.current, map);
        }
    }, [map]);

    if (!map) {
        return <div>Loading Map...</div>;
    }

    return (
        <div className="text-sm">
            <div className="flex px-2 gap-4 mb-2 text-2xl font-bold justify-between items-center">
                <div></div>
                <div className='flex gap-2'>
                    {map ? map.name : '---'}
                    <button
                        onClick={() => {
                            openCurrentModal('RENAME_MAP');
                        }}
                    >
                        <i className="fa fa-edit mr-2 text-xl text-indigo-500" />
                    </button>
                </div>

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
            </div>
            <div id="map" className="w-full h-[77vh] mt-[65px] !absolute"></div>
            {map ? <Toolbar /> : null}
        </div>
    );
};

export default EditMap;
