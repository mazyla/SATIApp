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
    height: 26,
    width: 26,
  },
  icon: {
    position: 'absolute',
    textAlign: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: '#0084ff',
  },
  outline: {
    color: '#939393',
  },
  label: {
    fontSize: 10,
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
        position: 'absolute',
        width: width,
        height: height - 48,
        marginTop: 48,
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
  header: {
        height:60,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
      },
  headertext: {
        fontSize:20,
        color:'white',
        fontWeight:'bold',
        fontFamily:'Cochin',
      },
});

module.exports = myStyles;
