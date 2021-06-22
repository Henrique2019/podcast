const mongoose = require('mongoose');
const Episodes = new mongoose.Schema({
    

    _id: { type: String, required: true},
    id: { type: String, required: true},
title: { type: String, required: true},
members: { type: String, required: true},
published_at: { type: Date, default: Date.now},
thumbnail: { type: String, required: true},
description: { type: String, required: true},
file: {
  url: { type: String, required: true},
  type: { type: String, required: true},
  duration: { type: Number, required: true },
 },
    
    createdAt: { type: Date, default: Date.now}

    },
{
    timestamps: true,
});

mongoose.model('episodes', Episodes);


