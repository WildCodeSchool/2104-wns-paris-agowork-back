import { AuthenticationError, makeRemoteExecutableSchema } from "apollo-server-express";
import { AuthChecker } from "type-graphql";

// create auth checker function
export const authenticationChecker = 
({ context: { role } }: any, roles: string | any[]) => {
  if (roles.length === 0) {
    // if `@Authorized()`, check only if user exists
    return role !== undefined;
  }
  // there are some roles defined now
  
  if (!role) {
    // and if no user, restrict access
    return false;
  }
  if (Object.values(roles).includes(role)) {
    // grant access if the roles overlap
    return true;
  }
  // no roles matched, restrict access
  return false;
};
