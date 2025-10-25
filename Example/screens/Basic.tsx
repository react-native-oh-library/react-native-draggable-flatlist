import React, { useState, useRef } from "react";
import { Text, StyleSheet, View } from "react-native";
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { mapIndexToData, Item } from "../utils";

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
                console.log("LongPress.onStart", {
                    key: item.key,
                });
                runOnJS(drag)();
            })
            .onEnd((_e, success) => {
                console.log("LongPress.onEnd", { success });
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
        <DraggableFlatList
            data = {data}
            ref = {draggableListRef}
            onDragBegin = {(index) => {
                console.log("onDragBegin", { index });
            }}
            onPlaceholderIndexChange ={(index) => {
                console.log("onPlaceholderIndexChange", { index });
            }}
            onDragEnd = {({ data, from, to }) => {
                console.log("onDragEnd", { from, to });
                setData(data);
            }}
            keyExtractor = {(item) => item.key}
            renderItem = {renderItem}
            onScrollOffsetChange = {(offset) => {
                console.log('onScrollOffsetChange:', offset);
            }}
            onRelease = {(index) => {
                console.log('onRelease:', index);
            }}
            containerStyle = {styles.listContainer}
            activationDistance = {20}
            animationConfig = {{
                damping: 10, 
                mass: 0.5,
                stiffness: 300, 
                overshootClamping: false,
            }}
            debug = {false}
            dragHitSlop = {{ top: -10, left: -10, bottom: -10, right: -10 }}
            renderPlaceholder = {renderPlaceholderFunction}
            autoscrollThreshold = {200}
            autoscrollSpeed = {200}
        />
        
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
