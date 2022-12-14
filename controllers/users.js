const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");


module.exports.registerForm = (req, res) => {
    res.render("users/register")
}

module.exports.register = catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to YelpCamp!");
            res.redirect("/campgrounds");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register")
    }
})

module.exports.loginForm = (req, res) => {
    if(req.query.returnTo){
        req.session.returnTo = req.query.returnTo;
    }
    res.render("users/login")
}

module.exports.login = catchAsync(async (req, res) => {
    req.flash("success", "Welcome back to YelpCamp!");
    const redirectUrl= res.locals.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
})

module.exports.logout= (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "See you next time!");
        res.redirect('/campgrounds');
    });
}