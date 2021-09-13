import { UIContext } from '@/infra/hooks';
import { UIStore } from '@/infra/stores/app/ui';
import { AgoraEduCoreSDK, LaunchOption } from 'agora-edu-core';
import { EduRoomTypeEnum } from 'agora-edu-core';
import 'promise-polyfill/src/polyfill';
import { ReactChild, useState } from 'react';
import { LiveRoom } from '../monolithic/live-room';
import { BizPagePath } from '../types';
import { AgoraChatWidget, AgoraHXChatWidget } from 'agora-widget-gallery';

export const UIContextProvider = ({ children }: { children: ReactChild }) => {
  const [store] = useState<UIStore>(() => new UIStore());

  return <UIContext.Provider value={store}>{children}</UIContext.Provider>;
};

export interface AliOSSBucket {
  key: string;
  secret: string;
  name: string;
  folder: string;
  cdn: string;
}

export interface WhiteboardOSSConfig {
  bucket: AliOSSBucket;
}

export interface ApplicationConfigParameters {
  gtmId: string;
  agora: {
    appId: string;
    whiteboardAppId: string;
  };
  appToken: string;
  enableLog: boolean;
  ossConfig?: WhiteboardOSSConfig;
}

const ChatWidgetFactory = (region: string) => {
  if (region.toUpperCase() === 'CN') {
    return new AgoraHXChatWidget();
  }
  return new AgoraChatWidget();
};

export type LanguageEnum = 'en' | 'zh';
export type TranslateEnum =
  | ''
  | 'auto'
  | 'zh-CHS'
  | 'en'
  | 'ja'
  | 'ko'
  | 'fr'
  | 'es'
  | 'pt'
  | 'it'
  | 'ru'
  | 'vi'
  | 'de'
  | 'ar';

const devicePath = '/pretest';
export class AgoraEduSDK extends AgoraEduCoreSDK {
  static async launch(dom: HTMLElement, option: LaunchOption): Promise<any> {
    if (option.widgets) {
      if (!option.widgets.chat) {
        option.widgets.chat = ChatWidgetFactory(option.region as string);
      }
    } else {
      option.widgets = {
        chat: ChatWidgetFactory(option.region as string),
      };
    }
    return await super.launch(
      dom,
      option,
      <UIContextProvider>
        <LiveRoom />
      </UIContextProvider>,
    );
  }
}

export * from './declare';
