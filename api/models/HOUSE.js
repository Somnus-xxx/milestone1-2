//The data portion used to process the project
/**
 * HOUSE.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
        //define database schema
        name: {
            type: "string",
            required: true,
            
        },
        Rent: {
            type: "number",
            required: true,
            min: 0,
            max: 99999999,
        },
        ImageURL: {
            type: "string",
            required: true,
            isURL: true,
        },
        Estate: {
            type: "string",
            required: true,
        },
        BedroomsNumber: {
            type: "number",
            required: true,
            min: 1,
            max: 10,
        },
        GrossArea: {
            type: "number",
            required: true,
            min: 0,
            max: 99999,
        },
        Tenants: {
            type: "number",
            required: true,
            min: 1,
            max: 10,
        },
        HighLighted: {
            type: "string",
        },

        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
        belong: {
            collection: "User",
            via: "hold",
        },


    },

};