import { GlobalStorage } from '../../utils';
import { LaunchOption } from "@/infra/api";

export class HomeStore {

  launchOption!: Omit<LaunchOption, 'listener' | 'duration'>

  launchKey: string

  constructor(context: any) {
    this.launchKey = `home_store_demo_launch_key`
    this.launchOption = GlobalStorage.read(this.launchKey) || {}
  }

  setLaunchConfig(payload: Omit<LaunchOption, 'listener' | 'duration'>) {
    this.launchOption = payload
    GlobalStorage.save(this.launchKey, this.launchOption)
  }
}