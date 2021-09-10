import * as types from '../actionTypes/embeddedServicesActionTypes';

export function embeddedServices(state = {}, action) {
  switch (action.type) {
    case types.FETCH_EMBEDDED_SERVICE_SUCCESS:
      return { ...state, [action.embeddedService.appDefinitionId]: action.embeddedService };
    case types.FETCH_EMBEDDED_SERVICES_SUCCESS:
      return action.embeddedServices;
    default:
      return state;
  }
}
