import * as $protobuf from "protobufjs";
/** Properties of an ApaasUserJoin. */
export interface IApaasUserJoin {

    /** ApaasUserJoin lts */
    lts?: (number|Long|null);

    /** ApaasUserJoin vid */
    vid?: (number|null);

    /** ApaasUserJoin ver */
    ver?: (string|null);

    /** ApaasUserJoin scenario */
    scenario?: (string|null);

    /** ApaasUserJoin errorCode */
    errorCode?: (number|null);

    /** ApaasUserJoin uid */
    uid?: (string|null);

    /** ApaasUserJoin userName */
    userName?: (string|null);

    /** ApaasUserJoin streamUid */
    streamUid?: (number|Long|null);

    /** ApaasUserJoin streamSuid */
    streamSuid?: (string|null);

    /** ApaasUserJoin role */
    role?: (string|null);

    /** ApaasUserJoin streamSid */
    streamSid?: (string|null);

    /** ApaasUserJoin rtmSid */
    rtmSid?: (string|null);

    /** ApaasUserJoin roomId */
    roomId?: (string|null);

    /** ApaasUserJoin roomCreateTs */
    roomCreateTs?: (number|Long|null);
}

/** Represents an ApaasUserJoin. */
export class ApaasUserJoin implements IApaasUserJoin {

    /**
     * Constructs a new ApaasUserJoin.
     * @param [properties] Properties to set
     */
    constructor(properties?: IApaasUserJoin);

    /** ApaasUserJoin lts. */
    public lts: (number|Long);

    /** ApaasUserJoin vid. */
    public vid: number;

    /** ApaasUserJoin ver. */
    public ver: string;

    /** ApaasUserJoin scenario. */
    public scenario: string;

    /** ApaasUserJoin errorCode. */
    public errorCode: number;

    /** ApaasUserJoin uid. */
    public uid: string;

    /** ApaasUserJoin userName. */
    public userName: string;

    /** ApaasUserJoin streamUid. */
    public streamUid: (number|Long);

    /** ApaasUserJoin streamSuid. */
    public streamSuid: string;

    /** ApaasUserJoin role. */
    public role: string;

    /** ApaasUserJoin streamSid. */
    public streamSid: string;

    /** ApaasUserJoin rtmSid. */
    public rtmSid: string;

    /** ApaasUserJoin roomId. */
    public roomId: string;

    /** ApaasUserJoin roomCreateTs. */
    public roomCreateTs: (number|Long);

    /**
     * Creates a new ApaasUserJoin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ApaasUserJoin instance
     */
    public static create(properties?: IApaasUserJoin): ApaasUserJoin;

    /**
     * Encodes the specified ApaasUserJoin message. Does not implicitly {@link ApaasUserJoin.verify|verify} messages.
     * @param message ApaasUserJoin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IApaasUserJoin, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ApaasUserJoin message, length delimited. Does not implicitly {@link ApaasUserJoin.verify|verify} messages.
     * @param message ApaasUserJoin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IApaasUserJoin, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ApaasUserJoin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ApaasUserJoin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ApaasUserJoin;

    /**
     * Decodes an ApaasUserJoin message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ApaasUserJoin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ApaasUserJoin;

    /**
     * Verifies an ApaasUserJoin message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ApaasUserJoin message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ApaasUserJoin
     */
    public static fromObject(object: { [k: string]: any }): ApaasUserJoin;

    /**
     * Creates a plain object from an ApaasUserJoin message. Also converts values to other types if specified.
     * @param message ApaasUserJoin
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ApaasUserJoin, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ApaasUserJoin to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an ApaasUserQuit. */
export interface IApaasUserQuit {

    /** ApaasUserQuit lts */
    lts?: (number|Long|null);

    /** ApaasUserQuit vid */
    vid?: (number|null);

    /** ApaasUserQuit ver */
    ver?: (string|null);

    /** ApaasUserQuit scenario */
    scenario?: (string|null);

    /** ApaasUserQuit errorCode */
    errorCode?: (number|null);

    /** ApaasUserQuit uid */
    uid?: (string|null);

    /** ApaasUserQuit userName */
    userName?: (string|null);

    /** ApaasUserQuit streamUid */
    streamUid?: (number|Long|null);

    /** ApaasUserQuit streamSuid */
    streamSuid?: (string|null);

    /** ApaasUserQuit role */
    role?: (string|null);

    /** ApaasUserQuit streamSid */
    streamSid?: (string|null);

