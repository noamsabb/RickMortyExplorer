import { appConfig } from "../2-utils/app-config";

class DataService {
  public async getAllCharacters() {
    //First Page + getting total pages 
    const response = await fetch(appConfig.apiUrl);
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const totalPages = data.info.pages;
    let nextPageUrl = data.info.next;
    let characters = data.results;

    //Rest of the pages
    for (let page = 2; page < totalPages; page++) {
      const pageResponse = await fetch(nextPageUrl);
      const pageData = await pageResponse.json();
      nextPageUrl = pageData.info.next;
      characters.push(...pageData.results);
    }

    return characters;
  }
}

export const dataService = new DataService();
