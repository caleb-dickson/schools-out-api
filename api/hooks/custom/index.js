/**
 * @description :: The conventional "custom" hook.  Extends this app with custom server-start-time and request-time logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineCustomHook(sails) {
  return {
    /**
     * Runs when a Sails app loads/lifts.
     */
    initialize: async function () {
      sails.log.info("Initializing project hook... (`api/hooks/custom/`)");

      // Check Sendgrid configuration (for emails).
      var IMPORTANT_SENDGRID_CONFIG = [
        "sendgridSecret",
        "internalEmailAddress",
      ];
      var isMissingSendgridConfig =
        _.difference(
          IMPORTANT_SENDGRID_CONFIG,
          Object.keys(sails.config.custom)
        ).length > 0;

      if (isMissingSendgridConfig) {
        let missingFeatureText = isMissingSendgridConfig;
        let suffix = "";
        if (_.contains(["silly"], sails.config.log.level)) {
          suffix = `
> Tip: To exclude sensitive credentials from source control, use:
> • config/local.js (for local development)
> • environment variables (for production)
>
> If you want to check them in to source control, use:
> • config/custom.js  (for development)
> • config/env/staging.js  (for staging)
> • config/env/production.js  (for production)
>
> (See https://sailsjs.com/docs/concepts/configuration for help configuring Sails.)
`;
        }

        let problems = [];
        if (sails.config.custom.sendgridSecret === undefined) {
          problems.push(
            "No `sails.config.custom.sendgridSecret` was configured."
          );
        }
        if (sails.config.custom.internalEmailAddress === undefined) {
          problems.push(
            "No `sails.config.custom.internalEmailAddress` was configured."
          );
        }

        sails.log.verbose(
          `Some optional settings have not been configured yet:
---------------------------------------------------------------------
${problems.join("\n")}

Until this is addressed, this app's ${missingFeatureText} features
will be disabled and/or hidden in the UI.

 [?] If you're unsure or need advice, contact the server administrator.
---------------------------------------------------------------------${suffix}`
        );
      } //ﬁ

      // After "sails-hook-organics" finishes initializing, configure Sendgrid packs with any available credentials.
      sails.after("hook:organics:loaded", () => {
        sails.helpers.sendgrid.configure({
          secret: sails.config.custom.sendgridSecret,
          from: sails.config.custom.fromEmailAddress,
          fromName: sails.config.custom.fromName,
        });
      }); //_∏_

      // ... Any other app-specific setup code that needs to run on lift,
      // even in production, goes here ...
    },

    routes: {
      /**
       * Runs before every matching route.
       *
       * @param {Ref} req
       * @param {Ref} res
       * @param {Function} next
       */
      before: {
        "/*": {
          skipAssets: true,
          fn: async function (req, res, next) {
            var url = require("url");

            // If we're running in our actual "production" or "staging" Sails
            // environment, check if this is a GET request via some other host,
            // for example a subdomain like `webhooks.` or `click.`.  If so, we'll
            // automatically go ahead and redirect to the corresponding path under
            // our base URL, which is environment-specific.
            // > Note that we DO NOT redirect virtual socket requests and we DO NOT
            // > redirect non-GET requests (because it can confuse some 3rd party
            // > platforms that send webhook requests.)  We also DO NOT redirect
            // > requests in other environments to allow for flexibility during
            // > development (e.g. so you can preview an app running locally on
            // > your laptop using a local IP address or a tool like ngrok, in
            // > case you want to run it on a real, physical mobile/IoT device)
            var configuredBaseHostname;
            try {
              configuredBaseHostname = url.parse(
                sails.config.custom.baseUrl
              ).host;
            } catch (unusedErr) {
              /*…*/
            }
            if (
              (sails.config.environment === "staging" ||
                sails.config.environment === "production") &&
              !req.isSocket &&
              req.method === "GET" &&
              req.hostname !== configuredBaseHostname
            ) {
              sails.log.info(
                "Redirecting GET request from `" +
                  req.hostname +
                  "` to configured expected host (`" +
                  configuredBaseHostname +
                  "`)..."
              );
              return res.redirect(sails.config.custom.baseUrl + req.url);
            } //•

            // No session? Proceed as usual.
            // (e.g. request for a static asset)
            if (!req.session) {
              return next();
            }

            // Not logged in? Proceed as usual.
            if (!req.session.userId) {
              return next();
            }

            // Otherwise, look up the logged-in user.
            var loggedInUser = await User.findOne({
              id: req.session.userId,
            });

            // If the logged-in user has gone missing, log a warning,
            // wipe the user id from the requesting user agent's session,
            // and then send the "unauthorized" response.
            if (!loggedInUser) {
              sails.log.warn(
                "Somehow, the user record for the logged-in user (`" +
                  req.session.userId +
                  "`) has gone missing...."
              );
              delete req.session.userId;
              return res.unauthorized();
            }

            // Expose the user record as an extra property on the request object (`req.me`).
            // > Note that we make sure `req.me` doesn't already exist first.
            if (req.me !== undefined) {
              throw new Error(
                "Cannot attach logged-in user as `req.me` because this property already exists!  (Is it being attached somewhere else?)"
              );
            }
            req.me = loggedInUser;

            // If our "lastSeenAt" attribute for this user is at least a few seconds old, then set it
            // to the current timestamp.
            //
            // (Note: As an optimization, this is run behind the scenes to avoid adding needless latency.)
            var MS_TO_BUFFER = 60 * 1000;
            var now = Date.now();
            if (loggedInUser.lastSeenAt < now - MS_TO_BUFFER) {
              User.updateOne({ id: loggedInUser.id })
                .set({ lastSeenAt: now })
                .exec((err) => {
                  if (err) {
                    sails.log.error(
                      "Background task failed: Could not update user (`" +
                        loggedInUser.id +
                        "`) with a new `lastSeenAt` timestamp.  Error details: " +
                        err.stack
                    );
                    return;
                  } //•
                  sails.log.verbose(
                    "Updated the `lastSeenAt` timestamp for user `" +
                      loggedInUser.id +
                      "`."
                  );
                  // Nothing else to do here.
                }); //_∏_  (Meanwhile...)
            } //ﬁ

            return next();
          },
        },
      },
    },
  };
};