    /** ApaasUserQuit rtmSid */
    rtmSid?: (string|null);

    /** ApaasUserQuit roomId */
    roomId?: (string|null);

    /** ApaasUserQuit roomCreateTs */
    roomCreateTs?: (number|Long|null);
}

/** Represents an ApaasUserQuit. */
export class ApaasUserQuit implements IApaasUserQuit {

    /**
     * Constructs a new ApaasUserQuit.
     * @param [properties] Properties to set
     */
    constructor(properties?: IApaasUserQuit);

    /** ApaasUserQuit lts. */
    public lts: (number|Long);

    /** ApaasUserQuit vid. */
    public vid: number;

    /** ApaasUserQuit ver. */
    public ver: string;

    /** ApaasUserQuit scenario. */
    public scenario: string;

    /** ApaasUserQuit errorCode. */
    public errorCode: number;

    /** ApaasUserQuit uid. */
    public uid: string;

    /** ApaasUserQuit userName. */
    public userName: string;

    /** ApaasUserQuit streamUid. */
    public streamUid: (number|Long);

    /** ApaasUserQuit streamSuid. */
    public streamSuid: string;

    /** ApaasUserQuit role. */
    public role: string;

    /** ApaasUserQuit streamSid. */
    public streamSid: string;

    /** ApaasUserQuit rtmSid. */
    public rtmSid: string;

    /** ApaasUserQuit roomId. */
    public roomId: string;

    /** ApaasUserQuit roomCreateTs. */
    public roomCreateTs: (number|Long);

    /**
     * Creates a new ApaasUserQuit instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ApaasUserQuit instance
     */
    public static create(properties?: IApaasUserQuit): ApaasUserQuit;

    /**
     * Encodes the specified ApaasUserQuit message. Does not implicitly {@link ApaasUserQuit.verify|verify} messages.
     * @param message ApaasUserQuit message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IApaasUserQuit, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ApaasUserQuit message, length delimited. Does not implicitly {@link ApaasUserQuit.verify|verify} messages.
     * @param message ApaasUserQuit message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IApaasUserQuit, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ApaasUserQuit message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ApaasUserQuit
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ApaasUserQuit;

    /**
     * Decodes an ApaasUserQuit message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ApaasUserQuit
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ApaasUserQuit;

    /**
     * Verifies an ApaasUserQuit message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ApaasUserQuit message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ApaasUserQuit
     */
    public static fromObject(object: { [k: string]: any }): ApaasUserQuit;

    /**
     * Creates a plain object from an ApaasUserQuit message. Also converts values to other types if specified.
     * @param message ApaasUserQuit
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ApaasUserQuit, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ApaasUserQuit to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an ApaasUserReconnect. */
export interface IApaasUserReconnect {

    /** ApaasUserReconnect lts */
    lts?: (number|Long|null);

    /** ApaasUserReconnect vid */
    vid?: (number|null);

    /** ApaasUserReconnect ver */
    ver?: (string|null);

    /** ApaasUserReconnect scenario */
    scenario?: (string|null);

    /** ApaasUserReconnect errorCode */
    errorCode?: (number|null);

    /** ApaasUserReconnect uid */
    uid?: (string|null);

    /** ApaasUserReconnect userName */
    userName?: (string|null);

    /** ApaasUserReconnect streamUid */
    streamUid?: (number|Long|null);

    /** ApaasUserReconnect streamSuid */
    streamSuid?: (string|null);

    /** ApaasUserReconnect role */
    role?: (string|null);

    /** ApaasUserReconnect streamSid */
    streamSid?: (string|null);

    /** ApaasUserReconnect rtmSid */
    rtmSid?: (string|null);

    /** ApaasUserReconnect roomId */
    roomId?: (string|null);

    /** ApaasUserReconnect roomCreateTs */
    roomCreateTs?: (number|Long|null);
}

/** Represents an ApaasUserReconnect. */
export class ApaasUserReconnect implements IApaasUserReconnect {

    /**
     * Constructs a new ApaasUserReconnect.
     * @param [properties] Properties to set
     */
    constructor(properties?: IApaasUserReconnect);

    /** ApaasUserReconnect lts. */
    public lts: (number|Long);

    /** ApaasUserReconnect vid. */
    public vid: number;

    /** ApaasUserReconnect ver. */
    public ver: string;

    /** ApaasUserReconnect scenario. */
    public scenario: string;

