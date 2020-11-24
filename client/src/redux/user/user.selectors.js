import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsChangingAuthState = createSelector(
  [selectUser],
  (user) => user.isChangingAuthState
);

export const selectUserLoadingText = createSelector(
  [selectUser],
  (user) => user.loadingText
);

export const selectWasSignedIn = createSelector(
  [selectCurrentUser],
  (currentUser) => Boolean(currentUser)
);

export const selectHasAutoSignedIn = createSelector(
  [selectUser],
  (user) => user.hasAutoSignedIn
);
