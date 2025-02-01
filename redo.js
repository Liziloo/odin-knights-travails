function knightMoves(start, end) {
    const path = [];
    path.push(start);
    const shortestPaths = getPath(start, end);
    console.log(shortestPaths);
}

function getPath(coord, end) {
    const shortest = [];
    // Create q
    const q = [];
    class pathTracker {
        constructor(coord, path) {
            this.coord = coord;
            this.path = path;
        }

        clone(newCoord) {
            const continuedPath = [...this.path, newCoord];
            return new pathTracker(newCoord, continuedPath);
        }
    }

    // Create tracker instance to track coord with path
    const firstTracker = new pathTracker(coord, [coord]);
    q.push(firstTracker);

    // While the queue isn't empty
    while(q[0]) {

        // Shift the queue
        const currentTracker = q.shift();

        // Get next moves of tracker at front of queue
        const nextMoves = getMoves(currentTracker.coord);

        // If end coordinate in nextMoves, add the end to the tracker's path and push the path to shortest array and put stopper in queue
        if (arrayIncludesArray(nextMoves, end)) {
            console.log('triggered');
            currentTracker.path.push(end);
            shortest.push(currentTracker.path);
            q.push(null);
        } else {
            // Else push each of next moves to queue unless creates loop
            for (let i = 0; i < nextMoves.length; i++) {
                if (!arrayIncludesArray(currentTracker.path, nextMoves[i])) {
                    // Create new copy of tracker for each non-looping move
                    const trackerClone = currentTracker.clone(nextMoves[i]);
                    q.push(trackerClone); 
                }
            }
        }
    }
    return shortest;
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

knightMoves([0,0],[7,7]);