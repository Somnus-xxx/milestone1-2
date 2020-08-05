/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).send("User not found");

        //if (user.password != req.body.password)
        const match = await sails.bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(401).send("Wrong Password!");

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            console.log(user.id);

            req.session.Username = req.body.username;
            req.session.Role = user.role;
            req.session.Id = user.id;

            sails.log("[Session] ", req.session);

            return res.ok("Login successfully.");

        });

    },
    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.ok("Log out successfully.");

        });
    },
    // json function
    json: async function (req, res) {

        var users = await User.find();

        return res.json(users);
    },

    addRent: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.notFound();

        const theHouse = await HOUSE.findOne(req.params.fk).populate("belong", { id: req.params.id });

        if (!theHouse) return res.notFound();

        if (theHouse.belong.length)
            return res.status(409).send("Already added.");

        const HOUSEObj = await HOUSE.findOne(req.params.fk).populate("belong");
        var remainTenant = HOUSEObj.Tenants - HOUSEObj.belong.length;

        if (remainTenant < 1)
            return res.status(409).send("Please rent other houses!");

        await User.addToCollection(req.params.id, "hold").members(req.params.fk);

        return res.ok('HOUSE Rented.');

    },

    deleteRent: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.notFound();

        const theHouse = await HOUSE.findOne(req.params.fk).populate("belong", { id: req.params.id });

        if (!theHouse) return res.notFound();

        if (!theHouse.belong.length)
            return res.status(409).send("You haven't rented it yet!");

        await User.removeFromCollection(req.params.id, "hold").members(req.params.fk);

        return res.ok('Rent Deleted.');

    },

    MyRentals: async function (req, res) {
        var myhouses = await User.findOne(req.session.Id).populate("hold");
        return res.view("user/MyRentals", { myhouses: myhouses.hold })
    },
    sailsAddToMobile: async function (req, res) {

        if (!await User.findOne(req.session.Id)) return res.notFound();

        const theHouse = await HOUSE.findOne(req.params.fk).populate("belong", { id: req.session.Id });

        if (!theHouse) return res.notFound();

        if (theHouse.belong.length)
            return res.status(409).send("Already added.");

        const HOUSEObj = await HOUSE.findOne(req.params.fk).populate("belong");
        var remainTenant = HOUSEObj.Tenants - HOUSEObj.belong.length;

        if (remainTenant < 1)
            return res.status(409).send("Please rent other houses!");

        await User.addToCollection(req.session.Id, "hold").members(req.params.fk);

        return res.ok('HOUSE Rented.');

    },
    sailsDeleteToMobile: async function (req, res) {

        if (!await User.findOne(req.session.Id)) return res.notFound();

        const theHouse = await HOUSE.findOne(req.params.fk).populate("belong", { id: req.session.Id });

        if (!theHouse) return res.notFound();

        if (!theHouse.belong.length)
            return res.status(409).send("You haven't rented it yet!");

        await User.removeFromCollection(req.session.Id, "hold").members(req.params.fk);

        return res.ok('Rent Deleted.');

    },
    
};

