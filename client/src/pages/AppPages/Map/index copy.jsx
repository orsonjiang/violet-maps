import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as L from 'leaflet';
import apis from "../../../api/api.js";

import { setModal } from "../../../actions/modal";

import CommentCard from "./components/CommentCard";

const Map = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState("none");
    const [text, setText] = useState("");

    const currentModal = useSelector((state) => state.modal.currentModal);
    const mapObject = useSelector((state) => state.map);
    const currentMap = mapObject.map;
    const { user } = useSelector((state) => state.user);

    const refMap = useRef(null);
    const layerControl = useRef(null); // keeping track of the layer control so that I can delete it later
    const legendControl = useRef(null); // keeping track of legend so that I can delete later
    const { id } = useParams();
    const { map } = useSelector((state) => state.map.present);


    const dispatch = useDispatch();


    const handleUpdateText = (event) => {
        setText(event.target.value);
    }

    const handleAddComment = (event) => {
        if (event.code === "Enter"){
            console.log(text);
            console.log(user);

            const initials = user.firstName.charAt(0) + user.lastName.charAt(0);

            const newComment = {
                comment: text,
                userReference: user,
                username: user.username,
                userInitial: initials,
                datePublished: new Date()
            }

            const updates = {...currentMap};
            delete updates["data"];

            updates.social.comments.unshift(newComment);
            // console.log(currentMap);

            
            apis.updateMap(currentMap._id, updates).then((res) => {
                console.log(res);
                // dispatch(updateMapInStore(updates))
                ref.current.value = "";
            }).catch((err) => {
                console.log(err);
            })
        }
    }

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
                })
                .catch((err) => console.log(err));
        }
    }, []);

    useEffect(() => {
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
    }, [map])

    return(<div> <div id="map" className="h-[60vh] rounded-lg shadow-md"></div></div>)

    return (
        <div>
            {map ? 
            <div className="md:grid grid-cols-3 gap-5 m-10 pb-10 max-md:block">
                {currentModal == "FORK_MODAL" ? <Modal title={"Fork Map?"} description={"Confirm by typing a name for the Map of Europe"} inputText={"Enter Map Name"} containsInput={true} /> : ""}
                <div className='col-span-2'>
                    <div id="map" className="h-[60vh] rounded-lg shadow-md"></div>
                    <div className='grid grid-cols-3 grid-row-2 my-4'>
                        <div className='col-span-1 row-span-2'>
                            <h3 className='font-semibold text-lg'>{currentMap.name}</h3>
                            <h4 className="">{currentMap.username}</h4>
                            <div className="flex gap-3 items-center mt-3 text-xs whitespace-nowrap">
                        
                                {currentMap.tags.length != 0 ? currentMap.tags.map((name) => {
                                    return ( <div className=" bg-violet-200 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                                        {name}
                                    </div>)
                                }) : (<div className="text-xs text-gray-300">No tags</div>)}
                            </div>
                        </div>
                        <div className='col-span-2 flex space-x-2 justify-end text-xs font-medium flex-wrap'>
                            <button data-cy="like" className='rounded-full bg-accent py-1.5 px-4 shadow-lg text-white' onClick={() => {handleInteraction("like")}}><i className="fa-solid fa-thumbs-up pr-2"></i>{currentMap.social.likes}</button>
                            <button className='rounded-full bg-accent py-1.5 px-4 shadow-lg text-white' onClick={() => { handleInteraction("dislike") }}><i className="fa-solid fa-thumbs-down pr-2"></i>{currentMap.social.dislikes}</button>
                            <div className="flex relative">
                                <button onClick={() => { setMenu("export") }} className='rounded-full bg-accent py-1.5 px-4 shadow-lg text-white'>
                                    <i className="fa-solid fa-file-export pr-2"></i>
                                    Export
                                </button>
                                {menu == "export" ? exportMenu : null}
                            </div>
                            <button className='rounded-full bg-accent py-1.5 px-4 shadow-lg text-white' onClick={() => { openCurrentModal("FORK_MODAL") }}><i className="fa-solid fa-copy pr-2" ></i>Fork</button>
                        </div>
                    </div>

                </div>
                <div className='col-span-1 bg-violet-100 rounded-lg self-start'>
                    <div className="m-5 mb-1 pb-2">
                        <h3 className="font-medium pt-5 md:pt-0">{`${currentMap.social.comments.length} Comments`}</h3>
                        <div className="mt-3 flex space-x-4">
                            <button className="flex gap-[1px] items-center justify-center h-10 w-10 shadow-none hover:shadow-none font-semibold bg-indigo-200 text-xs p-2 rounded-full shrink-0">
                                <p>{user.firstName.charAt(0)}</p>
                                <p>{user.lastName.charAt(0)}</p>
                            </button>
                            <input
                                type="search"
                                id="commentinput"
                                className="block px-3 w-full text-sm rounded-lg drop-shadow-sm focus:outline-none focus:ring-2"
                                placeholder="Add a comment..."
                                required=""
                                ref={ref}
                                onChange={handleUpdateText}
                                onKeyDown={handleAddComment}
                            />
                        </div>
                        <div className="overflow-hidden hover:overflow-y-scroll max-h-[30rem] mt-3 space-y-2">
                            {currentMap.social.comments.map((c) => {
                                return <CommentCard initials={c.userInitial} name={c.username} comment={c.comment} />
                            })}

                        </div>

                    </div>
                </div>
            </div> : null}
        </div>
    );
};

export default Map;


