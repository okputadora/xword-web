import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import { updateUserPuzzle } from '../schemas/userPuzzle';
import { generateResponse } from '../utils';
import { UserPuzzle } from '../models';

const ObjectId = mongoose.Types.ObjectId;

export default {
  Mutation: {
    updateUserPuzzle: async (root, args, { req, res }, info) => {
      const validated = Joi.validate(args, updateUserPuzzle);
      if (validated.error) {
        return generateResponse(null, {
          message: validated.error.details.map(e => e.message).join(' '),
        });
      }
      const { _id, board, time } = args;
      const userPuzzle = await UserPuzzle.findByIdAndUpdate(
        _id,
        {
          board,
          time,
        },
        { new: true }
      );
      if (!userPuzzle) throw new Error('Internal Server Error');
      return userPuzzle;
    },
  },
};
