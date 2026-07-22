> Template version: v0.3.0

<p align="center">
  <h1 align="center"> <code>react-native-draggable-flatlist</code> </h1>
</p>

This project is based on [react-native-draggable-flatlist@4.0.3](https://github.com/computerjazz/react-native-draggable-flatlist).

Please go to the Releases release address of the third-party library to view the supporting version information: [@eact-native-ohos/react-native-draggable-flatlist Releases](https://github.com/react-native-oh-library/react-native-draggable-flatlist/releases). For older versions that are not published to npm, install the tgz package by referring to the [Installation Guide](./tgz-usage-en.md).

| Version                   | Releases info                                      |  Support RN version                    |
| ------------------------- | ------------------------------------------------- |  -------------------------- |
|  4.0.4                 | [@react-native-ohos/react-native-draggable-flatlist Releases](https://github.com/react-native-oh-library/react-native-draggable-flatlist/releases)  | 0.72/0.77 |

## 1. Installation and Usage

Go to the project directory and execute the following instruction:

#### **npm**

```bash
npm install @react-native-ohos/react-native-draggable-flatlist
```

#### **yarn**

```bash
yarn add @react-native-ohos/react-native-draggable-flatlist
```

The following code shows the basic use scenario of the repository:

> [!WARNING] The name of the imported repository remains unchanged.

```js
import React, { useState, useRef } from "react";
import { Text, StyleSheet, View } from "react-native";
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

export function getColor(i: number, numItems: number) {
    const multiplier = 255 / (numItems - 1);
    const colorVal = i * multiplier;
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}
const mapIndexToData = (d: any, index: number, arr: any[]) => {
    const backgroundColor = getColor(index, arr.length);
    return {
        text: `${index}`,
        key: `key-${backgroundColor}`,
        backgroundColor,
    };
}
export type Item = ReturnType<typeof mapIndexToData>;
const NUM_ITEMS = 10;
const initialData: Item[] = [...Array(NUM_ITEMS)].map(mapIndexToData);

export default function Basic() {
    const [data, setData] = useState(initialData);
    const draggableListRef = useRef(null);

    const renderItem = ({ item, drag, isActive, getPanGestureRef }: RenderItemParams<Item> & { getPanGestureRef?: () => any }) => {
        const panRef = getPanGestureRef?.();
        const longPress = Gesture.LongPress()
            .simultaneousWithExternalGesture(panRef || [])
            .onStart(() => {
                console.log("onStart", {
                    key: item.key,
                });
                runOnJS(drag)();
            })
            .onEnd((_e, success) => {
                console.log("onEnd", { success });
            });

        return (
            <ScaleDecorator>
                <GestureDetector gesture={longPress}>
                    <View
                        style={[
                            styles.rowItem,
                            { backgroundColor: isActive ? "red" : item.backgroundColor },
                        ]}
                    >
                        <Text style={styles.text}>{item.text}</Text>
                    </View>
                </GestureDetector>
            </ScaleDecorator>
        );
    };
    const renderPlaceholderFunction = ({ item, index }: { item: Item; index: number }) => {
        return (
            <View style={[
                { backgroundColor: `${item.backgroundColor}30` } // 30% 透明度
            ]}>
                <Text>拖动 "{item.text}"</Text>
            </View>
        );
    };
    return (
        <GestureHandlerRootView>
            <DraggableFlatList
                data={data}
                ref={draggableListRef}
                onDragBegin={(index) => {
                    console.log("onDragBegin", { index });
                }}
                onPlaceholderIndexChange={(index) => {
                    console.log("onPlaceholderIndexChange", { index });
                }}
                onDragEnd={({ data, from, to }) => {
                    console.log("onDragEnd", { from, to });
                }}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                onScrollOffsetChange={(offset) => {
                    console.log('onScrollOffsetChange:', offset);
                }}
                onRelease={(index) => {
                    console.log('onRelease:', index);
                }}
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: "#bcaaaaff",
    },
    rowItem: {
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});

```

## 2. Link
This library depends on the following third-party libraries. Please refer to their respective documentation:
+ [@react-native-oh-tpl/react-native-gesture-handler](./react-native-gesture-handler.md)
+ [@react-native-oh-tpl/react-native-reanimated](./react-native-reanimated.md)

This library implementation relies on the native code of @react-native-oh-tpl/react-native-gesture-handler and @react-native-oh-tpl/react-native-reanimated. If this library has already been introduced in the HarmonyOS project, there is no need to add it again. You can skip the steps in this section and use it directly.

If not introduced, please refer to the Link sections of the [@react-native-oh-tpl/react-native-gesture-handler documentation](./react-native-gesture-handler.md#link) and [@react-native-oh-tpl/react-native-reanimated documentation](./react-native-reanimated.md#link) to include them.

## 3. Constraints

### 3.1 Compatibility

Check the release version information in the release address of the third-party library: [@react-native-ohos/react-native-draggable-flatlist Releases](https://github.com/react-native-oh-library/react-native-draggable-flatlist/releases).


## 4. Properties (If Any)

> [!TIP] The **Platform** column indicates the platform where the properties are supported in the original third-party library.

> [!TIP] If the value of **HarmonyOS Support** is **yes**, it means that the HarmonyOS platform supports this property; **no** means the opposite; **partially** means some capabilities of this property are supported. The usage method is the same on different platforms and the effect is the same as that of iOS or Android.

DraggableFlatList Supported Properties
> **DraggableFlatList**：DraggableFlatList Supported Properties.

| Name        | Description                                       | Type   | Required | Platform | HarmonyOS Support |
| ----------- | ------------------------------------------------- | ------ | -------- |----------|-------------------|
| data | Items to be rendered. | Object | yes      | all      | yes               |
| ref | FlatList ref to be forwarded to the underlying FlatList. | Object | no     | all      | yes               |
| renderItem | Call drag when the row should become active (i.e. in an onLongPress or onPressIn). | function | yes     | all      | yes               |
| renderPlaceholder | Component to be rendered underneath the hovering component. | function | no     | all      | yes               |
| keyExtractor | nique key for each item (required). | function | yes     | all      | yes               |
| onDragBegin | Called when row becomes active. | function | no     | all      | yes               |
| onRelease | Called when active row touch ends. | function | no     | all      | yes               |
| onDragEnd | Called after animation has completed. Returns updated ordering of data. | function | no     | all      | yes               |
| autoscrollThreshold | Distance from edge of container where list begins to autoscroll when dragging. | number | no     | all      | yes               |
| autoscrollSpeed | Determines how fast the list autoscrolls. | number | no     | all      | yes               |
| animationConfig | Configure list animations. | Object | no     | all      | yes               |
| activationDistance | Distance a finger must travel before the gesture handler activates. Useful when using a draggable list within a TabNavigator so that the list does not capture navigator gestures. | number | no     | all      | yes               |
| onScrollOffsetChange | Called with scroll offset. Stand-in for onScroll. | function | no     | all      | yes               |
| onPlaceholderIndexChange | Called when the index of the placeholder changes. | function | no     | all      | yes               |
| dragItemOverflow | If true, dragged item follows finger beyond list boundary. | boolean | no     | all      | yes               |
| dragHitSlop | Enables control over what part of the connected view area can be used to begin recognizing the gesture. Numbers need to be non-positive (only possible to reduce responsive area). | Object | no     | no       | yes                |
| debug | Enables debug logging and animation debugger. | boolean | no     | all      | yes               |
| containerStyle | Style of the main component. | Object | no     | all      | yes               |
| simultaneousHandlers | References to other gesture handlers, mainly useful when using this component within a ScrollView. | Object | no     | android       | no                |
| itemEnteringAnimation | Animation when item is added to list. | function | no     | android  | no                |
| itemExitingAnimation | Animation when item is removed from list. | function | no     | android  | no                |
| itemLayoutAnimation | Animation when list items change position (enableLayoutAnimationExperimental prop must be true). | function | no     | android  | no                |
| enableLayoutAnimationExperimental | Flag to turn on experimental support for itemLayoutAnimation. | boolean | no     | android  | no                |

> **NestableDraggableFlatList**：NestableDraggableFlatList extends DraggableFlatList, so all available props may be passed into both of them.

| Name        | Description                                       | Type   | Required | Platform  | HarmonyOS Support |
| ----------- | ------------------------------------------------- | ------ | -------- |-----------|-------------------|
| data | Items to be rendered. | Object | yes      | all       | yes               |
| ref | FlatList ref to be forwarded to the underlying FlatList. | Object | no     | all       | yes               |
| renderItem | Call drag when the row should become active (i.e. in an onLongPress or onPressIn). | function | yes     | all       | yes               |
| renderPlaceholder | Component to be rendered underneath the hovering component. | function | no     | all       | yes               |
| keyExtractor | nique key for each item (required). | function | yes     | all       | yes               |
| onDragBegin | Called when row becomes active. | function | no     | all       | yes               |
| onRelease | Called when active row touch ends. | function | no     | all       | yes               |
| onDragEnd | Called after animation has completed. Returns updated ordering of data. | function | no     | all       | yes               |
| autoscrollThreshold | Distance from edge of container where list begins to autoscroll when dragging. | number | no     | all       | yes               |
| autoscrollSpeed | Determines how fast the list autoscrolls. | number | no     | all       | yes               |
| animationConfig | Configure list animations. | Object | no     | all       | yes               |
| activationDistance | Distance a finger must travel before the gesture handler activates. Useful when using a draggable list within a TabNavigator so that the list does not capture navigator gestures. | number | no     | all       | yes               |
| onScrollOffsetChange | Called with scroll offset. Stand-in for onScroll. | function | no     | all       | yes               |
| onPlaceholderIndexChange | Called when the index of the placeholder changes. | function | no     | all       | yes               |
| dragItemOverflow | If true, dragged item follows finger beyond list boundary. | boolean | no     | all       | yes               |
| dragHitSlop | Enables control over what part of the connected view area can be used to begin recognizing the gesture. Numbers need to be non-positive (only possible to reduce responsive area). | Object | no     | no        | yes                |
| debug | Enables debug logging and animation debugger. | boolean | no     | all       | yes               |
| containerStyle | Style of the main component. | Object | no     | all       | yes               |
| simultaneousHandlers | References to other gesture handlers, mainly useful when using this component within a ScrollView. | Object | no     | android        | no                |
| itemEnteringAnimation | Animation when item is added to list. | function | no     | android | no                |
| itemExitingAnimation | Animation when item is removed from list. | function | no     | android | no                |
| itemLayoutAnimation | Animation when list items change position (enableLayoutAnimationExperimental prop must be true). | function | no     | android | no                |
| enableLayoutAnimationExperimental | Flag to turn on experimental support for itemLayoutAnimation. | boolean | no     | android | no                |
 

## 5. Known Issues

- [X] The four properties itemEnteringAnimation, itemExitingAnimation, itemLayoutAnimation, and enableLayoutAnimationExperimental rely on the react-native-reanimated animation library. Since the animation library has not yet implemented this feature, these properties currently have no effect.  issue: [issue#2](https://github.com/react-native-oh-library/react-native-draggable-flatlist/issues/2).

- [X] The simultaneousHandlers property relies on the react-native-gesture-handler library. Since the gesture library has not yet implemented this feature, this property currently has no effect. Issue: [issue#1](https://github.com/react-native-oh-library/react-native-draggable-flatlist/issues/1).

## 6. License

This project is licensed under [MIT License](https://github.com/computerjazz/react-native-draggable-flatlist/blob/main/LICENSE.txt).
