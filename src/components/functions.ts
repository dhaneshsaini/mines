export function playSound(frequency: number) {
    const audioCtx = new window.AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.5
    ); // Decay over 0.5 seconds
    oscillator.stop(audioCtx.currentTime + 0.5);
}