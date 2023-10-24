import Pusher from "pusher";

const connectToPusher = () => {
    return new Pusher({
        appId: process.env.PUSHER_APP_ID!,
        key: process.env.PUSHER_APP_KEY!,
        secret: process.env.PUSHER_APP_SECRET!,
        cluster: "us2",
        useTLS: true,
    });
};

export default connectToPusher;
