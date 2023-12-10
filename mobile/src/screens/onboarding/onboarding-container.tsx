
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Onboarding } from "./onboarding";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '@/navigation';
import { RootScreens } from "..";

type OnboardingScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING
>;

export const OnboardingContainer = ({
  navigation,
}: OnboardingScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Onboarding onNavigate={onNavigate} />;
}
