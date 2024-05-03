export interface Message {
  //author: string;
  title: string;
  text: string;
}

export interface MessageWithId extends Message {
  id: string;
}
