const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  company: String,
  website: {
    type: String,
    validate: {
      validator: validateURL,
      message: '`{VALUE}` is not a valid URL',
    },
    // match: [
    //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    //   'Please use a valid URL with HTTP or HTTPS',
    // ],
  },
  location: {
    type: String,
    required: [true, 'Please add your city of location'],
  },
  status: {
    type: String,
    required: [true, 'Please add your status'],
  },
  skills: {
    type: [String],
    reguired: [true, 'Please add at least one skill'],
    minlength: 1,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio can not be more than 500 characters'],
  },
  githubusername: String,
  experience: [
    {
      title: {
        type: String,
        trim: true,
        required: [true, 'Please add your title'],
      },
      company: {
        type: String,
        required: [true, 'Please name the company'],
      },
      location: {
        type: String,
        required: [true, "Please name the company's location"],
      },
      from: {
        type: Date,
        required: [true, 'Please add starting date'],
      },
      to: {
        type: Date,
        required: [true, 'Please add finishing date'],
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        maxlength: [500, "Description can't be longer than 500 characters"],
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: [true, "Please add school's name"],
      },
      degree: {
        type: String,
        required: [true, 'Please add type of degree'],
      },
      fieldofstudy: {
        type: String,
        required: [true, 'Please add field of study'],
      },
      from: {
        type: Date,
        required: [true, 'Please add starting date'],
      },
      to: {
        type: Date,
        required: [true, 'Please add finishing date'],
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        trim: true,
        maxlength: [500, "Description can't be longer than 500 characters"],
      },
    },
  ],
  social: {
    youtube: {
      type: String,
      validate: {
        validator: validateURL,
        message: '`{VALUE}` is not a valid URL',
      },
    },
    twitter: {
      type: String,
      validate: {
        validator: validateURL,
        message: '`{VALUE}` is not a valid URL',
      },
    },
    facebook: {
      type: String,
      validate: {
        validator: validateURL,
        message: '`{VALUE}` is not a valid URL',
      },
    },
    linkedin: {
      type: String,
      validate: {
        validator: validateURL,
        message: '`{VALUE}` is not a valid URL',
      },
    },
    instagram: {
      type: String,
      validate: {
        validator: validateURL,
        message: '`{VALUE}` is not a valid URL',
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// URL validator function
function validateURL(str) {
  const isValidUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return isValidUrl.test(str);
}

// ProfileSchema.path('website').validate(
//   validateURL,
//   '`{VALUE}` is not a valid URL'
// );

module.exports = mongoose.model('profile', ProfileSchema);
