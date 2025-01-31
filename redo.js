function knightMoves(start, end) {
    path = [start];
    const shortest = getPaths(start, end, path);
    console.log(shortest);
}

function getPaths(coord, end, path) {
    const nextMoves = getMoves(coord);
    let shortest;
    for (let i = 0; i < nextMoves.length; i++) {
        if (arrayIncludesArray(path, nextMoves[i])) continue;
        if (JSON.stringify(nextMoves[i]) === JSON.stringify(end)) {
            path.push(end);
            return path;
        }
        const continuedPaths = getPaths(nextMoves[i], end, path);
        if (!continuedPaths) continue;
        if (!shortest || (shortest[0].length > continuedPaths[0].length)) {
            shortest = [continuedPaths];
        } else if (shortest[0].length === continuedPaths[0].length) {
            shortest.concat(continuedPaths);
        }
    }
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

knightMoves([3,3],[0,0]);