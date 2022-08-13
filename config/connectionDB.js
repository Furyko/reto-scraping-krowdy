import Dexie from 'dexie'

export const db = new Dexie('database')
db.version(1).stores({
    profile: '++id, contactInfo, educationTitles, experienceTitles',
})