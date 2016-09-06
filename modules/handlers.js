"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

exports.searchHouse = (sender) => {
    messenger.send({text: `D'accord, je recherche les nouveaux projets ...`}, sender);
    salesforce.findProperties().then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_City = (sender, values) => {
    messenger.send({text: `D'accord, je recherche les projets à ${values[1]}`}, sender);
    salesforce.findProperties({city: values[1]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Bedrooms_City_Range = (sender, values) => {
    messenger.send({text: `C'est compris. Je recherche les ${values[1]} chambres à ${values[2]} entre ${values[3]} et ${values[4]}`}, sender);
    salesforce.findProperties({bedrooms: values[1], city: values[2]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Bedrooms_City = (sender, values) => {
    messenger.send({text: `Bien reçu. Je regarde les biens à ${values[1]} chambres à ${values[2]}`}, sender);
    salesforce.findProperties({bedrooms: values[1], city: values[2]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Bedrooms = (sender, values) => {
    messenger.send({text: `C'est noté. Voici les ${values[1]} chambres`}, sender);
    salesforce.findProperties({bedrooms: values[1]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Range = (sender, values) => {
    messenger.send({text: `Bien reçu. Voici les biens entre ${values[1]} et ${values[2]} euros :`}, sender);
    salesforce.findProperties({priceMin: values[1], priceMax: values[2]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.priceChanges = (sender, values) => {
    messenger.send({text: `D'accord; voici les biens dont le prix a évolué ces derniers jours :`}, sender);
    salesforce.findPriceChanges().then(priceChanges => {
        messenger.send(formatter.formatPriceChanges(priceChanges), sender);
    });
};

exports.hi = (sender) => {
    messenger.getUserInfo(sender).then(response => {
        messenger.send({text: `Bonjour, ${response.first_name}!`}, sender);
    });
};

exports.help = (sender) => {
    messenger.send({text: `Bienvenue dans votre asistant partenaire Schneider Electric. 
    Vous pouvez me poser des questions du type : "Quels sont les nouveaux projets ?", "Projets à Paris", "Projets près de Puteaux"..."`}, sender);
};
