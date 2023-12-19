const mongoose = require("mongoose");

const { findToken } = require("../auth");
const { sendError } = require("../helpers");

const Map = require("../models/Map");
const MapGeometries = require("../models/MapGeometries");
const MapProperties = require('../models/MapProperties');
const MapGraphics = require("../models/MapGraphics");
const MapComment = require("../models/MapComment");

const getMaps = async (req, res) => {
    const options = {};

    switch (req.query.view) {
        case "home":
            const verify = findToken(req);
            if (!verify) return sendError(res, "You are not logged in to view the home screen.")
            options.owner = req.userId;
            break;
        
        case "explore":
            options["social.publishedDate"] = { $ne: null };
            break;
    
        default:
            return sendError(res, "There was an error retrieving maps.")
    }

    Map.find(options)
        .populate([{ path: 'owner', select: 'username' }])
        .then((maps) => {
            return res.status(200).json({ maps: maps });
        })
        .catch((err) => {
            return sendError(res, "There was an error retrieving maps.")
        });
};

const createMap = async (req, res) => {
    const body = req.body;

    // TODO: Verify body and other body data.
    if (!body) {
        return sendError(res, "You must provide map data.");
    }

    // TODO: Add error checking.

    // MapGeometries
    const geometry = new MapGeometries({
        data: body.geometry
    });
    await geometry.save();

    // MapProperties
    const properties = new MapProperties({
        data: body.properties
    });
    await properties.save();

    // MapGraphics
    const graphics = new MapGraphics(body.graphics);
    await graphics.save();

    const map = new Map({
        name: body.name,
        owner: req.userId,
        tags: [],
        geometry: geometry._id,
        properties: properties._id,
        graphics: graphics._id,
        social: {
            views: 0,
            likes: [],
            dislikes: [],
            comments: [],
            image: body.social.image
        }
    });

    if (!map) {
        return sendError(res);
    }

    map.save()
        .then(() => {
            return res.status(201).json({ id: map._id })
        })
        .catch((err) => {
            console.log(err);
            return sendError(res, "The map could not be saved and created.")
        })
};

const getMap = async (req, res) => {
    Map.findOne({ _id: req.params.id })
        .populate(req.query.populate)
        .then((map) => {
            return res.status(200).json({ map: map })
        })
        .catch(err => {
            console.log(err);
            return sendError(res, "The map could not be found.");
        });
};

