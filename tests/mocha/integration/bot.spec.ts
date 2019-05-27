import container from "../../../src/inversity.config";
import {TYPES} from "../../../src/types";
import "reflect-metadata";
import "mocha";
import {expect} from "chai";
import {PingFinder} from "../../../src/services/ping-finder";
import {MessageResponder} from "../../../src/services/message-responder";
import {instance, mock, verify, when} from "ts-mockito";
import {Message, Client} from "discord.js";
import { Bot } from "../../../src/bot";

describe('Bot', () => {
    let discordMock: Client;
    let discordInstance: Client;
    let bot: Bot;

    beforeEach(() => {
        discordMock = mock(Client);
        discordInstance = instance(discordMock);
        container.rebind<Client>(TYPES.Client).toConstantValue(discordInstance);
        bot = container.get<Bot>(TYPES.Bot);
    })

    //test Here
})
