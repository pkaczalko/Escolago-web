import {
  AuthorDTO,
  GenreDTO,
} from '../core/interfaces/book';

export class Shared {
  static genresToString(genres: GenreDTO[]): string {
    if (genres) return this.tableToString(genres.map((genere) => genere.name));
    else return '';
  }

  static authorsToString(authors: AuthorDTO[]): string {
    if (authors)
      return this.tableToString(authors.map((author) => author.name));
    else return '';
  }

  static tableToString(table: any[]): string {
    let tableString = '';
    for (let item of table) {
      tableString += item;
      if (item != table[table.length - 1]) tableString += ', ';
    }
    return tableString;
  }

  static TableToAuthors(table: string[]): AuthorDTO[] {
    let authors: AuthorDTO[] = [];
    for (let author of table) {
      authors.push({ name: author } as AuthorDTO);
    }
    return authors;
  }

  static TableToGenres(table: string[]): GenreDTO[] {
    let genres: GenreDTO[] = [];
    for (let genre of table) {
      genres.push({ name: genre } as GenreDTO);
    }
    return genres;
  }

  static DTOtoResponse(DTOtable: any[], newTable: any[]) {
    console.log(DTOtable, newTable);
    if (DTOtable === newTable) {
      return DTOtable;
    }
    let response: any[] = [];
    let responseItem!: any;
    newTable.forEach((search) => {
      responseItem = {};
      let found = DTOtable.find(
        (searchDTO) =>
          this.removeSpaces(searchDTO.name) == this.removeSpaces(search.name),
      );
      if (found) {
        responseItem.id = found.id;
        responseItem.name = found.name;
        if (found.englishName) {
          responseItem['englishName'] = found.englishName;
        }
      } else {
        responseItem.name = search.name.trim();
      }
      response.push(responseItem);
    });
    return response;
  }

  private static removeSpaces(string: string): string {
    return string.replace(/\s/g, '');
  }
}
