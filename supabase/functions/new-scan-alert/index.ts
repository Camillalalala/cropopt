import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type ScanRecord = {
  id?: number;
  disease_id?: string;
  timestamp?: string;
  latitude?: number;
  longitude?: number;
};

type NearbyDevice = {
  push_token: string;
  distance_m: number;
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

function diseaseLabel(id: string): string {
  const MAP: Record<string, string> = {
    leaf_rust: 'Leaf Rust', stem_rust: 'Stem Rust', stripe_rust: 'Stripe Rust',
    blight: 'Blight', late_blight: 'Late Blight', early_blight: 'Early Blight',
    powdery_mildew_wheat: 'Powdery Mildew', rice_blast: 'Rice Blast',
    healthy: 'Healthy Leaf',
  };
  return MAP[id] ?? id.replace(/_/g, ' ');
}

Deno.serve(async (req: Request) => {
  try {
    const body = (await req.json()) as { record?: ScanRecord };
    const record = body.record ?? {};

    const lat = record.latitude ?? 0;
    const lng = record.longitude ?? 0;

    // Find devices within 50 km of the new scan
    const { data: devices, error } = await supabase.rpc('get_devices_near', {
      scan_lat: lat,
      scan_lng: lng,
      radius_m: 50000,
    });

    if (error) {
      console.error('get_devices_near error:', error.message);
      return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 });
    }

    const nearby = (devices ?? []) as NearbyDevice[];
    if (nearby.length === 0) {
      return new Response(JSON.stringify({ ok: true, notified: 0 }), { status: 200 });
    }

    const label = diseaseLabel(record.disease_id ?? 'unknown');

    const messages = nearby.map((d) => ({
      to: d.push_token,
      title: `${label} Detected Nearby`,
      body: `${label} was found ${Math.round(d.distance_m / 1000 * 10) / 10} km from your location. Inspect your crops.`,
      data: {
        diseaseId: record.disease_id,
        lat,
        lng,
      },
      sound: 'default',
    }));

    // Expo Push Service (works in Expo Go without APNs/FCM creds)
    const pushRes = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(messages),
    });

    const pushData = await pushRes.json();
    console.log('Push result:', JSON.stringify(pushData));

    return new Response(
      JSON.stringify({ ok: true, notified: messages.length, push: pushData }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('new-scan-alert error:', err);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
});
