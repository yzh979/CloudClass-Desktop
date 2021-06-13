import { GlobalStorage } from '../../utils';
import { LaunchOption } from "@/infra/api";
import { autorun, observable, toJS } from 'mobx';

type HomeLaunchOption = Omit<LaunchOption, 'listener'> & {appId: string}

const key = `home_store_demo_launch_key`

export const clearHomeOption = () => {
  GlobalStorage.clear(key)
}

export class HomeStore {

  @observable
  launchOption!: HomeLaunchOption

  launchKey: string = key

  constructor(context: any) {
    this.launchOption = GlobalStorage.read(this.launchKey) || {}
    autorun(() => {
      const data = toJS(this.launchOption)
      GlobalStorage.save(this.launchKey, data)
    })
  }

  setLaunchConfig(payload: HomeLaunchOption) {
    this.launchOption = payload
    GlobalStorage.save(this.launchKey, this.launchOption)
  }

  clear() {
    clearHomeOption()
    //@ts-ignore
    this.launchOption = GlobalStorage.read(this.launchKey) || {}
  }
}