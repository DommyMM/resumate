from .cerebras_service import CerebrasService

class ResumeService:
    def __init__(self):
        self.cerebras_service = CerebrasService()
    
    def build_ai_prompt(self, user_text: str) -> str:
        return f"""
You are a senior technical recruiter and professional resume writer.

TASK  
Rewrite the **Input** below into **2–3 bullet points** that meet ALL the following rules:

1. **Action-verb start** – begin every bullet with a strong verb (Designed, Implemented, Optimized…)
2. **Quantify or qualify impact** – add numbers, scale, speed, %, or "X users" if the input allows; if no data is given, infer reasonable scope
3. **Highlight tech & domain** – name key tools, frameworks, languages, clouds, databases, or research focus
4. **Format** – one clean sentence per bullet, no period at the end, each bullet on its own line
5. **Length** – ≤ 25 words per bullet. No headers, no summaries, no blank line at the end
6. **Voice & tone** – concise, professional, third-person (no "I", "my"), past-tense unless the word "currently" appears in the input (then use present)
7. **ATS‑friendly** – avoid first‑person pronouns, fluff, and generic adjectives; keep keywords

OUTPUT FORMAT:  
- Bullet 1
- Bullet 2
- Optional Bullet 3

Then provide a **Feedback** section (3–4 lines max) that explains:
- Any tips and suggestion
- What improvements were made   
- Why the new bullet points are stronger  
- How the language improves clarity, professionalism, or technical depth

INPUT  
{user_text}
"""
    
    async def optimize_resume_text(self, text: str, section_type: str):
        prompt = self.build_ai_prompt(text)
        raw_response = await self.cerebras_service.get_completion(prompt)
        
        # Extract the text content from the response
        content = raw_response.get("response", "")
        
        # Process the response to ensure proper formatting
        lines = content.strip().split('\n')
        
        bullet_points = []
        feedback = []
        
        # Flag to track when we've reached the feedback section
        in_feedback_section = False
        
        for line in lines:
            cleaned_line = line.strip()
            
            # Check if we've reached the feedback section
            if "feedback" in cleaned_line.lower() and "**" in cleaned_line:
                in_feedback_section = True
                continue
            
            if in_feedback_section:
                # Add line to feedback, removing bullet points if present
                if cleaned_line.startswith('•') or cleaned_line.startswith('-') or cleaned_line.startswith('*'):
                    cleaned_line = cleaned_line[1:].strip()
                if cleaned_line:
                    feedback.append(cleaned_line)
            else:
                # Process bullet points
                if cleaned_line.startswith('•') or cleaned_line.startswith('-') or cleaned_line.startswith('*'):
                    cleaned_line = cleaned_line[1:].strip()
                if cleaned_line and not cleaned_line.lower().startswith("optional bullet"):
                    bullet_points.append(cleaned_line)
        
        return {
            "bullet_points": bullet_points,
            "feedback": feedback,
            "section_type": section_type,
            "original_text": text,
            "metadata": raw_response.get("metadata", {})
        }