    /** ApaasUserReconnect errorCode. */
    public errorCode: number;

    /** ApaasUserReconnect uid. */
    public uid: string;

    /** ApaasUserReconnect userName. */
    public userName: string;

    /** ApaasUserReconnect streamUid. */
    public streamUid: (number|Long);

    /** ApaasUserReconnect streamSuid. */
    public streamSuid: string;

    /** ApaasUserReconnect role. */
    public role: string;

    /** ApaasUserReconnect streamSid. */
    public streamSid: string;

    /** ApaasUserReconnect rtmSid. */
    public rtmSid: string;

    /** ApaasUserReconnect roomId. */
    public roomId: string;

    /** ApaasUserReconnect roomCreateTs. */
    public roomCreateTs: (number|Long);

    /**
     * Creates a new ApaasUserReconnect instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ApaasUserReconnect instance
     */
    public static create(properties?: IApaasUserReconnect): ApaasUserReconnect;

    /**
     * Encodes the specified ApaasUserReconnect message. Does not implicitly {@link ApaasUserReconnect.verify|verify} messages.
     * @param message ApaasUserReconnect message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IApaasUserReconnect, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ApaasUserReconnect message, length delimited. Does not implicitly {@link ApaasUserReconnect.verify|verify} messages.
     * @param message ApaasUserReconnect message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IApaasUserReconnect, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ApaasUserReconnect message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ApaasUserReconnect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ApaasUserReconnect;

    /**
     * Decodes an ApaasUserReconnect message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ApaasUserReconnect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ApaasUserReconnect;

    /**
     * Verifies an ApaasUserReconnect message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ApaasUserReconnect message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ApaasUserReconnect
     */
    public static fromObject(object: { [k: string]: any }): ApaasUserReconnect;

    /**
     * Creates a plain object from an ApaasUserReconnect message. Also converts values to other types if specified.
     * @param message ApaasUserReconnect
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ApaasUserReconnect, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ApaasUserReconnect to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ScreenShareStar. */
export interface IScreenShareStar {

    /** ScreenShareStar lts */
    lts?: (number|Long|null);

    /** ScreenShareStar vid */
    vid?: (number|null);

    /** ScreenShareStar ver */
    ver?: (string|null);

    /** ScreenShareStar scenario */
    scenario?: (string|null);

    /** ScreenShareStar errorCode */
    errorCode?: (number|null);

    /** ScreenShareStar uid */
    uid?: (string|null);

    /** ScreenShareStar userName */
    userName?: (string|null);

    /** ScreenShareStar streamUid */
    streamUid?: (number|Long|null);

    /** ScreenShareStar streamSuid */
    streamSuid?: (string|null);

    /** ScreenShareStar role */
    role?: (string|null);

    /** ScreenShareStar streamSid */
    streamSid?: (string|null);

    /** ScreenShareStar rtmSid */
    rtmSid?: (string|null);

    /** ScreenShareStar roomId */
    roomId?: (string|null);

    /** ScreenShareStar roomCreateTs */
    roomCreateTs?: (number|Long|null);
}

/** Represents a ScreenShareStar. */
export class ScreenShareStar implements IScreenShareStar {

    /**
     * Constructs a new ScreenShareStar.
     * @param [properties] Properties to set
     */
    constructor(properties?: IScreenShareStar);

    /** ScreenShareStar lts. */
    public lts: (number|Long);

    /** ScreenShareStar vid. */
    public vid: number;

    /** ScreenShareStar ver. */
    public ver: string;

    /** ScreenShareStar scenario. */
    public scenario: string;

    /** ScreenShareStar errorCode. */
    public errorCode: number;

    /** ScreenShareStar uid. */
    public uid: string;

    /** ScreenShareStar userName. */
    public userName: string;

    /** ScreenShareStar streamUid. */
    public streamUid: (number|Long);

    /** ScreenShareStar streamSuid. */
    public streamSuid: string;

    /** ScreenShareStar role. */
    public role: string;

    /** ScreenShareStar streamSid. */
    public streamSid: string;

    /** ScreenShareStar rtmSid. */
    public rtmSid: string;

    /** ScreenShareStar roomId. */
    public roomId: string;

    /** ScreenShareStar roomCreateTs. */
    public roomCreateTs: (number|Long);

    /**
     * Creates a new ScreenShareStar instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ScreenShareStar instance
     */
    public static create(properties?: IScreenShareStar): ScreenShareStar;

