import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { colorStore, cubeStore, opacityStore, canvasStore } from './store';
import { Button, Card, Divider, Input, Popover, Space, Modal } from 'antd';
import ColorBlock from './ColorBlock';
import './Panel.css';

const SaveModal = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const canvas = canvasStore((state) => state.canvas);
    const cubes = cubeStore((state) => state.cubes);
    const handleSave = async () => {
        const data = JSON.stringify(cubes);
        const screenshot = canvas.toDataURL('image/png');
        const obj = {
            name: name,
            description: description,
            data: data,
            screenshot: screenshot
        }
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(obj)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "model.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };
    return (
        <form>
            <Input placeholder="Model Name" onChange={
                (e) => {
                    setName(e.target.value);
                }
            } />
            <br /><br />
            <Input placeholder="Model Description" onChange={
                (e) => {
                    setDescription(e.target.value);
                }
            } />
            <br /><br />
            <Button onClick={handleSave}>Save</Button>
        </form>
    )
}

const ImportModal = () => {

    const [modelCid, setModelCid] = useState('');
    const [relativeOffset, setRelativeOffset] = useState([0, 0, 0]);

    const addCube = cubeStore((state) => state.addCube);
    const handleImport = async () => {
        const real_content = JSON.parse(modelCid);
        const cubes = JSON.parse(real_content.data);
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].position[0] += relativeOffset[0];
            cubes[i].position[1] += relativeOffset[1];
            cubes[i].position[2] += relativeOffset[2];
            addCube(cubes[i]);
        }
        ;
    };
    return (
        <form>
            <Input placeholder="Json Data" onChange={(e) => {
                setModelCid(
                    e.target.value
                )
            }} />
            <br /><br />
            <Space>
                <Input placeholder="X Offset" onChange={
                    (e) => {
                        const newOffset = relativeOffset;
                        newOffset[0] = parseInt(e.target.value);
                        setRelativeOffset(newOffset);
                    }
                } />
                <Input placeholder="Y Offset" onChange={
                    (e) => {
                        const newOffset = relativeOffset;
                        newOffset[1] = parseInt(e.target.value);
                        setRelativeOffset(newOffset);
                    }
                } />
                <Input placeholder="Z Offset" onChange={
                    (e) => {
                        const newOffset = relativeOffset;
                        newOffset[2] = parseInt(e.target.value);
                        setRelativeOffset(newOffset);
                    }
                } />
            </Space>
            <br /><br />
            <Button onClick={handleImport}>Import</Button>
        </form>
    )
}

const Panel = () => {
    const changeColor = colorStore((state) => state.changeColor);
    const changeOpacity = opacityStore((state) => state.changeOpacity);
    const color = colorStore((state) => state.color);
    const opacity = opacityStore((state) => state.opacity);


    const [saveModalVisible, setSaveModalVisible] = useState(false);
    const [importModalVisible, setImportModalVisible] = useState(false);

    const handleColorChange = (newColor) => {
        changeColor(newColor.hex);
        changeOpacity(newColor.rgb.a);
    };

    const addCube = cubeStore((state) => state.addCube);
    const clearCubes = cubeStore((state) => state.clearCubes);
    const handleReset = () => {
        clearCubes();
        addCube({
            position: [0, 0, 0],
            color: 0xffffff,
            opacity: 1
        });
    };

    const theColor = {
        r: parseInt(color.slice(1, 3), 16),
        g: parseInt(color.slice(3, 5), 16),
        b: parseInt(color.slice(5, 7), 16),
        a: opacity
    }

    const previewColor = `rgba(${theColor.r}, ${theColor.g}, ${theColor.b}, ${theColor.a})`;

    return (
        <Card className="panel" title="Tool Panel" style={{ height: "100%", borderRadius: '16px' }}>
            <div className="metal-stripes"></div>
            <Space className="ant-space" direction="vertical" style={{ width: "100%" }}>

                <div className="color-blocks"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                    }}

                >
                    {/* Create Three ColorBlock */}
                    <ColorBlock />
                    <ColorBlock />
                    <ColorBlock />
                    <ColorBlock />
                </div>

                <Divider />

                {/* 颜色预览 */}
                <div
                    style={{
                        backgroundColor: previewColor,
                        width: "100%",
                        height: "40px",
                        borderRadius: "4px",
                        boxShadow: "0px 0px 2px rgba(0,0,0,0.3)",
                    }}
                ></div>
                <Popover placement="bottom" title="Color Picker" content={<ChromePicker color={theColor} onChange={handleColorChange} />} trigger="click">
                    <Button className="metal button" block>
                        ColorChange
                    </Button>
                </Popover>

                <Divider />
                <div>
                    <Modal title="Save" open={saveModalVisible} footer={[]} onCancel={
                        () => { setSaveModalVisible(false); }
                    }>
                        <SaveModal />
                    </Modal>
                    <Button className="metal button" onClick={() => { setSaveModalVisible(true); }} block>
                        Save
                    </Button>
                </div>
                <div>
                    <Modal title="Import" open={importModalVisible} footer={[]} onCancel={
                        () => { setImportModalVisible(false); }
                    }>
                        <ImportModal />
                    </Modal>
                    <Button className="metal button" onClick={() => { setImportModalVisible(true) }} block>
                        Import
                    </Button>
                </div>
                <Divider />
                <div >
                    <Button className="reset button" onClick={handleReset} block>
                        Reset
                    </Button>
                </div>
            </Space>
        </Card>
    );
};

export default Panel;
