'use strict';
import { StyleSheet } from 'react-native';
import { Constants, wp, lp } from '../constants/constants.js';

var React = require('react-native');

var myStyles = React.StyleSheet.create({
  // home, sign up, login
  container: {
    flex: 1,
    // height: lp(13),
  },
  tabbar: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: '#f4f4f4',
    // height: lp(13),
  },
  tab: {
    // flex: 1,
    // alignItems: 'center',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: 'rgba(0, 0, 0, .2)',
    // paddingTop: 4.5,
  },
  iconContainer: {
    //height: 30,
    //width: 30,
  },
  icon: {
    // position: 'absolute',
    // textAlign: 'center',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // color: '#58aa96',
  },
  outline: {
    // color: '#939393',
  },
  label: {
    //fontSize: wp(2),
    //marginTop: wp(3),
    //marginBottom: 1.5,
    // backgroundColor: 'transparent',
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
    height: lp(7),
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
    fontSize: lp(3),
  },
  /*
    Top bar -end
  */
  /*
    Resources -start
  */
  // Resources top view
  resourcesContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  // Map
  resourcesMap: {
    width: '100%',
    height: lp(82), //*** depends on the tabbar height
  },
  /*
    Resources -end
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
    fontSize: lp(3),
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
    alignItems: 'center',
  },
  // Check in stats container
  checkInStatsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: lp(30),
  },
  // Total check ins container
  checkInTotalCheckInsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: lp(10),
    margin: wp(3),
  },
  // Total check ins
  checkInTotalCheckIns: {
    fontSize: lp(7),
  },
  // Total check ins label
  checkInTotalCheckInsLabel: {
    fontSize: lp(3),
  },
  // Other stats containers container
  checkInOtherStatsContainerContainer: {
    flexDirection: 'row',
    width: '100%',
    height: lp(10),
    margin: wp(3),
  },
  // Other stats container
  checkInOtherStatsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    margin: lp(2),
  },
  // Other stats
  checkInOtherStats: {
    fontSize: lp(5),
  },
  // Other stats label
  checkInOtherStatsLabel: {
    fontSize: lp(2),
  },
  // Check in container
  checkInUpdateContainer: {
    margin: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: lp(40),
  },
  // Check in button
  checkInUpdateButton: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
  },
  // Check in button container
  checkInUpdateButtonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  // Check in button text container
  checkInUpdateButtonTextContainer: {
    backgroundColor: "#324D5C",
    width: wp(30),
    height: wp(30),
    borderRadius: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Check in button text
  checkInUpdateButtonText: {
    color: 'white',
    fontSize: lp(2.5),
    fontWeight: 'bold',
  },
  // Share location container
  checkInShareLocationContainer: {
      backgroundColor: '#fff',
      width: '50%',
      height: lp(7),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  },
  // Share location text
  checkInShareLocationText: {
      color: 'black',
      fontWeight: 'bold',
      fontFamily: 'Cochin',
      fontSize: lp(2.25),
  },
  // Share location check box
  checkInShareLocationCheckBox: {
    marginRight: lp(2.25),
  },
  // Status picker container
  checkInStatusPickerContainer: {
    width: wp(26),
    borderWidth: wp(0.25),
    borderRadius: wp(3),
  },
  // Status picker
  checkInStatusPicker: {
    width: '100%',
    height: lp(20),
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
