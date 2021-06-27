import { AuthenticationError } from "apollo-server-express";
import { AuthChecker } from "type-graphql";
import { Context } from "../Config/context";

// create auth checker function
export const authenticationChecker: AuthChecker<Context> = 
({ context: { user } }, role) => {
  if (role.length === 0) {
    // if `@Authorized()`, check only if user exists
    return user !== undefined;
  }
  // there are some roles defined now

  if (!user) {
    // throw new AuthenticationError('Not authorized');
    // and if no user, restrict access
    return false;
  }
  if (user.role.includes("ADMIN" || "TEACHER")) {
    // grant access if the roles overlap
    return true;
  }

  // no roles matched, restrict access
  return false;
};