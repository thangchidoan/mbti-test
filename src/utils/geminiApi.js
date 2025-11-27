export const fetchGeminiRecommendations = async (resultType, language) => {
  const apiKey = ""; // API Key injected by environment

  const prompt = `
  I just took an MBTI test and my result is ${resultType}. 
  Act as a career counselor.
  
  IMPORTANT: Please reply in ${language} language.
  
  Based on the core traits of ${resultType}, please recommend 3 specific, modern job roles that would be a good fit. 
  For each role, provide a 1-sentence explanation of why it fits my personality. 
  Also provide 1 "Growth Tip" for this personality type in a work setting.
  
  Format Requirements:
  - Use **bold** for job titles and headers.
  - Separate sections with double new lines.
  - Keep explanations concise.
  `;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();

  if (data.error) throw new Error(data.error.message);

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text;
};

export const getFallbackRecommendations = () => {
  return `**1. Product Manager**\nYour ability to strategize and organize makes you great at leading product lifecycles.\n\n**2. UX Researcher**\nYour analytical nature allows you to understand user behaviors and translate them into actionable insights.\n\n**3. System Architect**\nDesigning complex structures appeals to your logical framework.\n\n**Growth Tip:**\nTry to be more open to spontaneous changes in plans to improve team adaptability.`;
};
