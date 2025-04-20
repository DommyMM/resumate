import os
from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras
from fastapi import HTTPException

# Load environment variables
load_dotenv()

class CerebrasService:
    def __init__(self):
        api_key = os.getenv("CEREBRAS_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="CEREBRAS_API_KEY not found in environment variables")
        
        self.client = Cerebras(
            api_key=api_key,
        )

    async def get_completion(self, prompt: str):
        try:
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a helpful AI assistant."},
                    {"role": "user", "content": prompt}
                ],
                model="llama-4-scout-17b-16e-instruct",
                max_tokens=1000,
                temperature=0.7
            )
            
            # Extract the response content
            if chat_completion.choices and len(chat_completion.choices) > 0:
                return {
                    "response": chat_completion.choices[0].message.content,
                    "metadata": {
                        "model": chat_completion.model,
                        "usage": chat_completion.usage,
                        "created": chat_completion.created
                    }
                }
            else:
                raise HTTPException(status_code=500, detail="No response generated")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))