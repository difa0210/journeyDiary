const joi = require("joi");

const { User, Journey } = require("../../models");

exports.addJourney = async (req, res) => {
  const schema = joi.object({
    title: joi.string(),
    description: joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error,
    });

  try {
    const body = req.body;
    const file = req.file.filename;
    const data = { body, file };
    const newJourney = await Journey.create({
      ...data,
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
      date: req.date,
    });

    const getJourney = await Journey.findOne({
      where: {
        id: newJourney.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(200).send({
      message: "success",
      getJourney,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getJourneysUser = async (req, res) => {
  try {
    const profile = await Journey.findAll({
      where: { userId: req.user.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(200).send({
      message: "success",
      data: {
        allprofile: profile.map((item) => ({
          date: item.date,
          description: item.description,
          id: item.id,
          image: item.image,
          title: item.title,
          userId: item.User.id,
          name: item.User.name,
          email: item.User.email,
          phone: item.User.phone,
          address: item.User.address,
        })),
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    res.status(200).send({
      message: "success",
      journeys,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getJourneyDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const journey = await Journey.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    res.status(200).send({
      message: "success",
      journey: {
        date: journey.date,
        description: journey.description,
        id: journey.id,
        image: journey.image,
        title: journey.title,
        userId: journey.userId,
        name: journey.User.name,
        address: journey.User.address,
        email: journey.User.email,
        phone: journey.User.phone,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
