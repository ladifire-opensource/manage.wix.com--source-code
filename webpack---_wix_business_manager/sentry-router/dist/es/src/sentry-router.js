import { getStackFrames } from './get-stack-frames';
import { omit } from 'lodash';
import { addSentryEventProcessor, SentryEventHandlerResponse } from './add-sentry-event-processor';
var clients = {};
export var registerSentryClient = function (clientId, client) { return clients[clientId] = client; };
export var registerErrorMonitor = function (clientId, client) { return clients[clientId] = client; };
export var initSentryRouter = function (_a) {
    var untrackedClient = _a.untrackedClient, excludedFilenames = _a.excludedFilenames, getCurrentClientId = _a.getCurrentClientId;
    var sentryEventProcessor = function (event) {
        if (someStackFrameExcluded(event, excludedFilenames)) {
            return SentryEventHandlerResponse.UNHANDLED;
        }
        return routeSentryEvent(event, getCurrentClientId(), untrackedClient);
    };
    addSentryEventProcessor(sentryEventProcessor);
};
var someStackFrameExcluded = function (event, excludedFilenames) {
    var frames = getStackFrames(event);
    var isValidNonEmptyStack = Array.isArray(frames) && frames.length > 0;
    if (!isValidNonEmptyStack) {
        return false;
    }
    return frames.every(function (frame) { return excludedFilenames.includes(frame.filename); });
};
var routeSentryEvent = function (event, currentClientId, untrackedClient) {
    if (currentClientId) {
        var client = clients[currentClientId] || untrackedClient;
        if (client === untrackedClient) {
            addClientIdTag(event, currentClientId);
        }
        client.captureEvent(removeBusinessManagerData(event));
        return SentryEventHandlerResponse.HANDLED;
    }
    return SentryEventHandlerResponse.UNHANDLED;
};
var addClientIdTag = function (event, currentClientId) {
    event.tags = event.tags || {};
    event.tags.clientId = currentClientId;
    return event;
};
var removeBusinessManagerData = function (event) {
    return omit(event, ['release', 'environment']);
};
//# sourceMappingURL=sentry-router.js.map