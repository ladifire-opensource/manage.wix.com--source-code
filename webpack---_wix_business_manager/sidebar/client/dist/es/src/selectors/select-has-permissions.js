export var selectIsOwner = function (state) { return state.isOwner; };
export var hasPermissions = function (state, permission) { return (state.isOwner || state.permissions.includes(permission)); };
//# sourceMappingURL=select-has-permissions.js.map