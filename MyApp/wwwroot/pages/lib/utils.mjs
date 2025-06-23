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

const reactionEmojis = ["👍","❤","😂","😢"]
export function reactionCounts(reactions) {
    const ret = {}
    reactionEmojis.forEach(emoji => {
        ret[emoji] = reactions[emoji] || 0
    })
    return ret
}

export function threadQuery(query) {
    return omit(query, ['new'])
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

export const acceptedImages = `${wordList('WEBP,JPG,PNG,GIF,BMP,TIFF')} (max 5MB)`
export const acceptedVideos = `${wordList('MP4,MOV,WEBM,MKV,AVI,WMV,OGG')} (max 50MB)`
export const acceptedAudios = `${wordList('MP3,M4A,AAC,FLAC,WAV,WMA')} (max 10MB)`
