import { useRef, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
import { matchSymptoms } from '../data/symptomKeywords';
import { base64ToUint8Array, extractPcmFromWav, uint8ArrayToBase64 } from '../utils/wavUtils';

type Props = {
  visible: boolean;
  isOnline: boolean;
  onClose: () => void;
  onOfflineDiagnosis: (diseaseId: string, confidence: number) => void;
  onOpenAgentWithSymptoms: (symptomText: string, audioBase64?: string) => void;
};

const RECORDING_OPTIONS: Audio.RecordingOptions = {
  android: {
    extension: '.wav',
    outputFormat: 6,
    audioEncoder: 0,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 256000,
  },
  ios: {
    extension: '.wav',
    audioQuality: 0,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 256000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {},
};

export function SymptomInputModal({
  visible,
  isOnline,
  onClose,
  onOfflineDiagnosis,
  onOpenAgentWithSymptoms,
}: Props) {
  const [symptomText, setSymptomText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [offlineResult, setOfflineResult] = useState<{ label: string; confidence: number } | null>(
    null,
  );
  const [error, setError] = useState('');
  const recordingRef = useRef<Audio.Recording | null>(null);

  const reset = () => {
    setSymptomText('');
    setOfflineResult(null);
    setError('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const startRecording = async () => {
    if (!isOnline) {
      // Offline: just focus the text field — user uses keyboard mic
      setError('Tap the mic key on your keyboard to dictate, then submit.');
      return;
    }
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') { setError('Microphone permission required.'); return; }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(RECORDING_OPTIONS);
      await rec.startAsync();
      recordingRef.current = rec;
      setIsRecording(true);
    } catch (e) {
      setError('Could not start recording.');
    }
  };

  const stopRecording = async () => {
    if (!recordingRef.current) return;
    setIsRecording(false);
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;
      if (!uri) return;

      const wavBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const wavBytes = base64ToUint8Array(wavBase64);
      const pcmBytes = extractPcmFromWav(wavBytes);
      const pcmBase64 = uint8ArrayToBase64(pcmBytes);

      // Online: open agent with audio + text context
      onOpenAgentWithSymptoms(symptomText || 'Farmer described symptoms by voice', pcmBase64);
      reset();
      onClose();
    } catch (e) {
      setError('Failed to process recording.');
      recordingRef.current = null;
    }
  };

  const handleSubmit = () => {
    if (!symptomText.trim()) {
      setError('Please describe what you see on the plant.');
      return;
    }
    if (isOnline) {
      onOpenAgentWithSymptoms(symptomText.trim());
      reset();
      onClose();
    } else {
      const match = matchSymptoms(symptomText);
      if (!match.matched) {
        setOfflineResult(null);
        setError('No match found. Try describing more specific symptoms (e.g. "orange pustules on wheat").');
        return;
      }
      setOfflineResult({ label: match.label, confidence: match.confidence });
      setError('');
    }
  };

  const handleUseOfflineResult = () => {
    if (!offlineResult) return;
    const match = matchSymptoms(symptomText);
    onOfflineDiagnosis(match.diseaseId, match.confidence);
    reset();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>
                {isOnline ? 'Online — AI Agronomist' : 'Offline — Local Match'}
              </Text>
              <Text style={styles.title}>Describe Symptoms</Text>
            </View>
            <Pressable style={styles.closeBtn} onPress={handleClose}>
              <Text style={styles.closeBtnText}>Cancel</Text>
            </Pressable>
          </View>

          <View style={styles.body}>
            <Text style={styles.hint}>
              {isOnline
                ? 'Type what you see, or hold the mic to speak. The agronomist will identify the disease.'
                : 'Describe the visible symptoms. Tap the mic on your keyboard to dictate.'}
            </Text>

            <TextInput
              style={styles.textInput}
              value={symptomText}
              onChangeText={(t) => { setSymptomText(t); setOfflineResult(null); setError(''); }}
              placeholder="e.g. orange circular pustules on upper wheat leaves with yellow halo"
              placeholderTextColor="#9ca3af"
              multiline
              autoFocus
              returnKeyType="default"
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {offlineResult ? (
              <View style={styles.matchCard}>
                <Text style={styles.matchLabel}>Best Match</Text>
                <Text style={styles.matchDisease}>{offlineResult.label}</Text>
                <Text style={styles.matchConfidence}>
                  {Math.round(offlineResult.confidence * 100)}% match based on symptoms
                </Text>
                <Pressable style={styles.useResultBtn} onPress={handleUseOfflineResult}>
                  <Text style={styles.useResultBtnText}>Use This Diagnosis</Text>
                </Pressable>
              </View>
            ) : null}

            <View style={styles.actions}>
              {isOnline ? (
                <Pressable
                  style={({ pressed }) => [
                    styles.micButton,
                    isRecording && styles.micButtonRecording,
                    pressed && { opacity: 0.8 },
                  ]}
                  onPressIn={startRecording}
                  onPressOut={stopRecording}
                >
                  <Text style={styles.micButtonText}>
                    {isRecording ? 'Release to Send' : 'Hold to Speak'}
                  </Text>
                </Pressable>
              ) : null}

              <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitBtnText}>
                  {isOnline ? 'Ask Agronomist' : 'Find Disease'}
                </Text>
              </Pressable>
            </View>

            {Platform.OS === 'ios' && !isOnline ? (
              <Text style={styles.keyboardHint}>
                Tap the microphone on your iOS keyboard to dictate symptoms offline.
              </Text>
            ) : null}
          </View>
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
    gap: 14,
  },
  hint: {
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
  },
  textInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    textAlignVertical: 'top',
    backgroundColor: '#f9fafb',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
  },
  matchCard: {
    backgroundColor: '#163020',
    borderRadius: 14,
    padding: 16,
    gap: 6,
  },
  matchLabel: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  matchDisease: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  matchConfidence: {
    color: '#d1d5db',
    fontSize: 13,
  },
  useResultBtn: {
    marginTop: 6,
    backgroundColor: '#facc15',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  useResultBtnText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  micButton: {
    flex: 1,
    backgroundColor: '#166534',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  micButtonRecording: {
    backgroundColor: '#3b82f6',
  },
  micButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  keyboardHint: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
  },
});
