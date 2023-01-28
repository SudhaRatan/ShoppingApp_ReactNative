import AnimatedLoader from 'react-native-animated-loader';
import { Text,View } from 'react-native';

const Anim = () => {
  return (
    <View style={{
      height:100,
      width:100,
    }}>
    <AnimatedLoader
      visible={true}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={{
        width:100,
        height:100,
      }}
      speed={1}>
      <Text>Loadding</Text>
    </AnimatedLoader>
    </View>
  )
}

export default Anim;