import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer} from "@react-navigation/native";
import { MainNavigator } from "./main";
import { WelcomeContainer } from "@/screens/welcome";
import { RootScreens } from "@/screens";
import { OnboardingContainer } from "@/screens/onboarding";
import { ScannerContainer } from "@/screens/scan/scanner-container";


export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.SCANNER]: undefined;
  [RootScreens.ROOMS]: undefined;
  [RootScreens.NOTI]: undefined;
  [RootScreens.PROFILE]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator screenOptions={{ headerShown: false }}  initialRouteName={RootScreens.ONBOARDING}>
        <RootStack.Screen
          name={RootScreens.ONBOARDING}
          component={OnboardingContainer}
        />
        <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.SCANNER}
          component={ScannerContainer}
          options={{}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };