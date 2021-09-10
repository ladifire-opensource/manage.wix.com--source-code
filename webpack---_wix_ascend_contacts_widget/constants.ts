import { ContactActivityType } from '@wix/ambassador-contacts-app/types';

export const REFERRER = 'contacts_widget_BM';

export const BASE_URL = '/_api/contacts/';

export const MAP_ACTIVITY_TO_KEY = {
  [ContactActivityType.GENERAL]: 'contacts-widget.contact.lastActivityGeneral',
  [ContactActivityType.FORM_SUBMITTED]:
    'contacts-widget.contact.lastActivityContactForm',
  [ContactActivityType.NEWSLETTER_SUBSCRIPTION_FORM_SUBMITTED]:
    'contacts-widget.contact.lastActivitySubscription',
  [ContactActivityType.ECOM_PURCHASE]:
    'contacts-widget.contact.lastActivityPurchase',
  [ContactActivityType.HOTELS_RESERVATION]:
    'contacts-widget.contact.lastActivityReservation',
  [ContactActivityType.HOTELS_PURCHASE]:
    'contacts-widget.contact.lastActivityReservation',
  [ContactActivityType.MEMBER_LOGIN]:
    'contacts-widget.contact.lastActivityLoggedIn',
  [ContactActivityType.MEMBER_STATUS_CHANGED]:
    'contacts-widget.contact.lastActivitySiteMemberApproved',
  [ContactActivityType.MEMBER_REGISTER]:
    'contacts-widget.contact.lastActivityRegister',
  [ContactActivityType.INBOX_MESSAGE_TO_CUSTOMER]:
    'contacts-widget.contact.lastActivityMessageReceived',
  [ContactActivityType.BOOKINGS_APPOINTMENT]:
    'contacts-widget.contact.lastActivityAppointment',
  [ContactActivityType.INVOICE_PAY]:
    'contacts-widget.contact.lastActivityInvoice',
  [ContactActivityType.CONTACT_CREATED]:
    'contacts-widget.contact.lastActivityContactCreated',
  [ContactActivityType.VIDEO_PURCHASE]:
    'contacts-widget.contact.lastActivityVideoPurchase',
  [ContactActivityType.VIDEO_RENT]:
    'contacts-widget.contact.lastActivityVideoRent',
  [ContactActivityType.NEWSLETTER_SUBSCRIPTION_UNSUBSCRIBE]:
    'contacts-widget.contact.lastActivityContactUnsubscribed',
  [ContactActivityType.ARENA_NEW_LEAD]:
    'contacts-widget.contact.lastActivityNewArenaLead',
  [ContactActivityType.CASHIER_BUTTON_PURCHASE]:
    'contacts-widget.contact.lastActivityCashierButtonPurchase',
  [ContactActivityType.INBOX_PAYMENT_REQUEST_PAID]:
    'contacts-widget.contact.lastActivityChatPaymentRequestPaid',
  [ContactActivityType.ECOM_CART_ABANDON]:
    'contacts-widget.contact.lastActivityEcommCartAbandon',
  [ContactActivityType.EVENTS_RSVP]:
    'contacts-widget.contact.lastActivityEventsRsvp',
  [ContactActivityType.INBOX_FORM_SUBMITTED]:
    'contacts-widget.contact.lastActivityFormLeadCaptureForm',
  [ContactActivityType.HOTELS_CANCEL]:
    'contacts-widget.contact.lastActivityHotelsCancel',
  [ContactActivityType.HOTELS_CONFIRMATION]:
    'contacts-widget.contact.lastActivityHotelsConfirmation',
  [ContactActivityType.INVOICE_OVERDUE]:
    'contacts-widget.contact.lastActivityInvoiceOverdue',
  [ContactActivityType.PRICE_QUOTE_ACCEPT]:
    'contacts-widget.contact.lastActivityPriceQuoteAccept',
  [ContactActivityType.PRICE_QUOTE_EXPIRE]:
    'contacts-widget.contact.lastActivityPriceQuoteExpire',
  [ContactActivityType.RESTAURANTS_ORDER]:
    'contacts-widget.contact.lastActivityRestaurantsOrder',
  [ContactActivityType.RESTAURANTS_RESERVATION]:
    'contacts-widget.contact.lastActivityRestaurantsReservation',
  [ContactActivityType.SHOUTOUT_CLICK]:
    'contacts-widget.contact.lastActivityShoutOutClick',
  [ContactActivityType.SHOUTOUT_OPEN]:
    'contacts-widget.contact.lastActivityShoutOutOpen',
  [ContactActivityType.INBOX_MESSAGE_FROM_CUSTOMER]:
    'contacts-widget.contact.lastActivityRepliedToMessage',
  [ContactActivityType.ECOM_CHECKOUT_BUYER]:
    'contacts-widget.contact.lastActivityContactCreated',
  [ContactActivityType.CONTACT_MERGED]:
    'contacts-widget.contact.lastActivityContactCreated',
};
