// returns a hash map sorted by frequency
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

// returns the percent similarity between the school's top music and the user's 
function getBlend(schoolArtists, schoolTracks, userArtists, userTracks){
    const artistsPercent = compareSimilarity(schoolArtists, userArtists);
    const tracksPercent = compareSimilarity(schoolTracks, userTracks);
    
    const percent = (artistsPercent + tracksPercent)/2;
    return Math.floor(percent);
}

// returns the percent similarity of two lists 
function compareSimilarity(schoolList, userList){
    const schoolSet = new Set(schoolList);
    const userSet = new Set(userList);

    const intersection = new Set([...schoolSet].filter(x => userSet.has(x)));
    const union = new Set([...schoolSet, ...userSet]);

    const similarity = (intersection.size / union.size) * 100;
    return similarity;

}

// TESTING
const schoolArtists = [
    "Taylor Swift",
    "Harry Styles",
    "Taylor Swift",
    "Drake",
    "Drake",
    "Olivia Rodrigo",
    "Taylor Swift"
];

const userArtists = [
    "Taylor Swift",
    "Harry Styles",
    "Phoebe Bridgers",
    "Olivia Rodrigo",
    "One Direction",
    "Olivia Rodrigo",
    "Taylor Swift"
];

const schoolTracks = [
    "Shake It Off",
    "Watermelon Sugar",
    "BIRDS OF A FEATHER",
    "One Dance",
    "Shake It Off",
    "Shake It Off",
    "Good Luck, Babe",
    "Good Luck, Babe"
];

const userTracks = [
    "Shake It Off",
    "Driver's Liscense",
    "Golden",
    "Shake It Off",
    "Motion Sickness",
    "Watermelon Sugar",
    "No Control",
    "Watermelon Sugar"
];
        
sortedArtists = sortByFrequency(schoolArtists);

console.log("Top Artists:");
console.log(sortedArtists);

sortedTracks = sortByFrequency(schoolTracks);

console.log("Top Tracks:");
console.log(sortedTracks);

percentArtists = getBlend(schoolArtists, schoolTracks, userArtists, userTracks);
console.log("Your similarity:");
console.log(percentArtists + "%");