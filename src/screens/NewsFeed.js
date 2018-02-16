import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../styles/styles.js';
import { Constants } from '../constants/constants.js';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { Card, ListItem } from 'react-native-elements';
import { fb } from '../../App';

const ENTRIES = [
  {
       title: 'Mario loves Taylor Swift',
       subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
       illustration: 'https://i.imgur.com/UYiroysl.jpg'
   },
   {
       title: 'Ava is not a CS major',
       subtitle: 'Lorem ipsum dolor sit amet',
       illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
   },
   {
       title: 'Dan likes Coding',
       subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
       illustration: 'https://i.imgur.com/MABUbpDl.jpg'
   },
   {
       title: 'Mario is feeling 22',
       subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
       illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
   },
   {
       title: 'Claire likes research',
       subtitle: 'Lorem ipsum dolor sit amet',
       illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
   },
];

const SLIDER_FIRST_ITEM = 0;

export default class NewsFeedView extends Component {
  constructor(props) {
    super(props);

    this.newsFeedRef = fb.database().ref('newsFeed');
    this.lostRef = fb.database().ref('lost');
    this.lostMotivationalQuoteRef = fb.database().ref('lost_motivationalQuote');

    this.state = {
      activeSlide: SLIDER_FIRST_ITEM,
      lost: [],
    }

  }

  getRandomMotivationalQuote = (num, callback) => {
    if (num <= 0) return;
    var keyList = [];
    var quoteList = [];
    this.lostMotivationalQuoteRef.once('value').then(snapshot => {
      var quotes = snapshot.val();
      Object.keys(quotes).forEach((key) => {keyList.push(key)});
      for (let i = 0; i < num; i++) {
        let randIndex = Math.floor(Math.random() * keyList.length);
        quoteList.push(quotes[keyList[randIndex]].eng);
      }
      callback(quoteList, num);
    });
  }

  setLost = (quoteList, num) => {
    var currentLost = this.state.lost;
    for (let i = 0; i < num; i++) {
      var noLost = { name: quoteList[i], picture: require('../../images/sati.png') };
      currentLost.push(noLost);
      //alert(quoteList[i]);
    }
    this.setState({ lost: currentLost });
  }

  componentWillMount() {
    // TODO: fix this for when we have actual kids in the database
    this.lostRef.orderByChild('rank').on("value", function(snapshot) {
      if (snapshot.val() != undefined && snapshot.val() != null) {
        // TODO: make this better, but it works
        var lostDisplay = [];
        var lostList = snapshot.val();
        //alert(JSON.stringify(tempLost));
        for (let i = 0; i < ((lostList.length < 3) ? lostList.length : 3); i++) {
          var tempLost = lostList[i];
          if (tempLost.picture === "None") {
            tempLost.picture = require('../../images/sati.png');
          }
          lostDisplay.push(tempLost);
        }
        this.getRandomMotivationalQuote((3 - lostList.length), this.setLost);
        this.setState({ lost: lostDisplay });
      } else {
        // TODO: this else statement is pretty much done
        var quotes = this.getRandomMotivationalQuote(3, this.setLost);
      }
    }, this);
  }

  _renderItem({item, index}) {
    return (
      <View style={styles.newsFeedCarouselSlide}>
        <TouchableOpacity
        activeOpacity={1}
        onPress={() => { alert(`You've clicked '${item.title}'`); }}>
          <View style={styles.newsFeedCarouselSlideContainer}>
            <Image style={styles.newsFeedCarouselSlideImage} source={{ uri: item.illustration }} />
            <View style={styles.newsFeedCarouselSlideTextBackgroundContainerFlex}>
              <View style={styles.newsFeedCarouselSlideTextBackgroundContainer}>
                <View style={styles.newsFeedCarouselSlideTextContainer}>
                  <Text style={styles.newsFeedCarouselSlideImageTitle}>{item.title}</Text>
                  <Text style={styles.newsFeedCarouselSlideImageSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.newsFeedContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar hidden={false} />
          <View style={styles.topBarTextContainer}>
            <Text style={styles.topBarText}>News Feed</Text>
          </View>
        </View>

        <View style={styles.newsFeedCarouselContainer}>
          <Carousel
              ref={(c) => { this._carousel = c; }}
              layout={'default'}
              data={ENTRIES}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              autoplay={false}
              autoplayDelay={8000}
              autoplayInterval={8000}
              loop={true}
              containerCustomStyle={styles.newsFeedSlider}
              contentContainerCustomStyle={styles.newsFeedSliderContentContainer}
              renderItem={this._renderItem}
              sliderWidth={Constants.sliderWidth}
              itemWidth={Constants.itemWidth}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
        </View>
        <View style={styles.newsFeedSeeAllContainer}>
          <View style={styles.newsFeedSeeAllEmptyBox}></View>
          <View>
            <Pagination
              dotsLength={ENTRIES.length}
              activeDotIndex={this.state.activeSlide}
              containerStyle={styles.newsFeedPaginationContainer}
              dotColor={'#324d5c'}
              dotStyle={styles.newsFeedPaginationDot}
              inactiveDotColor={'gray'}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this._carousel}
              tappableDots={!!this._carousel}
            />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.newsFeedSeeAll}
            onPress={() => {alert('See All Pressed')}}>
              <Text style={styles.newsFeedSeeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginBottom:20}}>
          <Card title="Lost">
            {
              this.state.lost.map((u, i) => {
                return (
                  <ListItem
                    key={i}
                    roundAvatar
                    title={u.name}
                    avatar={u.picture}
                  />
                );
              })
            }
          </Card>
        </View>

      </View>
    );
  }
}
