import { NextRequest, NextResponse } from 'next/server'

interface OBSService {
  type: string
  server: string
  useAuth: boolean
  key: string
}

export async function POST(request: NextRequest) {
  try {
    const service: OBSService = await request.json()

    const serviceJSON = JSON.stringify({
      type: service.type,
      settings: {
        server: service.server,
        use_auth: service.useAuth,
        bwtest: false,
        key: service.key
      }
    }, null, 2)

    return new NextResponse(serviceJSON, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="service.json"'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate service.json' }, { status: 500 })
  }
}