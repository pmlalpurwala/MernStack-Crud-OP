const express = require("express");
const { insertdata, showdata } = require("../controllers/crud");
const { celebrate, Segments, Joi } = require("celebrate");
const router = express.Router();
router.post(
  "/insert",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string()
        .regex(/^[a-zA-Z ]*$/)
        .required(),
      phoneNumber: Joi.string()
        .regex(/^[0-9]+$/)
        .min(10)
        .max(10)
        .required(),
      email: Joi.string().email().required(),
      hobbies: Joi.string().required(),
    }),
  }),
  insertdata
);
router.get(
  "/display",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      email: Joi.string().required(),
      hobbies: Joi.string().required(),
    },
  }),
  showdata
);
module.exports = router;
