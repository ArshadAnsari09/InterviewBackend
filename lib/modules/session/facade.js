const sessionService = require("./service");
const {chatClient,streamClient} = require("../../services/stream");
const customException = require("../../customException");

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

const getSessions = async (info) => {
    try {
        const sessionsCount = await sessionService.sessionList(info,true).countDocuments();
        let sessions = await userService.userList(info);
        sessions = appUtils.sorting(sessions, info);
        return { total : sessionsCount,sessions};
    } catch (error) {
        throw error;
    }
}

const getSession = async (info) => {
    try {
        const {sessionId} = info;

        const session = await sessionService.getOne({_id : sessionId,status : true,isDeleted : false},{__v:0,createdAt:0,updatedAt:0,isDeleted:0,status:0})
        .populate("host","email fullName avatar")
        .populate("participant","email fullName avatar");

        if(!session) throw customException.completeCustomException("session_not_found");
        else return session;
    } catch (error) {
        throw error;
    }
};

const joinSession = async (info) => {
    try {
        const {sessionId,user} = info;
        const session = await sessionService.getOne({_id : sessionId,status : true,isDeleted : false});
        if(!session) throw customException.completeCustomException("session_not_found");
        if(session.host.toString() === user._id.toString()) throw customException.completeCustomException("host_already_joined");
        if(session.participant) throw customException.completeCustomException("participant_already_joined_session");
        
        //enable messaging
        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([user._id]);
        
        const updatedSession = await sessionService.findOneAndUpdate({_id : sessionId},{participant : user._id},{new : true});
        return updatedSession;
    } catch (error) {
        throw error;
    }
};

const endSession = async (info) => {
    try {
        const {sessionId,user} = info;
        const session = await sessionService.getOne({_id : sessionId,status:true,isDeleted : false});
        if(!session) throw customException.completeCustomException("session_not_found");

        if(session.host.toString() !== user._id.toString()) throw customException.completeCustomException("only_host_can_end_session");
        if(session.sessionStatus === "completed") throw customException.completeCustomException("session_already_completed");

        // delete stream video call
        const call = streamClient.video.call("default", session.callId);
        await call.delete({ hard: true });

        // delete stream chat channel
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

        const updatedSession = await sessionService.findOneAndUpdate({_id : sessionId},{sessionStatus : "completed"},{ new : true});
        return updatedSession;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createSession,
    getSession,
    getSessions,
    joinSession,
    endSession
}