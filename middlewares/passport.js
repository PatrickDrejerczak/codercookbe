const expressSession = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const FACEBOOK_CLIENT_ID = "556009778769056";
const FACEBOOK_CLIENT_SECRET = "522ae19b355343faa65a845b67901fb4";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID =
  "225674596115-sbh3q5p7autb5f6qnn13hds834d5ol7a.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "VHolJaCMykJ3HMiDTCuyBVPQ";

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/api/auth/facebookOK",
      profileFields: ["email"],
    },
    (accessToken, refreshToken, profile, callBack) => {
      callBack(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/googleOK",
    },
    (accessToken, refreshToken, profile, callBack) => {
      callBack(null, profile);
    }
  )
);

passport.serializeUser((user, callBack) => {
  callBack(null, user);
});
passport.deserializeUser((user, callBack) => {
  callBack(null, user);
});
