import * as dotenv from 'dotenv';
dotenv.config();

import MessagingProcess from "./proc/messaging.process";

try {
    new MessagingProcess().run(process.argv)
} catch (e) {
    console.error(e);
}