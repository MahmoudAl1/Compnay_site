
// Client-side service to communicate with the full-stack Chat API


export const initializeChat = (): void => {
  // Chat is now initialized on the server
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      if (data.error) {
        return data.error;
      }
      return "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً.";
    }
    
    return data.text || "عذراً، لم أستطع فهم طلبك.";
  } catch (error) {
    console.error("Gemini API Request Error:", error);
    return "حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.";
  }
};