    /**
     * Encodes the specified ScreenShareStar message. Does not implicitly {@link ScreenShareStar.verify|verify} messages.
     * @param message ScreenShareStar message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IScreenShareStar, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ScreenShareStar message, length delimited. Does not implicitly {@link ScreenShareStar.verify|verify} messages.
     * @param message ScreenShareStar message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IScreenShareStar, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ScreenShareStar message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ScreenShareStar
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ScreenShareStar;

    /**
     * Decodes a ScreenShareStar message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ScreenShareStar
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ScreenShareStar;

    /**
     * Verifies a ScreenShareStar message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ScreenShareStar message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ScreenShareStar
     */
    public static fromObject(object: { [k: string]: any }): ScreenShareStar;

    /**
     * Creates a plain object from a ScreenShareStar message. Also converts values to other types if specified.
     * @param message ScreenShareStar
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ScreenShareStar, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ScreenShareStar to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ScreenShareEnd. */
export interface IScreenShareEnd {

    /** ScreenShareEnd lts */
    lts?: (number|Long|null);

    /** ScreenShareEnd vid */
    vid?: (number|null);

    /** ScreenShareEnd ver */
    ver?: (string|null);

    /** ScreenShareEnd scenario */
    scenario?: (string|null);

    /** ScreenShareEnd errorCode */
    errorCode?: (number|null);

    /** ScreenShareEnd uid */
    uid?: (string|null);

    /** ScreenShareEnd userName */
    userName?: (string|null);

    /** ScreenShareEnd streamUid */
    streamUid?: (number|Long|null);

    /** ScreenShareEnd streamSuid */
    streamSuid?: (string|null);

    /** ScreenShareEnd role */
    role?: (string|null);

    /** ScreenShareEnd streamSid */
    streamSid?: (string|null);

    /** ScreenShareEnd rtmSid */
    rtmSid?: (string|null);

    /** ScreenShareEnd roomId */
    roomId?: (string|null);

    /** ScreenShareEnd roomCreateTs */
    roomCreateTs?: (number|Long|null);
}

/** Represents a ScreenShareEnd. */
export class ScreenShareEnd implements IScreenShareEnd {

    /**
     * Constructs a new ScreenShareEnd.
     * @param [properties] Properties to set
     */
    constructor(properties?: IScreenShareEnd);

    /** ScreenShareEnd lts. */
    public lts: (number|Long);

    /** ScreenShareEnd vid. */
    public vid: number;

    /** ScreenShareEnd ver. */
    public ver: string;

    /** ScreenShareEnd scenario. */
    public scenario: string;

    /** ScreenShareEnd errorCode. */
    public errorCode: number;

    /** ScreenShareEnd uid. */
    public uid: string;

    /** ScreenShareEnd userName. */
    public userName: string;

    /** ScreenShareEnd streamUid. */
    public streamUid: (number|Long);

    /** ScreenShareEnd streamSuid. */
    public streamSuid: string;

    /** ScreenShareEnd role. */
    public role: string;

    /** ScreenShareEnd streamSid. */
    public streamSid: string;

    /** ScreenShareEnd rtmSid. */
    public rtmSid: string;

    /** ScreenShareEnd roomId. */
    public roomId: string;

    /** ScreenShareEnd roomCreateTs. */
    public roomCreateTs: (number|Long);

    /**
     * Creates a new ScreenShareEnd instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ScreenShareEnd instance
     */
    public static create(properties?: IScreenShareEnd): ScreenShareEnd;

    /**
     * Encodes the specified ScreenShareEnd message. Does not implicitly {@link ScreenShareEnd.verify|verify} messages.
     * @param message ScreenShareEnd message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IScreenShareEnd, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ScreenShareEnd message, length delimited. Does not implicitly {@link ScreenShareEnd.verify|verify} messages.
     * @param message ScreenShareEnd message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IScreenShareEnd, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ScreenShareEnd message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ScreenShareEnd
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ScreenShareEnd;

    /**
     * Decodes a ScreenShareEnd message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ScreenShareEnd
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ScreenShareEnd;

    /**
     * Verifies a ScreenShareEnd message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ScreenShareEnd message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ScreenShareEnd
     */
    public static fromObject(object: { [k: string]: any }): ScreenShareEnd;

    /**
     * Creates a plain object from a ScreenShareEnd message. Also converts values to other types if specified.
     * @param message ScreenShareEnd
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ScreenShareEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ScreenShareEnd to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
