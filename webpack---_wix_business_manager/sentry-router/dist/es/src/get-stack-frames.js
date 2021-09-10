// Behavior assumed correct based on Sentry code: https://git.io/fp9nq
var getStacktraceFromException = function (exception) { return exception && exception.values && exception.values[0] && exception.values[0].stacktrace; };
export var getStackFrames = function (event) {
    var stacktrace = getStacktraceFromException(event.exception) || event.stacktrace;
    return stacktrace && stacktrace.frames;
};
//# sourceMappingURL=get-stack-frames.js.map