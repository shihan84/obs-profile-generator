import { NextRequest, NextResponse } from 'next/server'

interface OBSEncoder {
  bitrate: number
  useBufsize: boolean
  bufferSize: number
  keyintSec: number
  profile: string
  tune: string
}

export async function POST(request: NextRequest) {
  try {
    const encoder: OBSEncoder = await request.json()

    const streamEncoderJSON = JSON.stringify({
      bitrate: encoder.bitrate,
      use_bufsize: encoder.useBufsize,
      buffer_size: encoder.bufferSize,
      keyint_sec: encoder.keyintSec,
      profile: encoder.profile,
      tune: encoder.tune
    }, null, 2)

    return new NextResponse(streamEncoderJSON, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="streamEncoder.json"'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate streamEncoder.json' }, { status: 500 })
  }
}