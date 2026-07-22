> 模板版本：v0.3.0

<p align="center">
  <h1 align="center"> <code>react-native-draggable-flatlist</code> </h1>
</p>


本项目基于 [react-native-draggable-flatlist@4.0.3](https://github.com/computerjazz/react-native-draggable-flatlist) 开发。

请到三方库的 Releases 发布地址查看配套的版本信息：[@eact-native-ohos/react-native-draggable-flatlist Releases](https://github.com/react-native-oh-library/react-native-draggable-flatlist/releases)。对于未发布到npm的旧版本，请参考[安装指南](./tgz-usage.md)安装tgz包。

| 三方库版本                 | 发布信息                                      |  支持RN版本                 |
| ------------------------- | ------------------------------------------------- |  -------------------------- |
| 4.0.4                 | [@react-native-ohos/react-native-draggable-flatlist Releases](https://github.com/react-native-oh-library/react-native-draggable-flatlist/releases)  | 0.72/0.77 |

## 1. 安装与使用

进入到工程目录并输入以下命令：

#### **npm**

```bash
npm install @react-native-ohos/react-native-draggable-flatlist
```

#### **yarn**

```bash
yarn add @react-native-ohos/react-native-draggable-flatlist
```

下面的代码展示了这个库的基本使用场景：

> [!WARNING] 使用时 import 的库名不变。

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
本库依赖以下三方库，请查看对应文档：
+ [@react-native-oh-tpl/react-native-gesture-handler](./react-native-gesture-handler.md)
+ [@react-native-oh-tpl/react-native-reanimated](./react-native-reanimated.md)

本库实现依赖@react-native-oh-tpl/react-native-gesture-handler、@react-native-oh-tpl/react-native-reanimated 的原生端代码，如已在 HarmonyOS 工程中引入过该库，则无需再次引入，可跳过本章节步骤，直接使用。

如未引入请参照[@react-native-oh-tpl/react-native-gesture-handler 文档的 Link 章节](./react-native-gesture-handler.md#link)、[@react-native-oh-tpl/react-native-reanimated 文档的 Link 章节](./react-native-reanimated.md#link)进行引入。

## 3. 约束与限制

### 3.1. 兼容性

请到三方库相应的 Releases 发布地址查看 Release 配套的版本信息：[@react-native-ohos/react-native-draggable-flatlist Releases](https://github.com/react-native-oh-library/react-native-draggable-flatlist/releases)。

## 4. 属性

> [!TIP] "Platform"列表示该属性在原三方库上支持的平台。

> [!TIP] "HarmonyOS Support"列为 yes 表示 HarmonyOS 平台支持该属性；no 则表示不支持；partially 表示部分支持。使用方法跨平台一致，效果对标 iOS 或 Android 的效果。

**DraggableFlatList**：DraggableFlatList支持属性。
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

**NestableDraggableFlatList**：NestableDraggableFlatList 是从 DraggableFlatList 扩展而来，因此所有可用的属性都可以传入它们两者。
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

      
## 5. 遗留问题

- [X] itemEnteringAnimation、itemExitingAnimation、itemLayoutAnimation、enableLayoutAnimationExperimental四个属性依赖react-native-remanited动画库，因动画库暂未实现该功能，所以相关属性目前无效果。 问题：[issue#2](https://github.com/react-native-oh-library/react-native-draggable-flatlist/issues/2)。

- [X] simultaneousHandlers属性依赖react-native-gesture-handler手势库，因手势库暂未实现该功能，所以该属性目前无效果。 问题：[issue#1](https://github.com/react-native-oh-library/react-native-draggable-flatlist/issues/1)。

## 6. 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/computerjazz/react-native-draggable-flatlist/blob/main/LICENSE.txt)，请自由地享受和参与开源。