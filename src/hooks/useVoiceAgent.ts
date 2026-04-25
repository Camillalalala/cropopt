import { useCallback, useRef, useState } from 'react';
import { ElevenLabsConvAI, type AgentStatus } from '../services/ElevenLabsConvAI';

export function useVoiceAgent() {
  const [status, setStatus] = useState<AgentStatus>('idle');
  const [agentText, setAgentText] = useState('');
  const [userText, setUserText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<ElevenLabsConvAI | null>(null);

  const connect = useCallback(
    async (params: {
      diseaseLabel: string;
      confidence: string;
      diseaseId: string;
      symptomDescription?: string;
      pastScanSummary?: string;
      initialAudioPcmBase64?: string;
    }) => {
      setAgentText('');
      setUserText('');
      setError(null);
      const agent = new ElevenLabsConvAI({
        onStatusChange: setStatus,
        onAgentText: setAgentText,
        onUserText: setUserText,
        onError: setError,
      });
      ref.current = agent;
      await agent.connect(params);
    },
    [],
  );

  const startRecording = useCallback(() => {
    void ref.current?.startRecording();
  }, []);

  const stopAndSend = useCallback(() => {
    void ref.current?.stopAndSend();
  }, []);

  const disconnect = useCallback(async () => {
    await ref.current?.disconnect();
    ref.current = null;
    setStatus('idle');
    setAgentText('');
    setUserText('');
    setError(null);
  }, []);

  return { status, agentText, userText, error, connect, startRecording, stopAndSend, disconnect };
}
