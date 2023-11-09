import { asyncError } from "../middlewares/error.js";
import ContactModel from "../models/ContactModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendMailToUser } from "../utils/Mail.js";

export const submitForm = asyncError(async (req, res, next) => {
    const submitted = await ContactModel.create({
        email: req.body.email,
        name: req.body.name,
        message: req.body.message,
        user: req.user.id
    });

    if (!submitted) { return next(new ErrorHandler("Cannot Submit Your Form", 500)) }

    // const email = `amitkumar8017392@gmail.com , ${req.body.email}`;
    const subject = "Feedback 😀😀";
    const textForUser = "Thanks For your feedback we ensure to work on it ASAP. 😀😀";
    const textForOwner = "There is one feedback for your organisation";
    const htmlForUser = `<div><h2 style='text-align:center; color:#fc8019'>Pijja.com</h2><br/><h3 style='text-align:center;'>Hey.. ${req.body.name} Thanks for your feedback we ensure to work on it ASAP. 😀😀</h3><br/><h4>Your feedback : ${req.body.message}</h4></div>`;
    const htmlForOwner = `<div><h2 style='text-align:center; color:#fc8019'>Pijja.com</h2><br/><h3 style='text-align:center;'>There's an feedback for your orgainization.</h3><br/><h4>User Name : ${req.body.name} <br/> User Email : ${req.body.email} <br/> User feedback : ${req.body.message}</h4></div>`;

    sendMailToUser("amitkumar8017392@gmail.com" , subject , textForOwner , htmlForOwner) //owner
    sendMailToUser(req.body.email , subject , textForUser , htmlForUser ) //owner

    return res.status(200).json({
        msg: "Form Submitted We will contact you as soon as posibble",
    })
});

export const getAllSubmittedForm = asyncError(async (req, res, next) => {
    const forms = await ContactModel.find({ user: req.user.id });
    if (forms.length === 0) { return res.status(200).json({ msg: "Forms fetched succesfully", forms: [] }); }

    if (!forms) { return next(new ErrorHandler("Cannot fetch your form", 500)); }


    return res.status(200).json({
        msg: "Forms fetched succesfully",
        forms
    })
});

export const formDetail = asyncError(async (req, res, next) => {
    const form = await ContactModel.findById(req.params.id);
    if (!form) { return next(new ErrorHandler("Cannot fetch your form", 500)); }

    return res.status(200).json({
        msg: "Form Fetched Succesfully",
        form
    })
})