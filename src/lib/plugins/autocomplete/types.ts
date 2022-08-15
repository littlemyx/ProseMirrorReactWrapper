export type SubscribHandler = (callback: SubscriberCallback) => () => void;

export interface PopupState {
  isVisible: boolean;
  word?: string;
  screenPos?: ScreenPosition;
  suggestions?: string[];
  clickHandler?: (correction: string) => void;
}

export type SubscriberCallback = (state: PopupState) => void;

export interface Subscriber {
  id: number;
  callback: SubscriberCallback;
}

export interface ScreenPosition {
  x: number;
  y: number;
}
