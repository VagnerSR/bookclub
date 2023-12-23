import userResolvers from "./user";
import merge from "lodash.merge";
import clubResolvers from "./club";

const resolvers = merge({}, userResolvers, clubResolvers);

export default resolvers;
