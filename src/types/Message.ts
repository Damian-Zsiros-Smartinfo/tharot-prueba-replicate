export interface Message {
  id: string;
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
  id: string;
  link_image: string;
  image?: string;
  id_message: string;
}
