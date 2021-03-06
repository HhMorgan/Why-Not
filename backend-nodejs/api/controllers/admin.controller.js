var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
  Tag = mongoose.model('Tag'),
  User = mongoose.model('User'),
  Color = mongoose.model('Color'),
  Requests = mongoose.model('Request');


module.exports.getColors = function (req, res, next) {
  Color.find({}).exec(function (err, Color) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Colors retrieved successfully.',
      data: Color
    });
  });
};

module.exports.AddColor = function (req, res, next) {
  Color.create(req.body, function (err, Color) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      err: null,
      msg: 'Color was added Sucessfully.',
      data: Color
    });
  });
};

module.exports.AddColorToTag = function (req, res, next) {
  Color.findOne({
    name: { $eq: req.body[0].name },
  }, function (err, Color) {
    if (err) {
      return next(err);
    }
    if (!Color) {
      return res.status(404).json({
        err: null,
        msg: 'This Color is not found or is blocked.   Please request this Color first then add it as speciality',
        data: null
      });
    }
    //need to check on role first before adding the speciality
    // If Tag was found in tag table then add it in user table
    Tag.findOneAndUpdate(
      // email : {$eq: req.body.email } , 
      { name: { $eq: req.body[1].name } },
      { $set: { color: Color } },
      { new: true }, function (err, Tag) {
        if (err) {
          return next(err);
        }
        if (!Tag) {
          return res.status(404).json({
            err: null,
            msg: 'Speciality could not be added either it already exists or u are not an expert or a user',
            data: null
          });
        }
        return res.status(201).json({
          err: null,
          msg: 'Color added',
          data: Tag.color
        });
      });
  });
};

module.exports.editTag = function (req, res, next) {
  // below we chck if the Id given by the edit tag method exists 
  if (!Validations.isObjectId(req.params.tagId)) {
    return res.status(422).json({
      err: null,
      msg: 'TagId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
    req.body.name &&
    Validations.isString(req.body.name)
  //then we check if the tag name is given as an input
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) is a required field.',
      data: null
    });
  }
  // Security Check
  //delete req.body.createdAt;
  //req.body.updatedAt = moment().toDate();
  // this method finds the Tag in the backend using the given Id and updates it's data
  // to match that of the input's and returns 200 is sucessfull
  Tag.findByIdAndUpdate(
    req.params.tagId,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function (err, updatedTag) {
    if (err) {
      return next(err);
    }
    if (!updatedTag) {
      return res
        .status(404)
        .json({ err: null, msg: 'Tag not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Tag was updated successfully.',
      data: updatedTag
    });
  });
};

//this method retreives all the tags from the backend and returns them in an array
// of tags
module.exports.getTags = function (req, res, next) {
  Tag.find({}).exec(function (err, tag) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Tags retrieved successfully.',
      data: tag
    });
  });
};

module.exports.deleteTags = function (req, res, next) {
  //checks if the tag Id exists
  if (!Validations.isObjectId(req.params.tagId)) {
    return res.status(422).json({
      err: null,
      msg: 'TagId parameter must be a valid ObjectId.',
      data: null
    });
  }
  // this method finds the tag by the Id given as input and removes it from the database
  Tag.findByIdAndRemove(req.params.tagId, function (err, deletedTags) {
    if (err) {
      return next(err);
    }
    if (!deletedTags) {
      return res
        .status(404)
        .json({ err: null, msg: 'Tag not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Tag was deleted successfully.',
      data: deletedTags
    });
  });
};

module.exports.BlockAndUnblock = function (req, res, next) {
  if (!Validations.isObjectId(req.params.userId)) {
    return res.status(422).json({
      err: null,
      msg: 'userId parameter must be a valid ObjectId.',
      data: null
    });
  }

  User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: req.body

    },
    { new: true }
  ).exec(function (err, blockeduser) {
    if (err) {
      return next(err);
    }
    if (!blockeduser) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'User was blocked/Unblocked successfully.',
      data: blockeduser
    });
  });
};

module.exports.ChangeRole = function (req, res, next) {
  if (!Validations.isObjectId(req.params.userId)) {
    return res.status(422).json({
      err: null,
      msg: 'userId parameter must be a valid ObjectId.',
      data: null
    });
  }

  User.findByIdAndUpdate(

    req.params.userId,
    {
      $set: req.body

    },
    { new: true }
  ).exec(function (err, blockeduser) {
    if (err) {
      return next(err);
    }
    if (!blockeduser) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'User status change was successful.',
      data: { _id: blockeduser._id, username: blockeduser.username, role: blockeduser.role }
    });
  });


}

module.exports.getUsers = function (req, res, next) {
  User.find({ _id: { $ne: req.decodedToken.user._id } }, { _id: 1, username: 1, email: 1, role: 1, blocked: 1, isVerified: 1, rating: 1 }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({
      err: null,
      msg: 'Users retrieved successfully.',
      data: user
    });
  });
};

module.exports.verifyUser = function (req, res, next) {
  if (!Validations.isObjectId(req.params.userId)) {
    return res.status(422).json({
      err: null,
      msg: 'userId parameter must be a valid ObjectId.',
      data: null
    });
  } else {
    User.findOneAndUpdate({ _id: req.params.userId, isVerified: false }, {
      $set:
        { isVerified: true }, $unset: { verificationToken: 1 }
    }, { new: true }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        return res.status(202).json({
          err: null,
          msg: 'User Verfied successfully.',
          data: user
        });
      } else {
        return res.status(304).json({
          err: null,
          msg: 'unable to verify User',
          data: null
        });
      }
    })
  }
}

module.exports.changeUsername = function (req, res, next) {
  var valid = req.params.userId && Validations.isObjectId(req.params.userId) &&
    req.body.username && Validations.isString(req.body.username);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'userId | username  is not valid',
      data: null
    });
  } else {
    User.findById(req.params.userId, function (err, user) {
      if (user) {
        User.findOne({ username: req.body.username }, function (err, confictUser) {
          if (confictUser) {
            return res.status(304).json({
              err: null,
              msg: 'Username Already Exists.',
              data: null
            });
          } else {
            user.username = req.body.username;
            user.save(function (err) {
              if (!err) {
                return res.status(202).json({
                  err: null,
                  msg: 'User Updated successfully.',
                  data: null
                });
              }
            })
          }
        })
      } else {
        return res.status(404).json({
          err: null,
          msg: 'Unable to find User',
          data: null
        });
      }
    });
  }
}

// --------------------------/getting requests from user to be Expert and admin shows it/--------------------------------------------

module.exports.getRequestsFromUsersToBeExpert = function (req, res, next) {
  Requests.find({ type: 'upgradeToExpert', recipient: 'admin' }, { sender: 1, recipient: 1, status: 1, type: 1 }).exec(function (err, request) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'requests retrieved successfully',
      data: request
    });
  });
};
