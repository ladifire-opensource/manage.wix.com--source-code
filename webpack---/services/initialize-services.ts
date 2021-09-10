import { ServiceRegistry } from '../actions/utils/service-registry';
import { OptionType } from '../types';
import { ContactsService } from './contacts/ContactsService';
import { SearchEverythingService } from './search-everything/SearchEverythingService';
import { AppMarketService } from './app-market/AppMarketService';
import { AnswersService } from './answers/AnswersService';

export function initializeServices() {
  ServiceRegistry.reset();
  ServiceRegistry.addSection(OptionType.Contacts, ContactsService);
  ServiceRegistry.addSection(OptionType.BusinessManager, SearchEverythingService);
  ServiceRegistry.addSection(OptionType.AppMarket, AppMarketService);
  ServiceRegistry.addSection(OptionType.Answers, AnswersService);
}
