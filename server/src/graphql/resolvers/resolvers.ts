import userResolvers from "./user";
import merge from "lodash.merge";
import clubResolvers from "./club";
import bookResolvers from "./book";

const resolvers = merge({}, userResolvers, clubResolvers, bookResolvers);

export default resolvers;
