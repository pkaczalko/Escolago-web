import { ModulesDTO } from './modules';

export interface AssetDTO {
  id: number;
  module: ModulesDTO;
}
export interface BookAssetDTO {
  bookTitle: string;
  bookId: number;
  copyId: number;
  assetId: number;
  dateAdded: string;
}

export interface ItemAssetDTO {
  name: string;
  id: number;
  assetId: number;
  addedDate: string;
}

export interface JoinAssetsDTO {
  item?: ItemAssetDTO;
  book?: BookAssetDTO;
}

export interface AssetPagedResponse {
  assets: JoinAssetsDTO[];
  totalElements: number;
}
