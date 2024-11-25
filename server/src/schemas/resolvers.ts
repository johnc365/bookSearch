import User, { UserDocument } from '../models/User.js';
import { signToken, AuthenticationError } from '../services/auth.js';

const resolvers = {
  Query: {
    me: async (): Promise<UserDocument[] | null> => {
      return User.find({});
    },
  },
  Mutation: {
    addUser: async (_parent: any, args: any) => {
      const user = await User.create(args);
      const token = signToken(user.username, user.password, user._id);
      return {user, token};
    },
    login: async (_parent: any, { email, password }: { email: string, password: string}) => {
      const user = await User.findOne({ email });
      if (!user) {
        return AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return AuthenticationError;
      }
      const token = signToken(user.username, user.password, user._id);
      return ({ token, user });
    },
    saveBook: async (_parent: any, args: any, context: any) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: {...args} } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    removeBook: async (_parent: any, args: any, context: any) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: {bookId: args.bookId} } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
  },
};

export default resolvers;