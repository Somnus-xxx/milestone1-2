//To control the logical part of the project
/**
 * HOUSEController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //add create action
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('HOUSE/create');

        if (!req.body.HOUSE)
            return res.badRequest("404 ERROR!");

        if ( req.body.HOUSE.BedroomsNumber < 0 || req.body.HOUSE.GrossArea < 0 || req.body.HOUSE.Tenants < 0 || req.body.HOUSE.Rent < 0)
            return res.badRequest ("Input Invalidation! ");

        await HOUSE.create(req.body.HOUSE);
        return res.ok("Submitted!");
    },
    //add delete action
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await HOUSE.destroy(req.params.id).fetch();
        if (models.length == 0) return res.notFound();

        return res.ok("This Item Has Deleted.");

    },
    //add json action
    json: async function (req, res) {

        var houses = await HOUSE.find();

        return res.json(houses);
    },
    //add home action
    home: async function (req, res) {

        const limitation = 4;
        var models = await HOUSE.find({
            where: {HighLighted:"TRUE",},
            sort: 'createdAt DESC',
            limit: limitation,
        });
        if (req.wantsJSON){
            return res.json(models);
        } else{
        return res.view('HOUSE/home', { houses: models });
        }
    },
    //add details action
    details: async function (req, res) {
        //add timetrans function
        Rented = false;
        function timetrans(time) {
            var timetrans = new Date(time);
            var year = timetrans.getFullYear();
            var month = timetrans.getMonth() + 1;
            var date = timetrans.getDate();
            return date + "/" + month + "/" + year;
        }

        var model = await HOUSE.findOne(req.params.id);
        var createdTime = timetrans(model.createdAt);
        var updatedTime = timetrans(model.updatedAt);

        if (!model) return res.notFound();
        const theHOUSE = await HOUSE.findOne(req.params.id).populate("belong", { id: req.session.Id });

        if (theHOUSE.belong.length)
            Rented = true;
        return res.view('HOUSE/details', { createdTime: createdTime, updatedTime: updatedTime, HOUSE: model, Rented: Rented, });

    },
    //add update action
    update: async function (req, res) {

        if (req.method == "GET") {

            var model = await HOUSE.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('HOUSE/update', { HOUSE: model });

        } else {

            if (!req.body.HOUSE)
                return res.badRequest("Form-data not received.");

            var models = await HOUSE.update(req.params.id).set({
                name: req.body.HOUSE.name,
                Rent: req.body.HOUSE.Rent,
                ImageURL: req.body.HOUSE.ImageURL,
                Estate: req.body.HOUSE.Estate,
                BedroomsNumber: req.body.HOUSE.BedroomsNumber,
                GrossArea: req.body.HOUSE.GrossArea,
                Tenants: req.body.HOUSE.Tenants,
                HighLighted: req.body.HOUSE.HighLighted,

            }).fetch();

            if (models.length == 0) return res.notFound();
            if ( req.body.HOUSE.BedroomsNumber < 0 || req.body.HOUSE.GrossArea < 0 || req.body.HOUSE.Tenants < 0 || req.body.HOUSE.Rent < 0)
            return res.badRequest ("Input Invalidation! ");

            return res.ok("Record updated");

        }
    },

    //add admin action
    admin: async function (req, res) {

        var models = await HOUSE.find();
        return res.view('HOUSE/admin', { HOUSE: models });
    },
    //add search action
    search: async function (req, res) {

        var models = await HOUSE.find();
        // var models = [];
        var Count = 0;
        return res.view('HOUSE/search', { HOUSE: models, Count: Count });
    },





    //add query action
    query: async function (req, res) {
        const qName = req.query.name || "";
        const qBedroomsNumber = parseInt(req.query.BedroomsNumber);
        const qEstate = req.query.Estate;
        const qGrossArea = parseInt(req.query.GrossArea);
        const qRent = parseInt(req.query.Rent);
        const qMaxGrossArea = parseInt(req.query.MaxGrossArea);
        const qMinGrossArea = parseInt(req.query.MinGrossArea);
        const qMinRent = parseInt(req.query.MinRent);
        const qMaxRent = parseInt(req.query.MaxRent);



        if (isNaN(qBedroomsNumber)) {

            await SEARCH.destroy({});

            var Result = await HOUSE.find({
                where: { name: { contains: qName } },
            })
        } else if (!qEstate) {

            await SEARCH.destroy({});

            var Result = await HOUSE.find({
                where: { name: { contains: qName } },
            })
        } else {

            var Result = await HOUSE.find({
                where: {
                    name: { contains: qName },
                    BedroomsNumber: qBedroomsNumber,
                    Estate: qEstate,
                    GrossArea: { '>=': qMinGrossArea, '<=': qMaxGrossArea },
                    Rent: { '>=': qMinRent, '<=': qMaxRent },
                },
            });
        }

        Result.forEach(async function (result) {
            await SEARCH.create({
                name: result.name,
                Rent: result.Rent,
                ImageURL: result.ImageURL,
                Estate: result.Estate,
                BedroomsNumber: result.BedroomsNumber,
                GrossArea: result.GrossArea,
                Tenants: result.Tenants,
                HighLighted: result.HighLighted,
            });
        });

        return res.view('HOUSE/search', { HOUSE: Result, Count: Result.length });//, Count: models.length 
        // return res.view('HOUSE/paginate');
    },
    //add pagination action
    paginate: async function (req, res) {

        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const qnumOfItemsPerpage = 2;
        var models = await SEARCH.find({
            limit: qnumOfItemsPerpage,
            skip: qnumOfItemsPerpage * qPage
        });
        var numOfPage = Math.ceil(await SEARCH.count() / qnumOfItemsPerpage);

        return res.view('HOUSE/search', { HOUSE: models, Count: numOfPage });
    },
    occupants: async function (req, res) {
        var model = await HOUSE.findOne(req.params.id).populate("belong");

        if (!model) return res.notFound();

        // return res.json(model);
        return res.view("HOUSE/occupants", { assosiation: model });
    },
}; 