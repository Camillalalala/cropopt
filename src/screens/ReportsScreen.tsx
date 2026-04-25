import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getDiseaseInfo } from '../data/diseaseLookup';
import { getReports } from '../db/database';
import type { LocalReport } from '../types/report';

export function ReportsScreen() {
  const [reports, setReports] = useState<LocalReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadReports = useCallback(async () => {
    try {
      setIsLoading(true);
      const localReports = await getReports();
      setReports(localReports);
    } catch (error) {
      console.error('Failed to load local reports:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, [loadReports])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Local Reports</Text>
      <Text style={styles.subheader}>Saved diagnoses stay available even without connectivity.</Text>
      {isLoading ? (
        <Text style={styles.stateText}>Loading...</Text>
      ) : reports.length === 0 ? (
        <Text style={styles.stateText}>No reports yet. Analyze a field sample first.</Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            const disease = getDiseaseInfo(item.disease_id);
            return (
              <View style={styles.reportCard}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.reportTitle}>{disease.label}</Text>
                    <Text style={styles.reportSource}>
                      {item.sample_label || 'Manual entry'} | Confidence {(item.confidence * 100).toFixed(0)}%
                    </Text>
                  </View>
                  <Text style={[styles.syncChip, item.is_synced === 1 ? styles.syncYes : styles.syncNo]}>
                    {item.is_synced === 1 ? 'Synced' : 'Pending'}
                  </Text>
                </View>
                <Text style={styles.reportDate}>
                  Captured {new Date(item.timestamp).toLocaleString()}
                </Text>
                <Text style={styles.reportMeta}>
                  Coordinates {item.lat.toFixed(4)}, {item.long.toFixed(4)}
                </Text>
                <Text style={styles.reportNotes}>
                  {item.user_text.trim() ? item.user_text : 'No extra field note recorded.'}
                </Text>
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eef4ef',
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  subheader: {
    marginTop: 4,
    marginBottom: 14,
    fontSize: 14,
    color: '#4b5563',
  },
  stateText: {
    color: '#4b5563',
    fontSize: 16,
    marginTop: 8,
  },
  listContent: {
    paddingBottom: 12,
    gap: 12,
  },
  reportCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  reportSource: {
    marginTop: 2,
    fontSize: 13,
    color: '#6b7280',
  },
  syncChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
  },
  syncYes: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  syncNo: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  reportDate: {
    fontSize: 13,
    color: '#374151',
  },
  reportMeta: {
    fontSize: 13,
    color: '#6b7280',
  },
  reportNotes: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: '#1f2937',
  },
});
