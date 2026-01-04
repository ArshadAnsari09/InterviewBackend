const {StreamChat} = require("stream-chat");
const {StreamClient} = require("@stream-io/node-sdk");
const env = require("../config/env");

const apiKey = env.stream.apiKey;
const apiSecret = env.stream.apiSecret;

if(!apiKey || !apiSecret) console.error("Stream API key or secret is not set");


const streamClient = new StreamClient(apiKey,apiSecret); // for video calls
const chatClient = StreamChat.getInstance(apiKey, apiSecret); // for chat features

const createStreamUser = async (user) => {
    try {
        await chatClient.upsertUser(user);
        console.log("Stream user upserted successfully:", user);
    } catch (error) {
        console.error("Error upserting Stream user:", error);
        throw error;
    }
};

const deleteStreamUser = async (userId) => {
    try {
      await chatClient.deleteUser(userId);
      console.log("Stream user deleted successfully:", userId);
    } catch (error) {
      console.error("Error deleting the Stream user:", error);
      throw error;
    }
};

module.exports = {
    streamClient,
    chatClient,
    createStreamUser,
    deleteStreamUser
}