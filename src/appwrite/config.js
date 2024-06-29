import { Client, Account, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async updatePost(documentId, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }

    async deletePost(documentId){
        try {
           return await this.databases.deleteDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            documentId,
           )
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
        }
    }

    async getPost(documentId){
        try {
           return await this.databases.getDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            documentId,
           )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
        }
    }

     filePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appWriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log("Appwrite service :: filePreview :: error", error)
        }
    }
}

const service = new Service();
export default service;