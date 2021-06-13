import { GlobalStorage } from '../../utils';
import { LaunchOption } from "@/infra/api";

type HomeLaunchOption = Omit<LaunchOption, 'listener'> & {appId: string}

export class HomeStore {

  launchOption!: HomeLaunchOption

  launchKey: string

  constructor(context: any) {
    this.launchKey = `home_store_demo_launch_key`
    this.launchOption = GlobalStorage.read(this.launchKey) || {}
  }

  setLaunchConfig(payload: HomeLaunchOption) {
    this.launchOption = payload
    GlobalStorage.save(this.launchKey, this.launchOption)
  }
}