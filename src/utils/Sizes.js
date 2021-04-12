import {Dimensions} from 'react-native';

export const WIDTH = Dimensions.get('screen').width;
export const HEIGHT = Dimensions.get('screen').height;

export const GRID_CARD_WIDTH = WIDTH / 2;
export const GRID_CARD_HEIGHT = GRID_CARD_WIDTH * 1.1;
export const CARD_HEIGHT = GRID_CARD_WIDTH * 1.2;
export const CARD_WIDTH = GRID_CARD_WIDTH * 0.9;

export const DETAIL_LIKED_BUTTON_SIZE = 36;
export const DETAIL_LIKED_BUTTON_PADDING = 10;
export const DETAIL_LIKED_BUTTON_BOTTOM =
  ((DETAIL_LIKED_BUTTON_SIZE + DETAIL_LIKED_BUTTON_PADDING) * 1) / 3;
