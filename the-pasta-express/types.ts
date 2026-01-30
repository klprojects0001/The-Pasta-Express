
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'Starters' | 'Mains' | 'Desserts';
  image: string;
  tags?: string[];
}

export interface ReservationData {
  name: string;
  date: string;
  time: string;
  guests: number;
  remarks: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
