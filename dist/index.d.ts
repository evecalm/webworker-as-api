import Composie, { IMiddleware, IRouteParam, IContext as IComposieContext } from 'composie';
/** event callback */
export interface ICallback {
    (response: any): any;
}
/** event callbacks map */
export interface IEvtCallbacks {
    [k: string]: ICallback[];
}
/** message request */
export interface IMessageRequest {
    id: number;
    type: 'request';
    channel: string;
    data: any;
    event: Event;
    transfers?: any[];
}
/** message response */
export interface IMessageResponse {
    id: number;
    type: 'response';
    resolved: boolean;
    channel: string;
    data: any;
    event: Event;
}
/** message union */
export declare type IMessage = IMessageRequest | IMessageResponse;
/** promise pair to resolve response */
interface IPromisePairs {
    [k: number]: [Function, Function];
}
/** request context for middleware */
export interface IContext extends IComposieContext {
    id: number;
    type: 'request';
    event: Event;
}
/**
 * Worker Server Class
 */
export default class WorkerServer {
    count: number;
    worker: any;
    evtsCbs: IEvtCallbacks;
    promisePairs: IPromisePairs;
    composie: Composie;
    /** */
    constructor(worker?: Worker);
    /**
     * add global middleware
     * @param cb middleware
     */
    use(cb: IMiddleware): this;
    /**
     * add router
     * @param routers router map
     */
    route(routers: IRouteParam): any;
    /**
     * add router
     * @param channel channel name
     * @param cbs channel handlers
     */
    route(channel: string, ...cbs: IMiddleware[]): any;
    /**
     * request other side for a response
     * @param channel channel name
     * @param data params to the channel
     * @param transfers object array want to transfer
     */
    fetch(channel: string, data: any, transfers?: any[]): Promise<any> | undefined;
    /**
     * listen event from other side
     * @param channel channel name
     * @param cb callback function
     */
    on(channel: string, cb: ICallback): void;
    /**
     * remove event listener
     * @param channel channel name
     * @param cb callback function
     */
    off(channel: string, cb?: ICallback): void;
    /**
     * emit event that will be listened from on
     * @param channel channel name
     * @param data params
     * @param transfers object array want to transfer
     */
    emit(channel: string, data: any, transfers?: any[]): void;
    /**
     * create context used by middleware
     * @param evt message event
     */
    protected createContext(evt: MessageEvent): IContext;
    /**
     * listen original message event
     * @param evt message event
     */
    protected onMessage(evt: MessageEvent): void;
    /**
     * send message to the other side
     * @param message meesage object to send
     * @param needResp whether need response from other side
     */
    protected postMessage(message: IMessage, needResp?: boolean): Promise<any> | undefined;
}
export {};
