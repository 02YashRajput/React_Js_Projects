var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passport from "passport";
import { Strategy } from "passport-local";
import { Users } from "../mongoose/user.js";
import { comparePassword } from "../utils/helpers.js";
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield Users.findById(id);
        if (!findUser) {
            throw new Error("User not found");
        }
        done(null, findUser);
    }
    catch (err) {
        done(err, null);
    }
}));
export default passport.use(new Strategy({
    usernameField: "email", passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield Users.findOne({ email });
        if (!findUser) {
            throw new Error("User not Found");
        }
        if (!comparePassword(password, findUser.password)) {
            throw new Error("Invalid Password");
        }
        done(null, findUser);
    }
    catch (err) {
        done(err, false);
    }
})));
