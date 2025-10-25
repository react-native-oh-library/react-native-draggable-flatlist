import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import {
    NestableScrollContainer,
    NestableDraggableFlatList,
    ScaleDecorator,
    RenderItemParams,
} from 'react-native-draggable-flatlist';

import { mapIndexToData, Item } from '../utils';

const NUM_ITEMS = 5;
const NUM_ITEMS2 = 6;
const NUM_ITEMS3 = 6;

const initialData1: Item[] = [...Array(NUM_ITEMS)].map(mapIndexToData);
const initialData2: Item[] = [...Array(NUM_ITEMS2)].map(mapIndexToData);
const initialData3: Item[] = [...Array(NUM_ITEMS3)].map(mapIndexToData);

export default function Basic() {
    const [data1, setData1] = useState(initialData1);
    const [data2, setData2] = useState(initialData2);
    const [data3, setData3] = useState(initialData3);

    const renderItem = (params: RenderItemParams<Item>) => {
        const { item, drag, isActive, getPanGestureRef } = params;

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

    const keyExtractor = (item: Item) => item.key;

    return (
        <NestableScrollContainer style={{ backgroundColor: 'seashell' }}>
            <Header text={'List 1'} />
            <NestableDraggableFlatList
                data={data1}
                onDragEnd={({ data }) => setData1(data)}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                dragItemOverflow = {true}
            />
            <Header text={'List 2'} />
            <NestableDraggableFlatList
                data={data2}
                onDragEnd={({ data }) => setData2(data)}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
            <Header text={'List 3'} />
            <NestableDraggableFlatList
                data={data3}
                onDragEnd={({ data }) => setData3(data)}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
        </NestableScrollContainer>
    );
}

function Header({ text }: { text: string }) {
    return (
        <View>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    padding: 24,
                    color: '#555',
                }}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    rowItem: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
