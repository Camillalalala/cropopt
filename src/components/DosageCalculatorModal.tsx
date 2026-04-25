import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { calculateDosage } from '../data/dosageData';
import { getDiseaseInfo } from '../data/diseaseLookup';

type Props = {
  visible: boolean;
  diseaseId: string;
  onClose: () => void;
};

type Unit = 'ha' | 'ac';

const UNIT_LABELS: Record<Unit, string> = { ha: 'Hectares', ac: 'Acres' };
const HA_PER_ACRE = 0.4047;

export function DosageCalculatorModal({ visible, diseaseId, onClose }: Props) {
  const [areaText, setAreaText] = useState('');
  const [unit, setUnit] = useState<Unit>('ha');

  const diseaseLabel = getDiseaseInfo(diseaseId).label;
  const fieldArea = parseFloat(areaText) || 0;
  const fieldAreaHa = unit === 'ha' ? fieldArea : fieldArea * HA_PER_ACRE;
  const result = fieldArea > 0 ? calculateDosage(diseaseId, fieldAreaHa) : null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>Dosage Calculator</Text>
              <Text style={styles.title}>{diseaseLabel}</Text>
            </View>
            <Pressable style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Done</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
            {/* Unit toggle */}
            <View style={styles.unitRow}>
              {(['ha', 'ac'] as Unit[]).map((u) => (
                <Pressable
                  key={u}
                  style={[styles.unitBtn, unit === u && styles.unitBtnActive]}
                  onPress={() => setUnit(u)}
                >
                  <Text style={[styles.unitBtnText, unit === u && styles.unitBtnTextActive]}>
                    {UNIT_LABELS[u]}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Area input */}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.areaInput}
                value={areaText}
                onChangeText={setAreaText}
                placeholder={`Field size in ${UNIT_LABELS[unit].toLowerCase()}`}
                placeholderTextColor="#6b7280"
                keyboardType="decimal-pad"
                returnKeyType="done"
              />
              <Text style={styles.unitLabel}>{unit}</Text>
            </View>

            {/* Results */}
            {result ? (
              result.isNoTreatment ? (
                <View style={styles.healthyCard}>
                  <Text style={styles.healthyText}>No treatment required</Text>
                  <Text style={styles.healthySubtext}>
                    Continue regular monitoring. Inspect again in 7 days.
                  </Text>
                </View>
              ) : (
                <View style={styles.resultSection}>
                  <View style={styles.resultCard}>
                    <Text style={styles.productName}>{result.productName}</Text>

                    <View style={styles.amountRow}>
                      <View style={styles.amountBox}>
                        <Text style={styles.amountValue}>
                          {result.productAmount < 1
                            ? `${(result.productAmount * 1000).toFixed(0)} m${result.productUnit}`
                            : `${result.productAmount} ${result.productUnit}`}
                        </Text>
                        <Text style={styles.amountLabel}>Product</Text>
                      </View>
                      <View style={styles.amountDivider} />
                      <View style={styles.amountBox}>
                        <Text style={styles.amountValue}>{result.waterAmount} L</Text>
                        <Text style={styles.amountLabel}>Water</Text>
                      </View>
                    </View>

                    <View style={styles.metaRow}>
                      <View style={styles.metaBadge}>
                        <Text style={styles.metaText}>Every {result.intervalDays} days</Text>
                      </View>
                      {result.daysBeforeHarvest > 0 && (
                        <View style={[styles.metaBadge, styles.metaBadgeWarn]}>
                          <Text style={[styles.metaText, styles.metaTextWarn]}>
                            Stop {result.daysBeforeHarvest}d before harvest
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={styles.organicCard}>
                    <Text style={styles.organicLabel}>Organic Alternative</Text>
                    <Text style={styles.organicText}>{result.organicAlternative}</Text>
                  </View>

                  <Text style={styles.disclaimer}>
                    Always read the label before mixing. Wear PPE during application.
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                  Enter your field size above to see exact product amounts.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 20,
    paddingBottom: 36,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  eyebrow: {
    color: '#166534',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
  closeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
  },
  closeBtnText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '700',
  },
  body: {
    padding: 20,
    gap: 16,
  },
  unitRow: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  unitBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  unitBtnActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  unitBtnText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  unitBtnTextActive: {
    color: '#111827',
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  areaInput: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#f9fafb',
  },
  unitLabel: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '700',
    minWidth: 28,
  },
  resultSection: {
    gap: 12,
  },
  resultCard: {
    backgroundColor: '#163020',
    borderRadius: 16,
    padding: 18,
    gap: 14,
  },
  productName: {
    color: '#d1fae5',
    fontSize: 16,
    fontWeight: '700',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountBox: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  amountDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#1f5c35',
  },
  amountValue: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
  },
  amountLabel: {
    color: '#6ee7b7',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaBadge: {
    backgroundColor: '#1f5c35',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  metaBadgeWarn: {
    backgroundColor: '#7c2d12',
  },
  metaText: {
    color: '#d1fae5',
    fontSize: 12,
    fontWeight: '600',
  },
  metaTextWarn: {
    color: '#fecaca',
  },
  organicCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    gap: 4,
  },
  organicLabel: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  organicText: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 20,
  },
  healthyCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  healthyText: {
    color: '#166534',
    fontSize: 18,
    fontWeight: '800',
  },
  healthySubtext: {
    color: '#4b5563',
    fontSize: 14,
    textAlign: 'center',
  },
  placeholder: {
    padding: 24,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  disclaimer: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
  },
});
