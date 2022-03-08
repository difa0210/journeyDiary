const joi = require("joi");
const { Op } = require("sequelize");
const { User, Journey, Bookmark } = require("../../models");

exports.addBookmark = async (req, res) => {
  const { journeyIds } = req.body;
  const schema = joi.object({
    journeyIds: joi.array(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error,
    });
  try {
    const getJourney = await Journey.findAll({
      where: { id: { [Op.in]: journeyIds } },
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

    for (let j = 0; j < getJourney.length; j++) {
      await Bookmark.create({
        userId: req.user.id,
        journeyId: getJourney[j].id,
      });
    }
    console.log(getJourney);

    res.status(200).send({
      message: "success",
      data: { getJourney },
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
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "User",
          include: [
            {
              model: Journey,
              as: "Journey",
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
