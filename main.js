function knightMoves(coord1, coord2) {
    const shortPaths = getPaths(coord1, coord2);
    console.log(`=> You made it in ${shortPaths[0].length} moves! Here's your path:`);
}

function getPaths(coord, end, path = [], paths = []) {
    if (arrayIncludesArray(path, coord)) {
        return null;
    };
    path.push(coord);
    if (JSON.stringify(coord) == JSON.stringify(end)) {
        if (paths.length === 0 || paths[0].length === path.length) {
            paths.push(path);
            console.log(paths);
            return paths;
        } else if (path.length < paths[0].length) {
            paths = [];
            console.log(2, paths);
            paths.push(path);
        }
    }
    
    const nextMoves = getMoves(coord);
    let newShorts = [];
    for (let i = 0; i < nextMoves.length; i++) {
        const newPaths = getPaths(nextMoves[i], end, path, paths);
        if (newPaths && newPaths.length > 0 && newPaths[0].length > 0) {
            if (newShorts.length < 1 || newShorts[0].length < 1 || newShorts[0].length > newPaths[0].length) {
                newShorts = newPaths;
            }
        }
    }
    if (newShorts.length > 0 && newShorts[0].length > 0) {
        if (paths.length < 1 || paths[0].length < 1 || paths[0].length > newShorts[0].length) return newShorts;
    }
    return paths;
}

function arrayIncludesArray(arr1, arr2) {
    return arr1.some(item => Array.isArray(item) && item.length === arr2.length && item.every((value, index) => value === arr2[index]));
  }

function getMoves(arr) {
    const nextMoves = [];
    for (let i = -2; i < 3; i++) {
        if (i === 0) continue;
        const possX = arr[0] + i;
        if (possX < 0 || possX > 7) continue;
        if (i === 1 || i === -1) {
            const possY1 = arr[1] + 2;
            if (possY1 > 0 && possY1 < 8) {
                nextMoves.push([possX, possY1]);
            }
            const possY2 = arr[1] - 2;
            if (possY2 > 0 && possY2 < 8) {
                nextMoves.push([possX, possY2]);
            }
        } else {
            const possY1 = arr[1] + 1;
            if (possY1 > 0 && possY1 < 8) {
                nextMoves.push([possX, possY1]);
            }
            const possY2 = arr[1] - 1;
            if (possY2 > 0 && possY2 < 8) {
                nextMoves.push([possX, possY2]);
            }
        }
    }
    return nextMoves;
}

knightMoves([0,0],[1,2])