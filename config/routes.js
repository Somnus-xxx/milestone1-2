/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': 'UserController.login',
    'GET /HOUSE/create': 'HOUSEController.create',
    'POST /HOUSE/create': 'HOUSEController.create',
    'POST /HOUSE/delete/:id': 'HOUSEController.delete',
    'GET /HOUSE/json': 'HOUSEController.json',
    'GET /HOUSE/home': 'HOUSEController.home',
    'GET /HOUSE/details/:id': 'HOUSEController.details',
    'POST /HOUSE/delete/:id': 'HOUSEController.delete',
    'GET /HOUSE/update/:id': 'HOUSEController.update',
    'POST /HOUSE/update/:id': 'HOUSEController.update',
    'GET /HOUSE/search': 'HOUSEController.search',
    'GET /HOUSE/admin': 'HOUSEController.admin',
    'GET /HOUSE/query': 'HOUSEController.query',
    'GET /HOUSE/paginate': 'HOUSEController.paginate',
    'GET /user/login': 'UserController.login',
    'POST /user/login': 'UserController.login',
    'POST /user/logout': 'UserController.logout',
    'GET /user/json': 'UserController.json',
    // 'GET /HOUSE/MyRentals': 'HOUSEController.MyRentals',
    'GET /user/:id': 'UserController.addRent',
    'GET /user/MyRentals': 'UserController.MyRentals',
    'POST /user/MyRentals': 'UserController.MyRentals',
    'POST /user/:id/add/:fk': 'UserController.addRent',
    'POST /user/:id/delete/:fk': 'UserController.deleteRent',
    'GET /HOUSE/occupants/:id': 'HOUSEController.occupants',
    'PUT /user/add/:fk': 'UserController.sailsAddToMobile',
    'DELETE /user/delete/:fk': 'UserController.sailsDeleteToMobile',




    /***************************************************************************
     *                                                                          *
     * More custom routes here...                                               *
     * (See https://sailsjs.com/config/routes for examples.)                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the routes in this file, it   *
     * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
     * not match any of those, it is matched against static assets.             *
     *                                                                          *
     ***************************************************************************/


};