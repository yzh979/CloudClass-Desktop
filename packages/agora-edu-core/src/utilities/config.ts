import { reportServiceV2 } from "../services/report-v2"
class GlobalConfigs {
  _sdkDomain: string = 'https://api.agora.io/%region%'
  reportDomain: string = 'https://api.agora.io'
  logDomain: string = 'https://api-solutions.agoralab.co'
  appId: string = '';

  _region: string = '';

  public setRegion(region: string): void {
    this._region = region
  }

  public setSDKDomain(domain: string): void {
    this._sdkDomain = domain
  }

  get sdkDomain() {
    const regionDomain = getSDKDomain(this._sdkDomain, this._region)
    return regionDomain
  }


  public setReportConfig(config= {
    sdkDomain: 'https://test-rest-argus.bj2.agoralab.co',
    qos: 101
  }){
    reportServiceV2.initReportConfig(config)
  }

  get sdkArea() {
    return getRegion(this._region)
  }
}

const globalConfigs = new GlobalConfigs()

export const getRegion = (region: string) => {
  const rtcRegions: Record<string, string> = {
    "CN": "GLOBAL",
    "AP": "ASIA",
    "EU": "EUROPE",
    "NA": "NORTH_AMERICA",
  }

  const rtmRegions: Record<string, string> = {
    "CN": "GLOB",
    "AP": "AS",
    "EU": "EU",
    "NA": "NA",
  }

  return {
    rtcArea: rtcRegions[region] ?? rtcRegions["CN"],
    rtmArea: rtmRegions[region] ?? rtmRegions["CN"],
  }
}

export const getRegionDomainCode = (region: string) => {
  const regionDomain: Record<string, string> = {
    "CN": "cn",
    "AP": "ap",
    "EU": "eu",
    "NA": "na"
  }

  return regionDomain[region] ?? regionDomain["CN"]
}

export const getSDKDomain = (domain: string, region: string) => {
  const regionCode = getRegionDomainCode(region)
  const sdk = domain.replace("%region%", regionCode)
  console.log("## sdkDomain ", sdk)
  return sdk
}

export {globalConfigs}