export type ServiceFactory<Context, Service = any> = (ctx: Context) => Service;

// This type links between the object that is passed to initilizer and the params each factory receives (context)
export type ContextProperties<T> = T extends Record<string, ServiceFactory<any, any>>
  ? { [K in keyof T]: ReturnType<T[K]> }
  : never;

// This type links between the Context type that initializer returns and the params each factory receives.
export type InferedContextType<T> = T extends Record<string, ServiceFactory<infer R, any>>
  ? R
  : never;

// Here the above types complement each other and cover mistakes that could happen, such as:
// 1. Forgot to add service to the context type
// 2. forgot to add service factory to the object passed to initializer
export const initializeServices = <F extends Record<string, ServiceFactory<ContextProperties<F>>>>(
  factories: F,
): InferedContextType<F> => {
  return Object.entries(factories).reduce((context: any, [name, factory]) => {
    context[name] = factory(context);
    return context;
  }, {});
};
