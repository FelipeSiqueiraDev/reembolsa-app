import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";

type AuthRoutes = {
  signIn: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
    >
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  );
}
