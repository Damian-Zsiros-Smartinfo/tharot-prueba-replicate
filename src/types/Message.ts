export interface Message {
  id: string;
  actor: string;
  text: string;
  created_at?: string;
  images?: Image[] | {
    file: {
      name: string;
    };
    arrayBuffer: Buffer;
  }[]
}

export interface Image {
  id: string,
  link_image: string
  id_message: string

}