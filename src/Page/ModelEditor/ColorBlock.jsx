import React from "react";
import { colorStore, opacityStore } from "./store";

const ColorBlock = () => {
    const [color, setColor] = React.useState("#ffffff");
    const [opacity, setOpacity] = React.useState(1);
    const changeColor = colorStore((state) => state.changeColor);
    const changeOpacity = opacityStore((state) => state.changeOpacity);
    const storeColor = colorStore((state) => state.color);
    const storeOpacity = opacityStore((state) => state.opacity);
    const theColor = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
        color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;
    return (
        <div
            style={{
                backgroundColor: theColor,
                width: "20%",
                height: "60px",
                borderRadius: "4px",
                boxShadow: "0px 0px 2px rgba(0,0,0,0.3)",
            }}
            onClick={() => {
                changeColor(color);
                changeOpacity(opacity);
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                setColor(storeColor);
                setOpacity(storeOpacity);
            }}
        />
    );
};

export default ColorBlock;
