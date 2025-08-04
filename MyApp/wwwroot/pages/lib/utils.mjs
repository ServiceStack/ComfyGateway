import { fromXsdDuration, omit } from "@servicestack/client"

export const AllRatings = {
    "PG": "Safe for work, family friendly PG-rated content, some action, no violence, no suggestive content",
    "PG13": "Teen appropriate PG-13 content, mildly suggestive, minimal violence or strong language",
    "M": "Mature content, strong language, suggestive content, violence, restricted",
    "R": "R-rated adult themes, strong language, suggestive sexual content, partial nudity, violence",
    "X": "NSFW, Explicit sexual X-rated adults only content, graphic nudity",
    "XXX": "NSFW, Extreme explicit content, XXX-rated hardcore pornography, graphic violence",
}

// From ./data/categories-list.json
export const AllCategories = [ 
    "woman", "clothing", "anime", "outdoors", "comics", "photography", "costume", "man", "animal", "armor", 
    "transportation", "architecture", "city", "cartoon", "car", "food", "astronomy", "modern art", "cat", "robot", 
    "landscape", "dog", "latex clothing", "dragon", "fantasy", "sports car", "post apocalyptic", "photorealistic", 
    "game character", "sci-fi"
]

export const WorkflowGroups = [
    {
        name: 'Image',
        categories: [
            'Text to Image', 
            'Image to Image', 
            // 'Image to Text',
        ]
    },
    {
        name: 'Audio',
        categories: ['Audio to Text', 'Text to Audio']
    },
    {
        name: 'Video',
        categories: [
            'Image to Video', 
            // 'Video to Text'
        ]
    }
]

const reactionEmojis = ["👍","❤","😂","😢"]
export function reactionCounts(reactions, emojis=null) {
    const ret = {}
    emojis ??= reactionEmojis
    emojis.forEach(emoji => {
        ret[emoji] = reactions[emoji] || 0
    })
    return ret
}

export function threadQuery(query) {
    return omit(query, ['new'])
}

export function humanifyNumber(n) {
    if (n >= 1_000_000_000)
        return (n / 1_000_000_000).toFixed(1) + "b";
    if (n >= 1_000_000)
        return (n / 1_000_000).toFixed(1) + "m";
    if (n >= 1_000)
        return (n / 1_000).toFixed(1) + "k";
    return n.toLocaleString();
}

export function formatDuration(xsdDuration) {
    const seconds = fromXsdDuration(xsdDuration)
    const wholeSeconds = Math.floor(seconds);
    const milliseconds = Math.round((seconds - wholeSeconds) * 1000);
    const duration = {
        seconds: wholeSeconds,
        milliseconds: milliseconds
    };
    return new Intl.DurationFormat("en", { style:"narrow" }).format(duration)
}

