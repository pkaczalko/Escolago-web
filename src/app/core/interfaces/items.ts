import { AssetDTO } from './assets';

export interface ItemResponseDTO {
  totalItems: number;
  items: ShortItemDTO[];
}

export interface ShortItemDTO {
  id: number;
  name: string;
  keywords: string;
  categories: ItemCategoryDTO[];
  assetId: AssetDTO;
}

export interface ItemTable {
  id: number;
  name: string;
  keywords: string;
  categories: string;
  assetId: AssetDTO;
}

export interface ItemCategoryDTO {
  id: number;
  name: string;
}

export interface ItemDTO {
  id: number;
  name: string;
  keywords: string;
  categories: ItemCategoryDTO[];
  assetId: AssetDTO;
  link: string;
  description: string;
  dateAdded: string;
}

export interface ItemEdit {
  id: number;
  name: string;
  keywords: string[];
  categories: string[];
  assetId: AssetDTO;
  link: string;
  description: string;
  dateAdded: string;
}
