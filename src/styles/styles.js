'use strict';
import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
var React = require('react-native');

var myStyles = React.StyleSheet.create({
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
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  image: {
    marginTop: 200,
    height: 200,
    width: 200,
  },
  topBar: {
    height: 48,
    backgroundColor: "#55ab98",
  },
  topBarText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 22,
    fontWeight: 'bold',
    fontSize: 18,
  },
  satiImage: {
        marginTop: 100,
        height: 200,
        width: 200,
  },
  map: {
        width: '90%',
        height: '80%',
        marginTop: '10%',
      },
  mapContainer: {
        alignItems: 'center',
        width: width,
        height: height,
  },
  btnimagecontainer: {
        marginTop: 30,
        justifyContent:'center',
        alignItems:'center',
        padding:50,
      },
  btnimage: {
        height:100,
        width:100,
      },
  feelingText: {
        fontSize: 40,
        marginBottom: -25,
        color:'black',
        fontWeight: 'bold',
        fontFamily: 'Cochin',
  },
  checkInContainer: {
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
  },
  shareLocationSwitchContainer: {
      borderRadius:10,
      marginTop: 10,
      backgroundColor: '#55ab98',
      width: width - 50,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  },
  shareLocationText: {
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'Cochin',
      fontSize: 30,
      marginLeft: -30,
      marginRight: 60,
  },
  checkbox: {
      marginLeft: 30,
  },
  shareLocationCheckInContainer: {
    borderRadius:10,
    marginTop: 10,
    backgroundColor: '#df555f',
    width: width - 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkInText: {
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'Cochin',
      fontSize: 40,
  },
  singleTab: {
    flex: 1,
    backgroundColor: '#fff',
    height: height,
  },
  logoutButtonContainer: {
    borderRadius:10,
    marginTop: 400,
    backgroundColor: '#df555f',
    width: width - 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '6%',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  }
});

module.exports = myStyles;
