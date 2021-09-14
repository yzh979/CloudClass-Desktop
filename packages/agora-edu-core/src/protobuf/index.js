/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots.apaas || ($protobuf.roots.apaas = new $protobuf.Root()))
.addJSON({
  ApaasUserJoin: {
    fields: {
      lts: {
        type: "int64",
        id: 1
      },
      vid: {
        type: "int32",
        id: 2
      },
      ver: {
        type: "string",
        id: 3
      },
      scenario: {
        type: "string",
        id: 4
      },
      errorCode: {
        type: "int32",
        id: 5
      },
      uid: {
        type: "string",
        id: 6
      },
      userName: {
        type: "string",
        id: 7
      },
      streamUid: {
        type: "int64",
        id: 8
      },
      streamSuid: {
        type: "string",
        id: 9
      },
      role: {
        type: "string",
        id: 10
      },
      streamSid: {
        type: "string",
        id: 11
      },
      rtmSid: {
        type: "string",
        id: 12
      },
      roomId: {
        type: "string",
        id: 13
      },
      roomCreateTs: {
        type: "int64",
        id: 14
      }
    }
  },
  ApaasUserQuit: {
    fields: {
      lts: {
        type: "int64",
        id: 1
      },
      vid: {
        type: "int32",
        id: 2
      },
      ver: {
        type: "string",
        id: 3
      },
      scenario: {
        type: "string",
        id: 4
      },
      errorCode: {
        type: "int32",
        id: 5
      },
      uid: {
        type: "string",
        id: 6
      },
      userName: {
        type: "string",
        id: 7
      },
      streamUid: {
        type: "int64",
        id: 8
      },
      streamSuid: {
        type: "string",
        id: 9
      },
      role: {
        type: "string",
        id: 10
      },
      streamSid: {
        type: "string",
        id: 11
      },
      rtmSid: {
        type: "string",
        id: 12
      },
      roomId: {
        type: "string",
        id: 13
      },
      roomCreateTs: {
        type: "int64",
        id: 14
      }
    }
  },
  ApaasUserReconnect: {
    fields: {
      lts: {
        type: "int64",
        id: 1
      },
      vid: {
        type: "int32",
        id: 2
      },
      ver: {
        type: "string",
        id: 3
      },
      scenario: {
        type: "string",
        id: 4
      },
      errorCode: {
        type: "int32",
        id: 5
      },
      uid: {
        type: "string",
        id: 6
      },
      userName: {
        type: "string",
        id: 7
      },
      streamUid: {
        type: "int64",
        id: 8
      },
      streamSuid: {
        type: "string",
        id: 9
      },
      role: {
        type: "string",
        id: 10
      },
      streamSid: {
        type: "string",
        id: 11
      },
      rtmSid: {
        type: "string",
        id: 12
      },
      roomId: {
        type: "string",
        id: 13
      },
      roomCreateTs: {
        type: "int64",
        id: 14
      }
    }
  },
  ScreenShareStar: {
    fields: {
      lts: {
        type: "int64",
        id: 1
      },
      vid: {
        type: "int32",
        id: 2
      },
      ver: {
        type: "string",
        id: 3
      },
      scenario: {
        type: "string",
        id: 4
      },
      errorCode: {
        type: "int32",
        id: 5
      },
      uid: {
        type: "string",
        id: 6
      },
      userName: {
        type: "string",
        id: 7
      },
      streamUid: {
        type: "int64",
        id: 8
      },
      streamSuid: {
        type: "string",
        id: 9
      },
      role: {
        type: "string",
        id: 10
      },
      streamSid: {
        type: "string",
        id: 11
      },
      rtmSid: {
        type: "string",
        id: 12
      },
      roomId: {
        type: "string",
        id: 13
      },
      roomCreateTs: {
        type: "int64",
        id: 14
      }
    }
  },
  ScreenShareEnd: {
    fields: {
      lts: {
        type: "int64",
        id: 1
      },
      vid: {
        type: "int32",
        id: 2
      },
      ver: {
        type: "string",
        id: 3
      },
      scenario: {
        type: "string",
        id: 4
      },
      errorCode: {
        type: "int32",
        id: 5
      },
      uid: {
        type: "string",
        id: 6
      },
      userName: {
        type: "string",
        id: 7
      },
      streamUid: {
        type: "int64",
        id: 8
      },
      streamSuid: {
        type: "string",
        id: 9
      },
      role: {
        type: "string",
        id: 10
      },
      streamSid: {
        type: "string",
        id: 11
      },
      rtmSid: {
        type: "string",
        id: 12
      },
      roomId: {
        type: "string",
        id: 13
      },
      roomCreateTs: {
        type: "int64",
        id: 14
      }
    }
  }
});

module.exports = $root;
