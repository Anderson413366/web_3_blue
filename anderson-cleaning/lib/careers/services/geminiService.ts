import { GoogleGenAI, GenerateContentResponse, Part } from '@google/genai'
import { GEMINI_TEXT_MODEL } from '../constants'
import { InterviewPrepTip } from '../types'

const getAiClient = (): GoogleGenAI | null => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
  if (!apiKey) {
    console.error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set.')
    // In a real app, you might throw an error or handle this more gracefully
    // For this exercise, returning null and letting callers handle it.
    return null
  }
  try {
    return new GoogleGenAI({ apiKey })
  } catch (error) {
    console.error('Failed to initialize GoogleGenAI client:', error)
    return null
  }
}

const parseJsonFromString = <T>(jsonString: string): T | null => {
  let cleanJsonString = jsonString.trim()
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
  const match = cleanJsonString.match(fenceRegex)
  if (match && match[2]) {
    cleanJsonString = match[2].trim()
  }

  try {
    return JSON.parse(cleanJsonString) as T
  } catch (error) {
    console.error('Failed to parse JSON response:', error, 'Original string:', jsonString)
    return null
  }
}

export const generateCoverLetterSuggestion = async (
  position: string,
  experiences: string[],
  language: string = 'English'
): Promise<string> => {
  const ai = getAiClient()
  if (!ai) return 'Error: AI service not available.'

  const experienceText =
    experiences.length > 0 ? `my experience in ${experiences.join(', ')}` : 'my relevant skills'

  const prompt = `Generate a concise and enthusiastic cover letter paragraph for the position of ${position} at Anderson Cleaning. Highlight ${experienceText} and my eagerness to contribute. The tone should be professional yet approachable. Keep it under 100 words. The response should be in ${language}.`

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    })
    return response.text || 'Error generating suggestion.'
  } catch (error) {
    console.error('Error generating cover letter suggestion:', error)
    return 'Error generating suggestion.'
  }
}

export const generateInterviewTips = async (
  position: string,
  knowYouAnswers: { questionKey: string; answer: string }[],
  language: string = 'English'
): Promise<InterviewPrepTip[]> => {
  const ai = getAiClient()
  if (!ai) return [{ question: 'Error', tip: 'AI service not available.' }]

  const answersText = knowYouAnswers
    .filter((qa) => qa.answer && qa.answer.trim() !== '')
    .map((qa) => `For '${qa.questionKey}', I answered: '${qa.answer}'`)
    .join('\n')

  const prompt = `
    Provide 3 concise interview tips for someone applying for the "${position}" position at Anderson Cleaning.
    Focus on how to best showcase skills relevant to this role and the company culture.
    If available, consider these self-assessment answers:
    ${answersText || 'No specific self-assessment answers provided.'}
    Return the tips as a JSON array of objects, where each object has a "question" (a potential interview question they might be asked) and a "tip" (a concise tip for answering it effectively).
    The response, including questions and tips, should be in ${language}.
    Example format: [{"question": "Why Anderson Cleaning?", "tip": "Research their values and connect them to your own motivations."}]
  `

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { responseMimeType: 'application/json' },
    })

    const parsedResult = parseJsonFromString<InterviewPrepTip[]>(response.text || '[]')
    if (parsedResult) {
      return parsedResult
    }
    return [{ question: 'Error', tip: 'Could not parse AI response for interview tips.' }]
  } catch (error) {
    console.error('Error generating interview tips:', error)
    return [{ question: 'Error', tip: 'Failed to generate interview tips.' }]
  }
}

export const identifyStrengths = async (
  position: string,
  experiences: string[],
  knowYouAnswers: { questionKey: string; answer: string }[],
  language: string = 'English'
): Promise<string[]> => {
  const ai = getAiClient()
  if (!ai) return ['Error: AI service not available.']

  const experienceText =
    experiences.length > 0
      ? `Relevant experiences: ${experiences.join(', ')}.`
      : 'No specific professional experiences listed.'
  const answersText = knowYouAnswers
    .filter((qa) => qa.answer && qa.answer.trim() !== '')
    .map((qa) => `Regarding '${qa.questionKey}', the applicant said: '${qa.answer}'`)
    .join('\n')

  const prompt = `
    Based on the following information for a job applicant:
    Position applying for: "${position}".
    ${experienceText}
    Answers to 'Getting to Know You' questions:
    ${answersText || "No specific 'Getting to Know You' answers provided."}

    Identify and list up to 5 key strengths that would make this person a strong candidate for Anderson Cleaning.
    Return as a JSON array of strings. The response should be in ${language}.
    Example format: ["Problem-solver", "Team Player", "Detail-oriented"]
  `

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { responseMimeType: 'application/json' },
    })

    const parsedResult = parseJsonFromString<string[]>(response.text || '[]')
    if (parsedResult) {
      return parsedResult
    }
    return ['Error: Could not parse AI response for strengths.']
  } catch (error) {
    console.error('Error identifying strengths:', error)
    return ['Error: Failed to identify strengths.']
  }
}