// TODO: Update.
const updateMap = async (req, res) => {
    const body = req.body;
    // TODO: Verify body and other body data.
    if (!body) {
        return sendError(res, "You must provide map data.");
    }

    Map.findOne({ _id: req.params.id })
        .then((map) => {
            map.name = body.name;
            map.tags = body.tags;
            map.save()
                .then(() => {
                    MapGraphics.findOneAndUpdate({ _id: map.graphics }, body.graphics)
                        .then(() => {
                            MapProperties.findOneAndUpdate({ _id: map.properties }, body.properties)
                                .then(() => {
                                    return res.status(204).json({ id: map._id })
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return sendError(res, "The map could not be updated.")
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                            return sendError(res, "The map could not be updated.")
                        })
                })
                .catch((err) => {
                    console.log(err);
                    return sendError(res, "The map details could not be saved.")
                })
            
        })
        .catch(err => {
            console.log(err);
            return sendError(res, "The map could not be found.");
        });
};

const addComment = async (req, res) => {
    const body = req.body;
    // TODO: Verify body and other body data.
    if (!body) {
        return sendError(res, "You must provide comment data.");
    }

    // MapComment
    const comment = new MapComment({
        comment: body.comment,
		user: body.user
    });
    await comment.save();

    Map.findOne({ _id: req.params.id })
        .then((map) => {
            map.social.comments.unshift(comment);
            map.save()
                .then(() => {
                    return res.status(204).json({ id: map._id })
                })
                .catch((err) => {
                    console.log(err);
                    return sendError(res, "The comment could not be saved.")
                })
                
        })
        .catch(err => {
            console.log(err);
            return sendError(res, "The map could not be found.");
        });    
};

const updateImage = async (req, res) => {
    const body = req.body;

    // TODO: Verify body and other body data.
    if (!body) {
        return sendError(res, "You must provide map data.");
    }

    Map.findOne({ _id: req.params.id })
        .then((map) => {
            map.social.image = body.image;
            map.save()
                .then(() => {
                    return res.status(204).json({ id: map._id })
                })
                .catch((err) => {
                    console.log(err);
                    return sendError(res, "The image could not be saved.")
                })
                
        })
        .catch(err => {
            console.log(err);
            return sendError(res, "The map could not be found.");
        });    
};

const publishMap = async (req, res) => {
    Map.findOne({ _id: req.params.id })
        .then((map) => {
            map.social.publishedDate = new Date();
            map.save()
                .then(() => {
                    return res.status(204).json({ id: map._id })
                })
                .catch((err) => {
                    console.log(err);
                    return sendError(res, "The image could not be saved.")
                })
                
        })
        .catch(err => {
            console.log(err);
            return sendError(res, "The map could not be found.");
        });    
};

const deleteMap = async (req, res) => {
    Map.deleteOne({ _id: req.params.id })
        .then(() => {
            return res.status(200).send();
        })
        .catch((err) => {
            console.log(err);
            return sendError(res, "The map could not be found and deleted.")
        });
};

const forkMap = async (req, res) => {
    Map.findOne({ _id: req.params.id })
        .populate(['geometry', 'properties', 'graphics'])
        .then(async (map) => {
            // MapGeometries
            const newGeometries = map.geometry.data;
            newGeometries._id = new mongoose.Types.ObjectId();
            newGeometries.isNew = true;
            const geometry = new MapGeometries({
                data: newGeometries
            });
            await geometry.save();
        
            // MapProperties
            const newProperties = map.properties.data;
            newProperties._id = new mongoose.Types.ObjectId();
            newProperties.isNew = true;
            const properties = new MapProperties({
                data: newProperties
            });
            await properties.save();
        
            // MapGraphics
            const newGraphics = map.graphics;
            newGraphics._id = new mongoose.Types.ObjectId();
            newGraphics.isNew = true;
            const graphics = new MapGraphics(newGraphics);
            await graphics.save();
        
            const newMap = new Map({
                name: req.body.name,
                owner: req.userId,
                tags: [],
                geometry: geometry._id,
                properties: properties._id,
                graphics: graphics._id,
                social: {
                    views: 0,
                    likes: [],
                    dislikes: [],
                    comments: [],
                    image: map.social.image
                }
            });
        
            if (!newMap) {
                return sendError(res);
            }
        
            newMap.save()
                .then(() => {
                    return res.status(201).json({ id: newMap._id })
                })
                .catch((err) => {
                    console.log(err);
                    return sendError(res, "The map could not be saved and created.")
                })
        })
        .catch(err => {
            console.log(err);
            return sendError(res, "The map could not be found.");
        });
};

// Kevin code - addLike() api function

const addLike = async (req, res) => {
    const body = req.body;

    if (!body) {
        return sendError(res, "Error has arisen from attempt to like.");
    };

    Map.findOne({ _id: req.params.id })
        .populate(["social.comments",  {path: "social.comments", populate: {path: 'user'}}])
        .then((map) => {
            const listLikes = map.social.likes;
            const listDislikes = map.social.dislikes;

            if (listLikes.indexOf(req.userId) >= 0) {
                listLikes.splice(listLikes.indexOf(req.userId), 1);
                map.social.likes = listLikes;
            } else if (listDislikes.indexOf(req.userId) >= 0) {
                listDislikes.splice(listDislikes.indexOf(req.userId), 1);
                map.social.dislikes = listDislikes;
                map.social.likes.push(req.userId);
            } else {
                map.social.likes.push(req.userId);
            };
            map.save()
                .then(() => {
                    return res.status(201).json({ id: map._id, social: map.social });
                }).catch((err) => {
                    console.log(err);
                    return sendError(res, 'The process of adding like could not be saved');
                });
        }).catch((err) => {
            console.log(err);
            return sendError(res, 'The map could not be found.');
        });
};

// Kevin code - addDislike() api function

const addDislike = async (req, res) => {
    const body = req.body;

    if (!body) {
        return sendError(res, "Error has arisen from attempt to dislike.");
    };

    Map.findOne({ _id: req.params.id })
        .populate(["social.comments",  {path: "social.comments", populate: {path: 'user'}}])
        .then((map) => {
            const listLikes = map.social.likes;
            const listDislikes = map.social.dislikes;

            if (listDislikes.indexOf(req.userId) >= 0) {
                // User already has dislike on map. Will remove dislike.
                listDislikes.splice(listDislikes.indexOf(req.userId), 1);
                map.social.dislikes = listDislikes;
            } else if (listLikes.indexOf(req.userId) >= 0) {
                // User already has like on map. Will remove like.
                listLikes.splice(listLikes.indexOf(req.userId), 1);
                map.social.likes = listLikes;
                map.social.dislikes.push(req.userId);
            } else {
                // User has no likes or dislikes. Will add dislike.
                map.social.dislikes.push(req.userId);
            };
            map.save()
                .then(() => {
                    return res.status(201).json({  id: map._id, social: map.social });
                }).catch((err) => {
                    console.log(err);
                    return sendError(res, 'The process of adding like could not be saved');
                });
        }).catch((err) => {
            console.log(err);
            return sendError(res, 'The map could not be found.');
        });
};

module.exports = {
    getMaps,
    createMap,
    getMap,
    updateMap,
    updateImage,
    publishMap,
    deleteMap,
    forkMap,
    addComment,
    addLike,
    addDislike,
};