"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Download, Settings, Video, Radio, HardDrive } from "lucide-react"

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
  service: {
    type: string
    server: string
    useAuth: boolean
    key: string
  }
  encoder: {
    bitrate: number
    useBufsize: boolean
    bufferSize: number
    keyintSec: number
    profile: string
    tune: string
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

export default function Home() {
  const [profile, setProfile] = useState<OBSProfile>({
    basic: {
      name: "Broadcast Profile",
      filenameFormatting: "%CCYY-%MM-%DD %hh-%mm-%ss",
      delayEnable: false,
      delaySec: 20,
      reconnect: true,
      retryDelay: 2,
      maxRetries: 25
    },
    service: {
      type: "rtmp_custom",
      server: "srt://49.40.0.64:9839",
      useAuth: false,
      key: ""
    },
    encoder: {
      bitrate: 8000,
      useBufsize: true,
      bufferSize: 2000,
      keyintSec: 2,
      profile: "main",
      tune: "zerolatency"
    },
    video: {
      baseCX: 1920,
      baseCY: 1080,
      outputCX: 1280,
      outputCY: 720,
      fpsType: 0,
      fpsCommon: 30,
      scaleType: "bicubic"
    },
    audio: {
      sampleRate: 48000,
      channelSetup: "Stereo",
      bitrate: 160
    }
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const generateBasicINI = () => {
    return `[General]
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
  }

  const generateServiceJSON = () => {
    return JSON.stringify({
      type: profile.service.type,
      settings: {
        server: profile.service.server,
        use_auth: profile.service.useAuth,
        bwtest: false,
        key: profile.service.key
      }
    }, null, 2)
  }

  const generateStreamEncoderJSON = () => {
    return JSON.stringify({
      bitrate: profile.encoder.bitrate,
      use_bufsize: profile.encoder.useBufsize,
      buffer_size: profile.encoder.bufferSize,
      keyint_sec: profile.encoder.keyintSec,
      profile: profile.encoder.profile,
      tune: profile.encoder.tune
    }, null, 2)
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAllFiles = async () => {
    setIsGenerating(true)
    try {
      // Generate all files
      const basicINI = generateBasicINI()
      const serviceJSON = generateServiceJSON()
      const streamEncoderJSON = generateStreamEncoderJSON()

      // Download each file
      downloadFile(basicINI, 'basic.ini')
      downloadFile(serviceJSON, 'service.json')
      downloadFile(streamEncoderJSON, 'streamEncoder.json')
    } catch (error) {
      console.error('Error generating files:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-700 rounded-lg">
                <Radio className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">OBS Studio Profile Generator</h1>
                <p className="text-gray-400">Professional broadcast configuration for streamers</p>
              </div>
            </div>
            <Badge variant="outline" className="border-orange-500 text-orange-400">
              BROADCAST READY
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-500" />
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Profile Configuration</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure your OBS Studio broadcast settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                    <TabsTrigger value="basic" className="data-[state=active]:bg-orange-600">Basic</TabsTrigger>
                    <TabsTrigger value="service" className="data-[state=active]:bg-orange-600">Service</TabsTrigger>
                    <TabsTrigger value="encoder" className="data-[state=active]:bg-orange-600">Encoder</TabsTrigger>
                    <TabsTrigger value="av" className="data-[state=active]:bg-orange-600">A/V</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-orange-300">Profile Name</Label>
                        <Input
                          id="name"
                          value={profile.basic.name}
                          onChange={(e) => setProfile({...profile, basic: {...profile.basic, name: e.target.value}})}
                          className="bg-gray-700 border-gray-600 focus:border-orange-500"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="filename" className="text-orange-300">Filename Format</Label>
                        <Input
                          id="filename"
                          value={profile.basic.filenameFormatting}
                          onChange={(e) => setProfile({...profile, basic: {...profile.basic, filenameFormatting: e.target.value}})}
                          className="bg-gray-700 border-gray-600 focus:border-orange-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-orange-300">Enable Delay</Label>
                          <p className="text-sm text-gray-400">Add stream delay</p>
                        </div>
                        <Switch
                          checked={profile.basic.delayEnable}
                          onCheckedChange={(checked) => setProfile({...profile, basic: {...profile.basic, delayEnable: checked}})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-orange-300">Auto Reconnect</Label>
                          <p className="text-sm text-gray-400">Reconnect if connection drops</p>
                        </div>
                        <Switch
                          checked={profile.basic.reconnect}
                          onCheckedChange={(checked) => setProfile({...profile, basic: {...profile.basic, reconnect: checked}})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="retries" className="text-orange-300">Max Retries: {profile.basic.maxRetries}</Label>
                        <Slider
                          value={[profile.basic.maxRetries]}
                          onValueChange={(value) => setProfile({...profile, basic: {...profile.basic, maxRetries: value[0]}})}
                          max={50}
                          min={1}
                          step={1}
                          className="mt-2 [&_[data-active]]:bg-orange-500"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="service" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="server" className="text-orange-300">Stream Server URL</Label>
                        <Input
                          id="server"
                          value={profile.service.server}
                          onChange={(e) => setProfile({...profile, service: {...profile.service, server: e.target.value}})}
                          className="bg-gray-700 border-gray-600 focus:border-orange-500"
                          placeholder="srt://server:port"
                        />
                      </div>

                      <div>
                        <Label htmlFor="key" className="text-orange-300">Stream Key</Label>
                        <Input
                          id="key"
                          type="password"
                          value={profile.service.key}
                          onChange={(e) => setProfile({...profile, service: {...profile.service, key: e.target.value}})}
                          className="bg-gray-700 border-gray-600 focus:border-orange-500"
                          placeholder="Your stream key"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-orange-300">Use Authentication</Label>
                          <p className="text-sm text-gray-400">Enable if server requires auth</p>
                        </div>
                        <Switch
                          checked={profile.service.useAuth}
                          onCheckedChange={(checked) => setProfile({...profile, service: {...profile.service, useAuth: checked}})}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="encoder" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bitrate" className="text-orange-300">Bitrate (kbps): {profile.encoder.bitrate}</Label>
                        <Slider
                          value={[profile.encoder.bitrate]}
                          onValueChange={(value) => setProfile({...profile, encoder: {...profile.encoder, bitrate: value[0]}})}
                          max={20000}
                          min={1000}
                          step={100}
                          className="mt-2 [&_[data-active]]:bg-orange-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bufferSize" className="text-orange-300">Buffer Size (kbps): {profile.encoder.bufferSize}</Label>
                        <Slider
                          value={[profile.encoder.bufferSize]}
                          onValueChange={(value) => setProfile({...profile, encoder: {...profile.encoder, bufferSize: value[0]}})}
                          max={5000}
                          min={500}
                          step={100}
                          className="mt-2 [&_[data-active]]:bg-orange-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="profile" className="text-orange-300">Profile</Label>
                        <Select value={profile.encoder.profile} onValueChange={(value) => setProfile({...profile, encoder: {...profile.encoder, profile: value}})}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 focus:border-orange-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="baseline">Baseline</SelectItem>
                            <SelectItem value="main">Main</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="tune" className="text-orange-300">Tuning</Label>
                        <Select value={profile.encoder.tune} onValueChange={(value) => setProfile({...profile, encoder: {...profile.encoder, tune: value}})}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 focus:border-orange-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zerolatency">Zero Latency</SelectItem>
                            <SelectItem value="fastdecode">Fast Decode</SelectItem>
                            <SelectItem value="film">Film</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="av" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="resolution" className="text-orange-300">Base Resolution</Label>
                        <Select value={`${profile.video.baseCX}x${profile.video.baseCY}`} onValueChange={(value) => {
                          const [width, height] = value.split('x').map(Number)
                          setProfile({...profile, video: {...profile.video, baseCX: width, baseCY: height}})
                        }}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 focus:border-orange-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                            <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                            <SelectItem value="3840x2160">3840x2160 (4K)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="outputRes" className="text-orange-300">Output Resolution</Label>
                        <Select value={`${profile.video.outputCX}x${profile.video.outputCY}`} onValueChange={(value) => {
                          const [width, height] = value.split('x').map(Number)
                          setProfile({...profile, video: {...profile.video, outputCX: width, outputCY: height}})
                        }}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 focus:border-orange-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                            <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                            <SelectItem value="854x480">854x480 (SD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fps" className="text-orange-300">FPS: {profile.video.fpsCommon}</Label>
                        <Slider
                          value={[profile.video.fpsCommon]}
                          onValueChange={(value) => setProfile({...profile, video: {...profile.video, fpsCommon: value[0]}})}
                          max={60}
                          min={24}
                          step={1}
                          className="mt-2 [&_[data-active]]:bg-orange-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="audioSample" className="text-orange-300">Audio Sample Rate</Label>
                        <Select value={profile.audio.sampleRate.toString()} onValueChange={(value) => setProfile({...profile, audio: {...profile.audio, sampleRate: parseInt(value)}})}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 focus:border-orange-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="44100">44.1 kHz</SelectItem>
                            <SelectItem value="48000">48 kHz</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Download Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-orange-500" />
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Generated Files</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Preview and download your OBS configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-sm">basic.ini</span>
                    <Badge variant="outline" className="border-orange-500 text-orange-400">Configuration</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-sm">service.json</span>
                    <Badge variant="outline" className="border-orange-500 text-orange-400">Stream Settings</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-sm">streamEncoder.json</span>
                    <Badge variant="outline" className="border-orange-500 text-orange-400">Encoder Settings</Badge>
                  </div>
                </div>

                <Separator />

                <Button 
                  onClick={downloadAllFiles} 
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                >
                  {isGenerating ? (
                    "Generating..."
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download All Files
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-orange-500" />
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Stream Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resolution:</span>
                    <span className="text-orange-300">{profile.video.outputCX}x{profile.video.outputCY}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">FPS:</span>
                    <span className="text-orange-300">{profile.video.fpsCommon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bitrate:</span>
                    <span className="text-orange-300">{profile.encoder.bitrate} kbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Audio:</span>
                    <span className="text-orange-300">{profile.audio.sampleRate/1000} kHz</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}