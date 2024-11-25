// export interface GoogleAPIVolumeInfo {
//   title: string;
//   authors: string[];
//   description: string;
//   imageLinks: {
//     smallThumbnail: string;
//     thumbnail: string;
//   };
// }

// export interface GoogleAPIBook {
//     id: string;
//     volumeInfo: GoogleAPIVolumeInfo;
// }

export interface GoogleAPIVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail?: string;
  };
  infoLink?: string;
}

export interface GoogleAPIBook {
  id: string;
  volumeInfo: GoogleAPIVolumeInfo;
}