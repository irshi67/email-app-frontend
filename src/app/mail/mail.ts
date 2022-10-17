import { MailStatus } from "./mailstatus.enum";

export interface Mail {
    id: string;
    from: string;
    to: Array<String>;
    subject: string;
    message: string;
    reply: string;
    status: MailStatus;
    read: Boolean;
}