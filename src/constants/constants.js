import { Dimensions } from 'react-native';

export const Constants = {
  width : Dimensions.get('window').width,
  height : Dimensions.get('window').height,
  sliderWidth : Dimensions.get('window').width,
  itemWidth : wp(75) + wp(2) * 2,
};

//takes a number representing the percentage of the width of the screen and
//returns the number of pixels that would fill that percentage
export function wp (percentage) {
    const value = (percentage * Dimensions.get('window').width) / 100;
    return Math.round(value);
}

//takes a number representing the percentage of the height of the screen and
//returns the number of pixels that would fill that percentage
export function lp (percentage) {
    const value = (percentage * Dimensions.get('window').width) / 100;
    return Math.round(value);
}
