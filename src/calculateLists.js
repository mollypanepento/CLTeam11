function sortByFrequency(arr){
    //insert elements in hash
    var hash = new Map();
    for(var i = 0; i < arr.length; i++){
        if(hash.has(arr[i]))
            hash.set(arr[i], hash.get(arr[i]) + 1)
            else hash.set(arr[i], 1)
    }
    const sorted = new Map([...hash.entries()].sort((a, b) => b[1] - a[1]));
    return sorted;
}


const artists = [
    "Taylor Swift",
    "Harry Styles",
    "Taylor Swift",
    "Drake",
    "Drake",
    "Olivia Rodrigo",
    "Taylor Swift"
];

const tracks = [
    "Shake It Off",
    "Watermelon Sugar",
    "BIRDS OF A FEATHER",
    "One Dance",
    "Shake It Off",
    "Shake It Off",
    "Good Luck, Babe",
    "Good Luck, Babe"
];
        
sortedArtists = sortByFrequency(artists);

console.log("Top Artists:");
console.log(sortedArtists);

sortedTracks = sortByFrequency(tracks);

console.log("Top Tracks:");
console.log(sortedTracks);