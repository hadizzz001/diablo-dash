// For App Router (Next.js 14)
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token, title, body, data } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing Expo Push Token" }, { status: 400 });
    }

    const message = {
      to: token,
      sound: 'default',
      title: title || 'New Notification',
      body: body || '',
      data: data || {},
    };

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    const result = await response.json();

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
