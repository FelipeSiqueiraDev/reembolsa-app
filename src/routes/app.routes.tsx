import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { AddReimbusementItem } from "@screens/AddReimbusementItem";
import { CreateReimbusement } from "@screens/CreateReimbusement";
import { CreateReimbusementItem } from "@screens/CreateReimbusementItem";

import { Home } from "@screens/Home";

type AppRoutes = {
  home: undefined;
  createReimbusement: undefined;
  addReimbusementItem: { EntityId: number };
  createReimbusementItem: { EntityId: number };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        unmountOnBlur: true,
      }}
    >
      <Screen
        name={"home"}
        component={Home}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Screen
        name={"createReimbusement"}
        component={CreateReimbusement}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />

      <Screen
        name={"addReimbusementItem"}
        component={AddReimbusementItem}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />

      <Screen
        name={"createReimbusementItem"}
        component={CreateReimbusementItem}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
    </Navigator>
  );
}
