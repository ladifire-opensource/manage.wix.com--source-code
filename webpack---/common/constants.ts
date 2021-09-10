export const UNFULFILLED_ORDERS_WIDGET_ID = 'unfulfilled-store-orders-widget';
export const UNFULFILLED_ORDERS_BI_WIDGET_NAME = 'unfulfilled-store-orders-widget';
export const UNFULFILLED_ORDERS_REFERRER = 'stores-unfulfilled-widget-dashboard';
export const BI_APP_NAME = 'businessManagerStores';
export const BOOST_SALES_APP_STATE = 'suggestions/get_traffic';
export const GRAPH_QL_API_URL = 'https://manage.wix.com/_api/wixstores-graphql-server/graphql';
export const Filters = {
  UNFULFILLED_ORDERS: encodeURI(
    JSON.stringify({
      billingStatus: [],
      fulfillmentStatus: ['NOT_FULFILLED'],
      activeStatus: 'Active',
      channel: [],
      subscription: [],
      shippingFilters: [],
    })
  ),
};
