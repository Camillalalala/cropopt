import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/supabase';
import { getDiseaseInfo } from '../data/diseaseLookup';

type ScanPin = {
  id: number;
  disease_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
};

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LA_DEFAULT: Region = {
  latitude: 34.0522,
  longitude: -118.2437,
  latitudeDelta: 0.3,
  longitudeDelta: 0.3,
};

function markerColor(diseaseId: string): string {
  if (diseaseId === 'healthy') return '#15803d';
  if (diseaseId.includes('rust')) return '#b45309';
  if (diseaseId.includes('blight') || diseaseId.includes('mildew')) return '#7c2d12';
  return '#1e40af';
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return 'just now';
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function MapScreen() {
  const [pins, setPins] = useState<ScanPin[]>([]);
  const [region, setRegion] = useState<Region>(LA_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    void loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    // Get device location
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        });
      }
    } catch {
      // fallback to LA default
    }

    // Fetch scan reports
    const { data, error: fetchError } = await supabase
      .from('scan_reports')
      .select('id, disease_id, latitude, longitude, timestamp')
      .order('timestamp', { ascending: false })
      .limit(200);

    if (fetchError) {
      setError('Could not load map data. Check your connection.');
    } else {
      setPins((data ?? []) as ScanPin[]);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#166534" />
        <Text style={styles.loadingText}>Loading community reports...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const diseaseCounts: Record<string, number> = {};
  for (const p of pins) {
    if (p.disease_id !== 'healthy') {
      diseaseCounts[p.disease_id] = (diseaseCounts[p.disease_id] ?? 0) + 1;
    }
  }
  const alertCount = pins.filter((p) => p.disease_id !== 'healthy').length;

  return (
    <View style={styles.container}>
      {alertCount > 0 && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            {alertCount} disease report{alertCount !== 1 ? 's' : ''} in your region
          </Text>
        </View>
      )}

      <MapView style={styles.map} region={region} showsUserLocation>
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            pinColor={markerColor(pin.disease_id)}
          >
            <Callout style={styles.callout}>
              <Text style={styles.calloutTitle}>{getDiseaseInfo(pin.disease_id).label}</Text>
              <Text style={styles.calloutTime}>{timeAgo(pin.timestamp)}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        {[
          { color: '#b45309', label: 'Rust' },
          { color: '#7c2d12', label: 'Blight/Mildew' },
          { color: '#1e40af', label: 'Other disease' },
          { color: '#15803d', label: 'Healthy' },
        ].map(({ color, label }) => (
          <View key={label} style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: color }]} />
            <Text style={styles.legendText}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  loadingText: { color: '#6b7280', fontSize: 14 },
  errorText: { color: '#ef4444', fontSize: 14, textAlign: 'center' },
  map: { flex: 1 },
  banner: {
    backgroundColor: '#7c2d12',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  bannerText: {
    color: '#fecaca',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  callout: {
    padding: 8,
    minWidth: 140,
  },
  calloutTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  calloutTime: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 12,
    justifyContent: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
});
