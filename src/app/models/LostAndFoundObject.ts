// models/lost-and-found-object.model.ts
export interface LostAndFoundObject {
  id: number;
  name: string;
  category: string;
  color: string;
  brand: string;
  location: string;
  date: string;
  imageUrl?: string;
  isClaimed: boolean;
  status: string;
  userId: number;
  matchedObjectId: number;
}
