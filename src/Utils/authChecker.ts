import { AuthenticationError, makeRemoteExecutableSchema } from "apollo-server-express";
import { AuthChecker } from "type-graphql";

// create auth checker function
export const authenticationChecker = 
({ context: { authenticatedUserRole } }: any, roles: string | any[]) => {
  if (roles.length === 0) {
    // if `@Authorized()`, check only if user exists
    return authenticatedUserRole !== undefined;
  }
  // there are some roles defined now

  if (!authenticatedUserRole) {
    // throw new AuthenticationError('Not authorized');
    // and if no user, restrict access
    return false;
  }
  if (roles.includes(authenticatedUserRole)) {
    // grant access if the roles overlap
    return true;
  }

  // no roles matched, restrict access
  return false;
};
