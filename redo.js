function knightMoves(start, end) {
    const shortestPath = getPath(start, end);
    console.log(`=> You made it in ${shortestPath.length} moves! Here's your path:`);
    for (let i = 0; i < shortestPath.length; i++) {
        console.log(shortestPath[i]);
    }
}
class pathTracker {
    constructor(coord, path) {
        this.coord = coord;
        this.path = path;
    }
}
function getPath(start, end) {
    // Create q
    const q = [];
    

    // Create tracker instance to track coord with path
    const firstTracker = new pathTracker(start, [start]);
    q.push(firstTracker);

    // While the queue isn't empty
    while(q[0]) {
        // Shift the queue
        const currentTracker = q.shift();
        if (JSON.stringify(currentTracker.coord) === JSON.stringify(end)) {
            
            return currentTracker.path;
        }

        // Get next moves of tracker at front of queue
        const nextMoves = getMoves(currentTracker.coord); 
        for (let i = 0; i < nextMoves.length; i++) {
            if (!arrayIncludesArray(currentTracker.path, nextMoves[i])) {
                const newTracker = new pathTracker(nextMoves[i], [...currentTracker.path]);
                newTracker.path.push(nextMoves[i]);
                q.push(newTracker);
            }
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

knightMoves([0,0],[7,7])