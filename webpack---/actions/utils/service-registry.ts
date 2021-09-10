import { ISectionService, SearchableService, ISearchSectionsResult } from '../../types';
import { ISectionsPaging, ISectionPaging, ShowMoreType } from '../../types/store';

export class ServiceRegistry {

  private static _sections: string[] = [];
  private static _services: ISectionService[] = [];

  static reset() {
    this._sections = [];
    this._services = [];
  }

  static addSection(section: string, service: SearchableService) {
    this._sections.push(section);
    this._services.push({ section, service });
  }

  static getSectionNames(): string[] {
    return this._sections;
  }

  static getServices() {
    return this._services;
  }

  static getSectionPagingInfo(sectionResults: ISearchSectionsResult = null): ISectionsPaging {

    const { totalResults = null, availableResults = null } = sectionResults || {};

    const isEmptyResults = () => sectionResults === null;

    const wereResultsSuccessfull = (section: string) => !isNaN(totalResults[section]);

    const getTotalResults = (section: string) =>
      isEmptyResults() ? 0 :
        wereResultsSuccessfull(section) ? totalResults[section] : -1;

    const getAvailableResults = (section: string) =>
      isEmptyResults() ? 0 :
        wereResultsSuccessfull(section) ? availableResults[section] : 0;

    const addSectionToMap = (map, { section, service }: ISectionService) => {
      const totalResultsInSection = getTotalResults(section);
      const availableResultsInSection = getAvailableResults(section);
      const showMoreType =
        availableResultsInSection > service.pageSize ? ShowMoreType.ShowAll :
        totalResultsInSection > availableResultsInSection ? ShowMoreType.GotoMore :
        ShowMoreType.None;

      return {
        ...map,
        [section]: {
          totalResults: totalResultsInSection,
          availableResults: availableResultsInSection,
          displayedResults: Math.min(availableResultsInSection, service.pageSize),
          showMoreType
        } as ISectionPaging
      };
    };

    return this._services.reduce(addSectionToMap, {});
  }

  static getEmptyQueryPagingInfo() {
    return this.getSectionPagingInfo();
  }
}
