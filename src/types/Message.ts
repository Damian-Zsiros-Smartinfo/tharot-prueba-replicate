export interface Message {
  id: number;
  actor: string;
  text: string;
  created_at?: string;
  images?:
    | Image[]
    | {
        file: {
          name: string;
        };
        arrayBuffer: Buffer;
        link_image?: string;
        images?: Image[];
        image?: string;
      }[];
}

export interface Image {
  id: number;
  link_image: string;
  image?: string;
  id_message: string;
}
