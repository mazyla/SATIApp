'use strict';
import { StyleSheet } from 'react-native';
import { Constants, wp, lp } from '../constants/constants.js';

var React = require('react-native');

var myStyles = React.StyleSheet.create({
  // home, sign up, login
  container: {
    flex: 1,
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    paddingTop: 4.5,
  },
  iconContainer: {
    height: 30,
    width: 30,
  },
  icon: {
    position: 'absolute',
    textAlign: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: '#58aa96',
  },
  outline: {
    color: '#939393',
  },
  label: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 1.5,
    backgroundColor: 'transparent',
  },
  //***
  // resources
  map: {
        width: '90%',
        height: '70%',
        marginTop: '5%',
      },
  mapContainer: {
        alignItems: 'center',
        width: Constants.width,
        height: Constants.height,
  },
  //***
  singleTab: {
    flex: 1,
    backgroundColor: '#fff',
    height: Constants.height,
  },
  logoutButtonContainer: {
    borderRadius:10,
    marginTop: 400,
    backgroundColor: '#df555f',
    width: Constants.width - 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '6%',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  /*
    Top bar -start
  */
  // Top view for the top bar
  topBarContainer: {
    height: lp(10),
    backgroundColor: "#55ab98",
    width: '100%',
    alignItems: 'center',
  },
  // Text container for top bar
  topBarTextContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  // Top bar text
  topBarText: {
    color: 'white',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    fontSize: lp(5),
  },
  /*
    Top bar -end
  */
  /*
    Emergency Call -start
  */
  // Emergency Call top view
  emergencyCallContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  // Buttons container
  emergencyCallButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  // Button view container
  emergencyCallButton: {
    padding: wp(15),
  },
  // Button image container
  emergencyCallButtonImageContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  // Button image
  emergencyCallButtonImage: {
    height: wp(30),
    width: wp(30),
  },
  // Button text
  emergencyCallButtonText: {
    fontSize: lp(5),
    textAlign: 'center',
  },
  /*
    Emergency Call -end
  */
  /*
    Check In -start
  */
  // Top View for Check In
  checkInContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
    alignItems: 'center',
  },
  // Check in button container
  checkInUpdateButtonContainer: {
    marginTop: lp(22),
    alignItems: 'center',
    width: '100%',
    height: lp(8),
  },
  // Check in button
  checkInUpdateButton: {
    backgroundColor: "#324D5C",
    width: wp(80),
    height: lp(8),
    borderRadius: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Check in button text container
  checkInUpdateButtonTextContainer: {
    width: '80%',
    height: lp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Check in button text
  checkInUpdateButtonText: {
    color: 'white',
    fontSize: lp(2.75),
    fontWeight: 'bold',
    letterSpacing: wp(0.25)
  },
  // Share location container
  checkInShareLocationContainer: {
      borderRadius: wp(3),
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#fff',
      width: '80%',
      height: lp(15),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  },
  // Share location text
  checkInShareLocationText: {
      color: 'black',
      fontWeight: 'bold',
      fontFamily: 'Cochin',
      fontSize: lp(5),
  },
  // Share location check box
  checkInShareLocationCheckBox: {
    marginRight: lp(5),
  },
  // Previous check in label text container
  checkInPreviousLabelContainer: {
    width: '100%',
    height: wp(10),
    marginTop: lp(5),
    alignItems: 'center',
  },
  // Previous check in label text
  checkInPreviousLabel: {
    color: 'black',
    fontSize: lp(2.75),
    fontWeight: 'bold',
    letterSpacing: wp(0.25),
  },
  // Previous check in date box container
  checkInPreviousDateBoxContainer: {
    alignItems: 'center',
    width: '100%',
    height: lp(8),
  },
  // Previous check in date box
  checkInPreviousDateBox: {
    borderWidth: 2,
    width: wp(80),
    height: lp(8),
    borderRadius: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Previous check in date text container
  checkInPreviousDateTextContainer: {
    width: '90%',
    height: lp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Previous check in date text
  checkInPreviousDateText: {
    color: 'black',
    fontSize: lp(2.75),
    letterSpacing: wp(0.25),
  },
  // See all container
  checkInSeeAllContainer: {
    alignItems: 'center',
    width: '100%',
    height: lp(8),
  },
  // See all
  checkInSeeAll: {
    width: wp(80),
    height: lp(8),
    borderRadius: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  // See all text container
  checkInSeeAllTextContainer: {
    width: '90%',
    height: lp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // See all text
  checkInSeeAllText: {
    color: 'blue',
    fontSize: lp(2.75),
    letterSpacing: wp(0.25)
  },
  /*
    Check In -end
  */
  /*
    News Feed -start
  */
  // Top View for NewsFeed
  newsFeedContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
  },
  // Carousel slider
  newsFeedSlider: {
    overflow: 'visible',
  },
  // Carousel slider content container
  newsFeedSliderContentContainer: {
    paddingVertical: 10,
  },
  // Carousel container
  newsFeedCarouselContainer: {
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
  },
  // Carousel slide container
  newsFeedCarouselSlideContainer: {
    width: '100%',
    height: '100%',
  },
  // Carousel slide
  newsFeedCarouselSlide: {
    backgroundColor: '#324d5c',
    width: Constants.itemWidth,
    height: Constants.itemWidth,
  },
  // Carousel slide image
  newsFeedCarouselSlideImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  // Carousel slide image title
  newsFeedCarouselSlideImageTitle: {
    marginTop: wp(1),
    color: 'black',
    fontSize: wp(6),
    fontWeight: 'bold',
    letterSpacing: wp(0.25),
  },
  // Carousel slide image subtitle
  newsFeedCarouselSlideImageSubtitle: {
    marginBottom: wp(0.25),
    color: 'gray',
    fontSize: wp(4),
    fontStyle: 'italic',
    paddingVertical: 3,
  },
  // Carousel slide text container
  newsFeedCarouselSlideTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    opacity: 90,
    width: '90%',
    height: '100%',
  },
  // Carousel slide text container background
  newsFeedCarouselSlideTextBackgroundContainer: {
    alignItems: 'center',
    width: '100%',
    height: wp(16),
    backgroundColor: 'white',
    opacity: 0.8,
  },
  // Carousel slide text container background container
  newsFeedCarouselSlideTextBackgroundContainerFlex: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  // Pagination container
  newsFeedPaginationContainer: {
    paddingVertical: 8,
  },
  // Pagination dots
  newsFeedPaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0,
  },
  // See all
  newsFeedSeeAll: {
    marginTop: 5,
    width: '20%',
  },
  // See all text
  newsFeedSeeAllText: {
    fontSize: wp(4),
    color: 'blue',
  },
  // See all container
  newsFeedSeeAllContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // See all empty box
  newsFeedSeeAllEmptyBox: {
    width: '20%',
  },
  /*
    News Feed -end
  */
});

module.exports = myStyles;
