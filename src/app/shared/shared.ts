import { AuthorDTO, GenreDTO } from '../core/interfaces/book';

export class Shared {
  static generesToString(genres: GenreDTO[]): string {
    if (genres) return this.tableToString(genres.map((genere) => genere.name));
    else return '';
  }

  static authorsToString(authors: AuthorDTO[]): string {
    if (authors)
      return this.tableToString(authors.map((author) => author.name));
    else return '';
  }

  private static tableToString(table: any[]): string {
    let tableString = '';
    for (let item of table) {
      tableString += item;
      if (item != table[table.length - 1]) tableString += ', ';
    }
    return tableString;
  }

  private static StringToTable(string: string): string[] {
    return string.split(', ');
  }

  static TableToAuthors(string: string): AuthorDTO[] {
    let table = this.StringToTable(string);
    let authors: AuthorDTO[] = [];
    for (let author of table) {
      authors.push({ name: author } as AuthorDTO);
    }
    return authors;
  }

  static TabletoGenres(string: string): GenreDTO[] {
    let table = this.StringToTable(string);
    let genres: GenreDTO[] = [];
    for (let genre of table) {
      genres.push({ name: genre } as GenreDTO);
    }
    return genres;
  }
}
