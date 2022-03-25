const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    hello: (_, args) => `Hello ${args.name}`,
    users: async () => {
      return prisma.user.findMany();
    },
    user: async (_, args, { dataSources }) => {
      return dataSources.jsonPlaceAPI.getUser(args.id);
    },
    posts: async (_, __, { dataSources }) => {
      return dataSources.jsonPlaceAPI.getPosts();
    },
  },
  Mutation: {
    createUser: (_, args) => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
        },
      });
    },
    updateUser: (_, args) => {
      return prisma.user.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          email: args.email,
        },
      });
    },
    deleteUser: (_, args) => {
      return prisma.user.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
  User: {
    myPosts: async (parent, __, { dataSources }) => {
      const posts = await dataSources.jsonPlaceAPI.getPosts();
      const myPosts = response.data.filter((post) => post.userId == parent.id);
      return myPosts;
    },
  },
};

module.exports = resolvers;
