import "jest";
import "reflect-metadata";
import {PingFinder} from "../../../src/services/ping-finder";
import {MessageResponder} from "../../../src/services/message-responder";
import {Message} from "discord.js";
import {instance, mock, verify, when} from "ts-mockito";

describe('MessageResponder', () => {
    let mockedPingFinderClass: PingFinder;
    let mockedPingFinderInstance: PingFinder;
    let mockedMessageClass: Message;
    let mockedMessageInstance: Message;

    let service: MessageResponder;

    beforeEach(() => {
        mockedPingFinderClass = mock(PingFinder);
        mockedPingFinderInstance = instance(mockedPingFinderClass);
        mockedMessageClass = mock(Message);
        mockedMessageInstance = instance(mockedMessageClass);

        setMessageContents();

        service = new MessageResponder(mockedPingFinderInstance)
    })
    it('should reply', (done) => {
        whenIsPingThenReturn(true);

        service.handle(mockedMessageInstance)  
        done();
        //verify(mockedPingFinderClass.isPing('Non-empty string')).once();
        verify(mockedMessageClass.reply('pong!')).once();
    })

    it('should not reply', () => {
        whenIsPingThenReturn(false);

        service.handle(mockedMessageInstance).then(() => {
            //Successful promise is unexpected, so we fail the test
            fail('Unexpected promise');
        }).catch((error) => {
            //Rejected promise is expected, so nothing happens here
        })
    
        verify(mockedMessageClass.reply('pong!')).never();
    })

    function setMessageContents() {
        mockedMessageInstance.content = "Non-empty string";
    }

    function whenIsPingThenReturn(result: boolean) {
        when(mockedPingFinderClass.isPing('Non-empty string')).thenReturn(result)
    }
})

describe('PingFinder', () => {
    let service: PingFinder;
    beforeEach(() => {
        service = new PingFinder();
    })

    it('should find "ping" in the string', () => {
        expect(service.isPing("ping")).toBe(true);
    })
})