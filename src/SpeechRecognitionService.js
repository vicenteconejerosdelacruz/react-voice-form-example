class SpeechRecognitionService {

  constructor() {
	this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-CL';
    this.recognition.maxAlternatives = 1;
  }

  onResult = (callback: (result: string, isFinal: boolean) => void) => {
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (!event.results) {
        return;
      }
      const lastResult = event.results[event.results.length - 1];
      if (!lastResult.isFinal) {
        callback('...', false);
        return;
      }
      callback(lastResult[0].transcript, true);
    };
  }

  onEnd = (callback: () => void) => {
    this.recognition.onend = () => callback();
  }

  start = () => {
    this.recognition.start();
  }

  stop = () => {
    this.recognition.stop();
  }
}



export default SpeechRecognitionService