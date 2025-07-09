import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, database } from "./client";
import { redirect } from "react-router";

export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(OAuthProvider.Google)
    } catch (e) {
        console.log('loginWithGoogle', e);
    }
}

export const getUser = async () => {
    try {
        //get the current user
        const user = await account.get();

        //check if user is logged in if not go to sign in
        if(!user) return redirect('/sign-in');

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal('accountId', user.$id),
                Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId'])
            ]
        )

        if (documents.length === 0) {
            // user authenticated but no in database, store user data
            return await storeUserData();
        }
        
    } catch (e) {
        console.log(e);
    }
}

export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch (e) {
        console.log('logoutUser error : ', e);
    }
}


export const getGooglePicture = async () => {
    try {
        // get the current user session
        const session = await account.getSession('current');

        // get the OAuth2 token from the session
        const oAuthToken = session.providerAccessToken;

        if(!oAuthToken){
            console.log('No OAuth token available');
            return null;
        }

        // make a request to the Google People API to get the profile picture
        const response = await fetch(
            'https://people.googleapis.com/v1/people/me?personFields=photos',
            {
                headers: {
                    Authorization: `Bearer ${oAuthToken}`
                }
            }
        );
        
        if(!response.ok){
            console.log('Failed to fetch profile photo from Google People API');
            return null;
        }
        
        const data = await response.json();

        // extract the profile photo URL from the response
        const photoUrl = data.photos && data.photos.length > 0 
        ? data.photos[0].url 
        : null;

        return photoUrl;

    } catch (e) {
        console.log('getGooglePicture error : ',e);
    }
}

export const storeUserData = async () => {
    try {
        const user = await account.get();

        if (!user) return null;

        // check if the user already exists in the database
        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', user.$id)]
        );

        if(documents.length > 0) return documents[0];

        // get profile picture from google
        const imageUrl = await getGooglePicture();

        // create new user document

        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                email: user.email,
                name: user.name,
                imageUrl: imageUrl || '',
                joinedAt: new Date().toISOString(),
            }
        )

        return newUser;
    } catch (e) {
        console.log('storeUserData error : ', e);
    }
}

export const getExistingUser = async () => {
    try {
        const user = await account.get();

        if (!user) return null;

        // check if the user exists in the database
        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', user.$id)]
        );

        if (documents.length === 0 ) return null;
        
        return documents[0];
    } catch (e) {
        console.log('getExistingUser error : ',e);
    }
}