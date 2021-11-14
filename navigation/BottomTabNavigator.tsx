import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import {
    BottomTabParamList,
    TabOneParamList,
    TabTwoParamList,
} from '../types/common'
import RestaurantListScreen from '../screens/RestaurantListScreen'
import PartyMenuScreen from '../screens/PartyMenuScreen'
import PartySelectionScreen from '../screens/PartySelectionScreen'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator(): JSX.Element {
    const colorScheme = useColorScheme()

    return (
        <BottomTab.Navigator
            initialRouteName="Films"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <BottomTab.Screen
                name="Films"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({ color }: { color: string }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Restaurants"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({ color }: { color: string }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    )
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

const TabOneStack = createStackNavigator<TabOneParamList>()

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="PartyMenuScreen"
                component={PartyMenuScreen}
                options={{ headerTitle: 'Party Menu' }}
            />
            <TabOneStack.Screen
                name="PartySelectionScreen"
                component={PartySelectionScreen}
                options={{ headerTitle: 'Party Details' }}
            />
        </TabOneStack.Navigator>
    )
}

const TabTwoStack = createStackNavigator<TabTwoParamList>()

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="RestaurantListScreen"
                component={RestaurantListScreen}
                options={{ headerTitle: 'Restaurants' }}
            />
        </TabTwoStack.Navigator>
    )
}
