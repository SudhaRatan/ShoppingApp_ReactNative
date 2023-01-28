import { createStackNavigator } from "@react-navigation/stack";

import Cart from "./Cart";
import SelectAddress from "./selectAddress";
import SelectPayment from "./selectPayment";

const CartStack = createStackNavigator();

const CartNavigation = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={Cart}
        options={{
          title: "Your Cart"
        }}
      />
      <CartStack.Screen name="SelectAddress" component={SelectAddress} 
        options={{
          title:"Select your address"
        }}
      />
      <CartStack.Screen name="SelectPayment" component={SelectPayment} 
        options={{
          title:"Select payment method"
        }}
      />
    </CartStack.Navigator>
  )
}

export default CartNavigation;