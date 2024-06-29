const conf = {
    appWriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId : String(import.meta.env.VITE_APWRITE_PROJECT_ID),
    appWriteDatabaseId : String(import.meta.env.VITE_APWRITE_DATABASE_ID),
    appWriteCollectionId : String(import.meta.env.VITE_APWRITE_COLLECTION_ID),
    appWriteBucketId : String(import.meta.env.VITE_APWRITE_BUCKET_ID),
    
}

export default conf;