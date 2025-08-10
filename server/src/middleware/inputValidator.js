import Joi from "joi";

const empSchema = Joi.object({
  name: Joi.string().min(3).required(),
  department: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  role: Joi.string().min(3).required(),
});

const validateEmp = (req, res, next) => {
  const { error } = empSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

export default validateEmp;
