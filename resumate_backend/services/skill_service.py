from .cerebras_service import CerebrasService

class SkillService:
    def __init__(self):
        self.cerebras_service = CerebrasService()
    
    def build_dynamic_skill_prompt(self, resume_text: str) -> str:
        return f"""
You are an ATS-style resume parser and technical resume expert.

TASK  
Extract only the technical skills that are clearly and explicitly mentioned in the resume below. Do NOT guess or assume any skills that are not stated or implied. If something is mentioned only once in passing, include it only if it clearly reflects a skill or tool used by the candidate.

GUIDELINES  
• Do NOT include skills unless they are explicitly written or clearly referenced in projects, experience, or education.  
• Do NOT hallucinate or infer skills that are not in the resume.  
• Use the resume's content as the only source of truth.
• Choose category names that make sense for the skills you extract.  

FORMAT  
Output the identified skills categorized like this (leave a dash "—" if the section is empty):

Languages: <comma-separated list or —>  
Frameworks/Tools: <comma-separated list or —>    
Concepts / Topics: <comma-separated list or —>  
Others: <comma-separated list or —>   

RESUME  
{resume_text}
"""
    
    async def extract_skills(self, resume_text: str):
        prompt = self.build_dynamic_skill_prompt(resume_text)
        raw_response = await self.cerebras_service.get_completion(prompt)
        
        # Extract the text content from the response
        content = raw_response.get("response", "")
        
        # Initialize categories
        skill_categories = {
            "Languages": [],
            "Frameworks/Tools": [],
            "Concepts / Topics": [],
            "Others": []
        }
        
        current_category = None
        
        for line in content.strip().split('\n'):
            line = line.strip()
            if not line:
                continue
            
            # Check if this line is a category header
            if ':' in line:
                category_name = line.split(':', 1)[0].strip()
                skills_text = line.split(':', 1)[1].strip()
                
                if category_name in skill_categories:
                    # Skip if it's just a dash indicating empty
                    if skills_text not in ["—", "-"]:
                        # Split by commas and clean up each skill
                        skills = [skill.strip() for skill in skills_text.split(',')]
                        skill_categories[category_name] = skills
        
        # Remove empty categories
        skill_categories = {k: v for k, v in skill_categories.items() if v}
        print(skill_categories)
        return {
            "categories": skill_categories,
            "metadata": raw_response.get("metadata", {})
        }