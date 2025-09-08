import { NextRequest, NextResponse } from 'next/server'

interface OBSProfile {
  basic: {
    name: string
    filenameFormatting: string
    delayEnable: boolean
    delaySec: number
    reconnect: boolean
    retryDelay: number
    maxRetries: number
  }
  video: {
    baseCX: number
    baseCY: number
    outputCX: number
    outputCY: number
    fpsType: number
    fpsCommon: number
    scaleType: string
  }
  audio: {
    sampleRate: number
    channelSetup: string
    bitrate: number
  }
}

export async function POST(request: NextRequest) {
  try {
    const profile: OBSProfile = await request.json()

    const basicINI = `[General]
Name=${profile.basic.name}
[Output]
Mode=Advanced
FilenameFormatting=${profile.basic.filenameFormatting}
DelayEnable=${profile.basic.delayEnable}
DelaySec=${profile.basic.delaySec}
DelayPreserve=true
Reconnect=${profile.basic.reconnect}
RetryDelay=${profile.basic.retryDelay}
MaxRetries=${profile.basic.maxRetries}
BindIP=default
IPFamily=IPv4+IPv6
NewSocketLoopEnable=false
LowLatencyEnable=false
[Stream1]
IgnoreRecommended=false
[SimpleOutput]
FilePath=C:\\Users\\LIVE PC\\Videos
RecFormat2=mkv
VBitrate=2500
ABitrate=160
UseAdvanced=false
Preset=veryfast
NVENCPreset2=p5
RecQuality=Stream
RecRB=false
RecRBTime=20
RecRBSize=512
RecRBPrefix=Replay
StreamAudioEncoder=aac
RecAudioEncoder=aac
RecTracks=1
StreamEncoder=nvenc
RecEncoder=nvenc
[AdvOut]
ApplyServiceSettings=true
UseRescale=false
TrackIndex=1
VodTrackIndex=2
Encoder=obs_x264
RecType=Standard
RecFilePath=C:\\Users\\LIVE PC\\Videos
RecFormat2=mkv
RecUseRescale=false
RecTracks=1
RecEncoder=none
FLVTrack=1
FFOutputToFile=true
FFFilePath=C:\\Users\\LIVE PC\\Videos
FFVBitrate=2500
FFVGOPSize=250
FFUseRescale=false
FFIgnoreCompat=false
FFABitrate=160
FFAudioMixes=1
Track1Bitrate=160
Track2Bitrate=160
Track3Bitrate=160
Track4Bitrate=160
Track5Bitrate=160
Track6Bitrate=160
RecSplitFileTime=15
RecSplitFileSize=2048
RecRB=false
RecRBTime=20
RecRBSize=512
AudioEncoder=ffmpeg_aac
RecAudioEncoder=ffmpeg_aac
RecSplitFileType=Time
FFFormat=
FFFormatMimeType=
FFVEncoderId=0
FFVEncoder=
FFAEncoderId=0
FFAEncoder=
[Video]
BaseCX=${profile.video.baseCX}
BaseCY=${profile.video.baseCY}
OutputCX=${profile.video.outputCX}
OutputCY=${profile.video.outputCY}
FPSType=${profile.video.fpsType}
FPSCommon=${profile.video.fpsCommon}
FPSInt=${profile.video.fpsCommon}
FPSNum=${profile.video.fpsCommon}
FPSDen=1
ScaleType=${profile.video.scaleType}
ColorFormat=NV12
ColorSpace=709
ColorRange=Partial
SdrWhiteLevel=300
HdrNominalPeakLevel=1000
[Audio]
MonitoringDeviceId=default
MonitoringDeviceName=Default
SampleRate=${profile.audio.sampleRate}
ChannelSetup=${profile.audio.channelSetup}
MeterDecayRate=23.53
PeakMeterType=0
[Panels]
CookieId=ACE4228DB5864E87`

    return new NextResponse(basicINI, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="basic.ini"'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate basic.ini' }, { status: 500 })
  }
}