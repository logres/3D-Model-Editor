import create from 'zustand'

const cubeCompare = (a, b) => {
    return a.position[0] === b.position[0] && a.position[1] === b.position[1] && a.position[2] === b.position[2];
}

const cubeRemoveRepeat = (cubes) => {
    const result = [];
    for (let i = 0; i < cubes.length; i++) {
        let flag = true;
        for (let j = 0; j < result.length; j++) {
            if (cubeCompare(cubes[i], result[j])) {
                flag = false;
                break;
            }
        }
        if (flag) {
            result.push(cubes[i]);
        }
    }
    return result;
}

// Cube {position: [x, y, z], color: 0xffffff, opacity: 0.5}

export const cubeStore = create(set => ({
    cubes: [{
        position: [0, 0, 0],
        color: 0xffffff,
        opacity: 1
    }],
    addCube: (cube) => set(state => ({ cubes: cubeRemoveRepeat([...state.cubes, cube]) })),
    removeCube: (cube) => set(state => ({
        cubes: state.cubes.filter(c =>
        (
            !cubeCompare(c, cube)
        )
        )
    })),
    setCubes: (cubes) => set(state => ({ cubes: cubes })),
    clearCubes: () => set(state => ({ cubes: [] })),
}))


export const colorStore = create(set => ({
    color: '#ffffff',
    changeColor: (color) => set(state => ({ color: color })),
}))

export const opacityStore = create(set => ({
    opacity: 1,
    changeOpacity: (opacity) => set(state => ({ opacity: opacity })),
}))

export const canvasStore = create(set => ({
    canvas: null,
    setCanvas: (canvas) => set(state => ({ canvas: canvas })),
}))