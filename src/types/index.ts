export interface Recipe {
  _id: string;
  image: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  cuisineType: string;
  preparationTime: number;
  categories: string[];
  likesCount: number;
  likes: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;

  // Optional fields (if used)
  views?: number;
  viewedBy?: string[];
}
