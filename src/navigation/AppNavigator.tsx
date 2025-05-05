import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import HomeScreen from '../screens/HomeScreen';
import PlansScreen from '../screens/PlansScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthScreen from '../screens/AuthScreen';
import ChimneyServiceScreen from '../screens/services/ChimneyServiceScreen';
import CooktopServiceScreen from '../screens/services/CooktopServiceScreen';
import ROServiceScreen from '../screens/services/ROServiceScreen';
import KitchenDesignScreen from '../screens/KitchenDesignScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { useAuth } from '../services/AuthProvider';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Plans" component={PlansScreen} />
      <Stack.Screen name="ChimneyService" component={ChimneyServiceScreen} options={{ title: 'Chimney Service' }} />
      <Stack.Screen name="CooktopService" component={CooktopServiceScreen} options={{ title: 'Cooktop Service' }} />
      <Stack.Screen name="ROService" component={ROServiceScreen} options={{ title: 'RO Service' }} />
      <Stack.Screen name="KitchenDesign" component={KitchenDesignScreen} options={{ title: 'Kitchen Design' }} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const ServicesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Services" component={ServicesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChimneyService" component={ChimneyServiceScreen} options={{ title: 'Chimney Service' }} />
      <Stack.Screen name="CooktopService" component={CooktopServiceScreen} options={{ title: 'Cooktop Service' }} />
      <Stack.Screen name="ROService" component={ROServiceScreen} options={{ title: 'RO Service' }} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const PlansStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Plans" component={PlansScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { colors } = useTheme();
  const { user } = useAuth();

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ServicesTab') {
            iconName = focused ? 'construct' : 'construct-outline';
          } else if (route.name === 'PlansTab') {
            iconName = focused ? 'shield' : 'shield-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false, title: 'Home' }} />
      <Tab.Screen name="ServicesTab" component={ServicesStack} options={{ headerShown: false, title: 'Services' }} />
      <Tab.Screen name="PlansTab" component={PlansStack} options={{ headerShown: false, title: 'Plans' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ headerShown: false, title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
