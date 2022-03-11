const joi = require("joi");
const { Op } = require("sequelize");
const { User, Journey, Bookmark } = require("../../models");

exports.addBookmark = async (req, res) => {
  const schema = joi.object({
    journeyId: joi.array(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error,
    });
  try {
    const body = req.body;
    const getJourney = await Journey.findOne({
      where: { id: body.journeyId },
      attributes: {
        exclude: ["createdAt"],
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
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const getBookmark = await Bookmark.create({
      userId: req.user.id,
      journeyId: getJourney.id,
    });

    console.log(getJourney);

    res.status(200).send({
      message: "success",
      data: { getBookmark },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: { userId: req.user.id },
      attributes: {
        exclude: ["createdAt"],
      },
      include: [
        {
          model: Journey,
          as: "Journey",
          include: [
            {
              model: User,
              as: "User",

              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(200).send({
      message: "success",
      bookmarks,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    await Bookmark.destroy({
      where: {
        id,
      },
    });
    res.status(201).send({
      status: "delete success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
