import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import Animated, { interpolate, Extrapolate, useSharedValue, useAnimatedStyle } from "react-native-reanimated";

const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.8;
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)


function Item({img, index, scrollX }) {

  const size = useSharedValue(0.8);

  const inputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH
  ]

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.8, 1, 0.8],
    Extrapolate.CLAMP,
  )


  const opacity = useSharedValue(1);
  const opacityInputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];
  opacity.value = interpolate(
    scrollX,
    opacityInputRange,
    [0.5, 1, 0.5],
    Extrapolate.CLAMP
  );

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: size.value }],
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View style={[styles.card, cardStyle, {
      marginLeft: index == 0 ? SIDECARD_LENGTH : SPACING,
      marginRight: index == 2 ? SIDECARD_LENGTH : SPACING,
    }]}>
      <Image
        source={{ uri: img }}
        style={{ width: "100%", height: "100%" }}
      />
    </Animated.View>
  )
}

export default function MyCarousel(props) {

  const [scrollX, setScrollX] = useState(0);

  return (
    <Animated.View>
      <AnimatedFlatList
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={CARD_LENGTH + (SPACING * 1.5)}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        snapToAlignment={"center"}
        data={props.imgArray}
        horizontal={true}
        renderItem={({ item, index }) => {
          return (
            <Item img={item} key={index} index={index} scrollX={scrollX} />
          )
        }}
        onScroll={(event) => {
          setScrollX(event.nativeEvent.contentOffset.x);
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_LENGTH,
    height: CARD_LENGTH,
    overflow: "hidden",
    borderRadius: 15,
  }
});