import Permissions from "./Permissions";

export const Roles = () => {
  USER: [
    Permissions.CAN_VIEW_PROFILE,
  ];
  JURY: [
    Permissions.CAN_VIEW_PROFILE,
  ];
  MODERATOR: [
    Permissions.CAN_VIEW_PROFILE,
  ];
  ADMIN: [
    Permissions.CAN_VIEW_PROFILE,
  ];
};

export default Roles;