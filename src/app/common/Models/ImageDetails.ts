export interface ImageDetails {
    url: string;
    farm: string;
    id: string;
    secret: string;
    server: string;
    title: string;
    description: string;
    owner: string;
    isfavorite: boolean;
    media:string;
  }
  
  export interface FlickrOutput {
    photos: {
      photo: ImageDetails[];
    };
  }
  