import { BehaviorSubject } from "rxjs";

const currentAuthenticatedUser = new BehaviorSubject(
  JSON.parse(localStorage.getItem("AuthenticatedUser"))
);
class AuthenticationManager {
  setAuthenticatedUser = userData => {
    localStorage.setItem("AuthenticatedUser", JSON.stringify(userData));
    currentAuthenticatedUser.next(userData);
  };

  resetAuthenticatedUser = () => {
    localStorage.removeItem("AuthenticatedUser");
    currentAuthenticatedUser.next(null);
  };

  getAuthenticatedUser = () => {
    return JSON.parse(localStorage.getItem("AuthenticatedUser"));
  };

  isUserAuthenticated = () => {
    let authenticatedUser = this.getAuthenticatedUser();

    if (authenticatedUser) {
      return true;
    }

    return false;
  };

  getAuthenticationHeader = () => {
    let authenticatedUser = this.getAuthenticatedUser();

    if (authenticatedUser && authenticatedUser.Token) {
      return { Authorization: `Bearer ${authenticatedUser.Token}` };
    } else {
      return {};
    }
  };
}

export { AuthenticationManager };
export { currentAuthenticatedUser };
