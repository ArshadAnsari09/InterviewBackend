const sessionService = require("./service");
const {chatClient,streamClient} = require("../../services/stream");

const createSessionObj = (data) => {
    let obj = {};
    if(data.problem) obj.problem = data.problem;
    if(data.difficulty) obj.difficulty = data.difficulty;
    if(data.host) obj.host = data.host;
    if(data.participant) obj.participant = data.participant;
    if(data.sessionStatus) obj.sessionStatus = data.sessionStatus;
    if(data.callId) obj.callId = data.callId;
    return obj;
}

const createSession = async (info) => {
    try {
        const {problem, difficulty,user} = info;
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        const sessionObj = createSessionObj({...info,callId,host : user._id});
        const session = await sessionService.saveSession(sessionObj);
        console.log("Session created successfully:", session);

        // create stream video call
        const streamClientVideo = await streamClient.video.call("default", callId).getOrCreate({
            data: {
              created_by_id: user._id,
              custom: { problem, difficulty, sessionId: session._id.toString() },
            },
        });

        console.log("Stream video call created successfully:", streamClientVideo);
        // chat messaging
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: user._id,
            members: [user._id],
        });
        const createdChannel = await channel.create();
        console.log("Channel created successfully:", createdChannel);

        return session;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createSession,
}