export function formatRating(rating) {
    return rating?.replace('PG13', 'PG-13')
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRatingDisplay(artifact) {
    // Check for direct rating first, then predicted rating
    if (artifact.rating) {
        // Convert rating enum value to string
        const ratingMap = { 1: 'PG', 2: 'PG13', 4: 'M', 8: 'R', 16: 'X', 32: 'XXX' }
        const ret = ratingMap[artifact.rating] || artifact.rating.toString()
        return ret === 'PG13' ? 'PG-13' : ret
    }
    return artifact.ratings?.predictedRating || null
}

export function isAdultRating(rating) {
    return ['R', 'X', 'XXX'].includes(rating)
}

export function getRatingColorClass(rating) {
    if (['R', 'X', 'XXX'].includes(rating)) {
        // Adult ratings - Red
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 ring-red-600/40 dark:ring-red-400/50'
    } else if (rating === 'M') {
        // Mature rating - Orange/Amber
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 ring-amber-600/40 dark:ring-amber-400/50'
    } else {
        // Safe ratings (PG, PG13) - Green
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 ring-green-600/40 dark:ring-green-400/50'
    }
}

export function getRatingDescription(rating) {
    const descriptions = {
        'PG': 'Safe for work, family friendly content',
        'PG13': 'Teen appropriate content, mildly suggestive',
        'M': 'Mature content, strong language, suggestive content',
        'R': 'R-rated adult themes, strong language, partial nudity',
        'X': 'NSFW, Explicit sexual content, graphic nudity',
        'XXX': 'NSFW, Extreme explicit content, hardcore pornography'
    }
    return descriptions[rating] || 'Content rating'
}

export function wordList(items) {
    if (!items || !items.length) return ''
    if (typeof items == 'string') {
        items = items.split(',')
    }
    if (!Array.isArray(items)) return ''
    if (items.length === 1) return items[0]
    return items.slice(0, -1).join(', ') + ' or ' + items[items.length - 1]
}

export function toArtifacts(assets, selectedFn) {
    return assets?.map(x => ({
        width: x.width,
        height: x.height,
        url: x.url,
        filePath: x.url.substring(x.url.indexOf('/artifacts')),
        rating: x.rating,
        selected: selectedFn ? selectedFn(x) : false,
    })) ?? []
}

export function toJsonArray(json) {
    try {
        return json ? JSON.parse(json) : []
    } catch (e) {
        return []
    }
}

export function toJsonObject(json) {
    try {
        return json ? JSON.parse(json) : null
    } catch (e) {
        return null
    }
}

export function storageArray(key) {
    return toJsonArray(localStorage.getItem(key)) ?? []
}

export function storageObject(key) {
    return toJsonObject(localStorage.getItem(key)) ?? {}
}

export function sortByCreatedDesc(rows) {
    rows.sort((a, b) => ('' + b.createdDate).localeCompare(a.createdDate))
    return rows
}
export function sortByModifiedDesc(rows) {
    rows.sort((a, b) => ('' + b.modifiedDate).localeCompare(a.modifiedDate))
    return rows
}
export function sortByCreatedAsc(rows) {
    rows.sort((a, b) => ('' + a.createdDate).localeCompare(b.createdDate))
    return rows
}
export function sortByModifiedAsc(rows) {
    rows.sort((a, b) => ('' + a.modifiedDate).localeCompare(b.modifiedDate))
    return rows
}

export function validUrl(url) {
    if (!url) return false
    try {
        new URL(url)
        return true
    } catch (e) {
        return false
    }
}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function pluralize(word, count) {
    return count === 1 ? word : word + 's'
}

export const acceptedImages = `${wordList('WEBP,JPG,PNG,GIF,BMP,TIFF')} (max 5MB)`
export const acceptedVideos = `${wordList('MP4,MOV,WEBM,MKV,AVI,WMV,OGG')} (max 50MB)`
export const acceptedAudios = `${wordList('MP3,M4A,AAC,FLAC,WAV,WMA')} (max 10MB)`

export function getResolutionClass(width, height) {
    // Calculate total pixels
    const totalPixels = width * height;

    // Define resolution thresholds (in millions of pixels)
    const resolutionMap = [
        { threshold: 33, label: '8K' },    // 7680×4320 = ~33M pixels
        { threshold: 24, label: '6K' },    // 6144×3456 = ~21M pixels  
        { threshold: 14, label: '5K' },    // 5120×2880 = ~15M pixels
        { threshold: 8, label: '4K' },     // 3840×2160 = ~8M pixels
        { threshold: 4, label: '2K' },     // 2560×1440 = ~4M pixels
        { threshold: 2, label: '1080p' },  // 1920×1080 = ~2M pixels
        { threshold: 1, label: '720p' },   // 1280×720 = ~1M pixels
        { threshold: 0, label: '480p' }    // 854×480 = ~0.4M pixels
    ];

    const pixelsInMillions = totalPixels / 1000000;

    // Find the appropriate classification
    for (const resolution of resolutionMap) {
        if (pixelsInMillions >= resolution.threshold) {
            return resolution.label;
        }
    }

    return '480p'; // fallback for very low resolutions
}

export function getHDClass(width, height) {
    if (!width || !height) return ''
    const resolution = getResolutionClass(width, height)
    return resolution.endsWith('K')
        ? resolution
        : ''
}
