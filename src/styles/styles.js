'use strict';
import { StyleSheet, Platform } from 'react-native';
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
  /*
    Login -start
  */
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginBackgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loginFormGroup: {
    padding: wp(10),
  },
  loginTitle: {
    paddingBottom: 16,
    textAlign: "center",
    color: "#000",
    fontSize: 35,
    fontWeight: "bold",
    opacity: 0.8,
  },
  loginInputLabel: {
    color: '#76448a',
  },
  loginSubmitGroup: {
    paddingTop: lp(5),
  },
  loginSubmitText: {
    fontSize: lp(3),
  },
  loginSignUpButton: {
    backgroundColor: 'whitesmoke',
    borderColor: 'whitesmoke',
  },
  loginResponseContainer: {
    alignItems: 'center',
    padding: lp(1),
  },
  loginResponse: {
    textAlign: "center",
    fontSize: lp(2.5),
  },
  /*
    Login -end
  */
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
  topBarViewContainer: {
    width: '80%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  // Top bar text
  topBarText: {
    color: 'white',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    fontSize: lp(3),
    marginTop: lp(2),
  },
  topBarProfileButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topBarProfileButtonSize: {
    fontSize: lp(4),
    backgroundColor: 'white',
  },
  topBarTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  /*
    Top bar -end
  */
  /*
    Profile -start
  */
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleLanguageContainer: {
    borderRadius:10,
    backgroundColor: '#2e86c1',
    width: '80%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: lp(10),
  },
  toggleLanguageButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleLanguageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  logoutButtonContainer: {
    borderRadius:10,
    backgroundColor: '#df555f',
    width: '80%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: lp(10),
  },
  logoutButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  /*
    Profile -end
  */
  /*
    Education -start
  */
  educationContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  educationButtonContainerContainer: {
    width: '100%',
    height: lp(80),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#55ab98',
  },
  educationButtonContainer: {
    width: '100%',
    height: lp(27),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  educationButtonBackgroundImage: {
    width: '100%',
    height: lp(27),
  },
  educationButton: {
    width: '100%',
    height: lp(27),
  },
  educationButtonTextContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingVertical: lp(10),
  },
  educationButtonColor: {
    position: 'absolute',
    marginTop: 0,
    backgroundColor: '#55ab98',
    width: '100%',
    height: lp(27),
    opacity: 0.7,
  },
  educationButtonText: {
    textAlign: 'center',
    fontSize: lp(4),
    color: 'white',
    opacity: 1,
  },
  educationListItemContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  educationListItemContentPicture: {
    width: lp(15),
    height: lp(15),
  },
  educationListItemTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(100) - lp(15),
  },
  educationListItemText: {
    padding: lp(1),
    fontSize: lp(3),
    fontWeight: 'bold',
  },
  /*
    Education -end
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
    height: '100%', //*** depends on the tabbar height
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
  emergencyCallButtonImage2: {
    height: wp(30),
    width: wp(35),
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
    color: 'black',
  },
  // Total check ins label
  checkInTotalCheckInsLabel: {
    fontSize: lp(3.25),
    color: 'black',
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
    color: 'black',
  },
  // Other stats label
  checkInOtherStatsLabel: {
    fontSize: lp(2.5),
    color: 'black',
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
  checkInUpdateButtonDisabled: {
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

    width: wp(30),
    height: wp(30),
    borderRadius: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Check in button text
  checkInUpdateButtonText: {
    color: 'white',
    fontSize: lp(2.75),
    fontWeight: 'bold',
  },
  // Share location container
  checkInShareLocationContainer: {
      backgroundColor: '#fff',
      width: '100%',
      height: lp(8),
      margin: lp(2),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  },
  checkInShareLocationCheckBox: {
    width: '55%',
    height: lp(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp(0.25),
    borderRadius: wp(3),
  },
  // Share location text
  checkInShareLocationText: {
      color: 'black',
      fontWeight: 'bold',
      fontFamily: 'Cochin',
      fontSize: lp(2.75),
  },
  // Status picker container
  checkInStatusPickerContainer: {
    width: '55%',
    borderWidth: wp(0.25),
    borderRadius: wp(3),
    height: lp(8),
    justifyContent: Platform.OS === 'ios' ? 'center' : 'space-between',
  },
  // Status picker
  checkInStatusPicker: {
    width: '100%',
    height: lp(10),
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
    height: '100%',
  },
  // Carousel slider
  newsFeedSlider: {
    overflow: 'visible',
  },
  // Carousel slider content container
  newsFeedSliderContentContainer: {
    paddingVertical: lp(2),
  },
  // Carousel container
  newsFeedCarouselContainer: {
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
    height: lp(40), // TODO: need to fix slide heights
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
    height: lp(40),
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
    color: '#525052',
    fontSize: wp(4),
    fontStyle: 'italic',
    paddingVertical: lp(1),
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
    height: lp(18),
    backgroundColor: 'white',
    opacity: 0.8,
  },
  newsFeedCarouselSlideTimeLocationBackgroundContainer: {
    width: '75%',
    height: lp(10),
    backgroundColor: 'white',
    opacity: 0.6,
  },
  // Carousel slide text container background container
  newsFeedCarouselSlideTextBackgroundContainerFlex: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  // Pagination container container
  newsFeedPaginationContainerContainer: {
    height: lp(5),
  },
  // Pagination container
  newsFeedPaginationContainer: {
    paddingVertical: lp(1),
  },
  // Pagination dots
  newsFeedPaginationDot: {
    width: lp(1.5),
    height: lp(1.5),
    borderRadius: lp(0.75),
    marginHorizontal: 0,
  },
  // See all
  newsFeedSeeAll: {
    marginTop: lp(0.5),
    width: '20%',
    height: lp(5),
  },
  // See all text
  newsFeedSeeAllText: {
    fontSize: wp(4),
    color: 'blue',
  },
  // See all container
  newsFeedSeeAllContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: lp(6),
  },
  // See all empty box
  newsFeedSeeAllEmptyBox: {
    width: '20%',
    height: 0,
  },
  /*
    News Feed -end
  */
  adminActivitiesAddModalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  /*
    Admin Resources -start
  */
  adminResourcesAddButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: lp(4),
    padding: lp(2),
    width: wp(45),
    height:lp(10),
    borderRadius: wp(2.5),
    backgroundColor: '#2e86c1'
  },
  adminResourcesAddButtonText: {
    fontSize: lp(2.65),
    color: 'white',
    fontWeight: 'bold',
  },
  adminResourcesSearchContainer: {
    width: '90%',
  },
  adminResourcesSearchResultsContainer: {
    width: '90%',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    height: '60%',
  },
  adminResourcesListContainer: {
    width: '100%',
    height: lp(8),
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
  },
  adminResourcesListItemText: {
    fontSize: 18,
  },
  adminResourcesIconContainer: {
    position: 'absolute',
    right: wp(1),
  },
  adminResourcesIconContainer2: {
    position: 'absolute',
    right: wp(1) + lp(4),
  },
  adminResourcesAddModalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  adminResourcesAddModalInnerContainer: {
    alignItems: 'center',
    marginTop: lp(8),
  },
  adminResourcesAddModalTitle: {
    fontSize: lp(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  adminResourcesAddModalForm: {
    //borderWidth: 1,
    width: '60%',
  },
  /*
    Admin Resources -end
  */
});

module.exports = myStyles;
