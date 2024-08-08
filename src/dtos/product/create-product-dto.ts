export interface CreateProductDTO{
  title: string;
  categoryID: number;
  realPrice: number;
  salesPrice: number;
  qty: number;
  isPublished: boolean;
}
