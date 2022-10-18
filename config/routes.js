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

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  // --- Server Health Check ---
  "GET /ping": { action: "user/health" },

  // --- User Endpoints ---
  "GET /auth-check": { action: "user/test-auth" },
  "POST /signup": { action: "user/signup" },
  "PUT /login": { action: "user/login" },
  "PUT /logout": { action: "user/logout" },
  "PATCH /user/:userId": { action: "user/update-one" },

  // --- Campus Endpoints ---
  "POST /campus": { action: "campus/create-one" },
  "GET /campus/:campusId": { action: "campus/get-one" },
  "PATCH /campus/:campusId": { action: "campus/update-one" },
  "DELETE /campus/:campusId": { action: "campus/delete-one" },

  // --- Car Endpoints ---
  "POST /car": { action: "car/create-one" },
  "POST /cars": { action: "car/create-many" },
  "GET /car/:carId": { action: "car/get-one" },
  "PATCH /car": { action: "car/update-one" },
  "DELETE /car/:carId": { action: "car/delete-one" },

  // --- CarLine Endpoints ---
  "POST /carline": { action: "carline/create-one" },
  "GET /carlines/:campusId": { action: "carline/get-completed" },
  "PATCH /carline": { action: "carline/update-one" }, // Unnecessary endpoint?
  "DELETE /carline/:carLineId": { action: "carline/complete-one" },

  // --- Student Endpoints ---
  "POST /student": { action: "student/create-one" },
  "POST /students": { action: "student/create-many" },
  "GET /student/:studentId": { action: "student/get-one" },
  "PATCH /student": { action: "student/update-one" },
  "DELETE /student/:studentId": { action: "student/delete-one" },


  "POST  /sockets/observe-my-session": {
    action: "observe-my-session",
    hasSocketFeatures: true,
  },

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
