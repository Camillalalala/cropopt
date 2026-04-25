import { useEffect } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type AgentStatus } from '../services/ElevenLabsConvAI';
import { useVoiceAgent } from '../hooks/useVoiceAgent';

type Props = {
  visible: boolean;
  diseaseLabel: string;
  diseaseId: string;
  confidence: number;
  /** If set, agent opens in symptom-description mode instead of scan-result mode */
  symptomDescription?: string;
  /** Pre-recorded PCM audio (base64) to send as the opening message */
  initialAudioPcmBase64?: string;
  /** Summary of past scans for smart memory context */
  pastScanSummary?: string;
  onClose: () => void;
};

const STATUS_LABEL: Record<AgentStatus, string> = {
  idle: 'Idle',
  connecting: 'Connecting...',
  ready: 'Tap & hold to speak',
  listening: 'Listening...',
  speaking: 'Speaking...',
  error: 'Error',
};

const STATUS_COLOR: Record<AgentStatus, string> = {
  idle: '#6b7280',
  connecting: '#f59e0b',
  ready: '#10b981',
  listening: '#3b82f6',
  speaking: '#8b5cf6',
  error: '#ef4444',
};

export function VoiceAgentModal({
  visible,
  diseaseLabel,
  diseaseId,
  confidence,
  symptomDescription,
  initialAudioPcmBase64,
  pastScanSummary,
  onClose,
}: Props) {
  const { status, agentText, userText, error, connect, startRecording, stopAndSend, disconnect } =
    useVoiceAgent();

  useEffect(() => {
    if (!visible) return;
    const pct = `${Math.round(confidence * 100)}%`;
    void connect({
      diseaseLabel,
      confidence: pct,
      diseaseId,
      symptomDescription,
      pastScanSummary,
      initialAudioPcmBase64,
    });
    return () => {
      void disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleClose = async () => {
    await disconnect();
    onClose();
  };

  const canSpeak = status === 'ready';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.statusDot, { backgroundColor: STATUS_COLOR[status] }]} />
            <View style={styles.headerText}>
              <Text style={styles.title}>Agronomist</Text>
              <Text style={[styles.statusLabel, { color: STATUS_COLOR[status] }]}>
                {STATUS_LABEL[status]}
              </Text>
            </View>
          </View>

          {/* Context pill */}
          <View style={styles.contextPill}>
            <Text style={styles.contextText}>
              {symptomDescription
                ? `Symptoms: "${symptomDescription.slice(0, 60)}${symptomDescription.length > 60 ? '…' : ''}"`
                : `${diseaseLabel} — ${Math.round(confidence * 100)}% confidence`}
            </Text>
          </View>

          {/* Error */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Transcript */}
          <ScrollView style={styles.transcript} contentContainerStyle={styles.transcriptContent}>
            {agentText ? (
              <View style={styles.agentBubble}>
                <Text style={styles.bubbleLabel}>Agronomist</Text>
                <Text style={styles.agentText}>{agentText}</Text>
              </View>
            ) : null}
            {userText ? (
              <View style={styles.userBubble}>
                <Text style={[styles.bubbleLabel, styles.userLabel]}>You</Text>
                <Text style={styles.userBubbleText}>{userText}</Text>
              </View>
            ) : null}
            {!agentText && !error && status === 'connecting' ? (
              <Text style={styles.hintText}>Connecting to your agronomist...</Text>
            ) : null}
            {!agentText && !error && status === 'ready' ? (
              <Text style={styles.hintText}>Hold the button below to ask a question.</Text>
            ) : null}
          </ScrollView>

          {/* Controls */}
          <View style={styles.controls}>
            <Pressable
              style={({ pressed }) => [
                styles.speakButton,
                status === 'listening' && styles.speakButtonActive,
                !canSpeak && status !== 'listening' && styles.speakButtonDisabled,
                pressed && canSpeak && styles.speakButtonActive,
              ]}
              onPressIn={startRecording}
              onPressOut={stopAndSend}
              disabled={!canSpeak && status !== 'listening'}
            >
              <Text style={styles.speakButtonText}>
                {status === 'listening' ? 'Release to Send' : 'Hold to Speak'}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.endButton, pressed && styles.endButtonPressed]}
              onPress={handleClose}
            >
              <Text style={styles.endButtonText}>End Call</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 36,
    minHeight: '55%',
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: '#facc15',
    fontSize: 18,
    fontWeight: '800',
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 1,
  },
  contextPill: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  contextText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600',
  },
  errorText: {
    color: '#f87171',
    fontSize: 13,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 10,
  },
  transcript: {
    flex: 1,
    minHeight: 80,
  },
  transcriptContent: {
    gap: 10,
  },
  agentBubble: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 12,
  },
  userBubble: {
    backgroundColor: '#0b6cff22',
    borderWidth: 1,
    borderColor: '#0b6cff55',
    borderRadius: 12,
    padding: 12,
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  bubbleLabel: {
    color: '#6b7280',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  userLabel: {
    color: '#60a5fa',
    textAlign: 'right',
  },
  agentText: {
    color: '#f3f4f6',
    fontSize: 15,
    lineHeight: 22,
  },
  userBubbleText: {
    color: '#bfdbfe',
    fontSize: 15,
    lineHeight: 22,
  },
  hintText: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  controls: {
    gap: 10,
  },
  speakButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  speakButtonActive: {
    backgroundColor: '#3b82f6',
  },
  speakButtonDisabled: {
    backgroundColor: '#374151',
    opacity: 0.6,
  },
  speakButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  endButton: {
    backgroundColor: '#1f2937',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  endButtonPressed: {
    opacity: 0.7,
  },
  endButtonText: {
    color: '#f87171',
    fontSize: 15,
    fontWeight: '700',
  },
});
