import { defineStore } from 'pinia';

export const useArticleStore = defineStore('articleStore', {
    state: () => ({
        article: null,
        articleAnswer: null,
        prompt: '', // prompt is loaded from ./assets/prompt.txt in App.vue during mounted
        showArticle: false,
    }),
    actions: {
        callGroq(question) {
            console.log('callGroq', question);
            const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
            const apiKey = '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';
            
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'llama3-70b-8192',
                    messages: [
                        {
                            "role": "system",
                            "content": this.prompt 
                        },
                        {
                            "role": "user",
                            "content": question
                        }
                    ]
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const result = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
                // this.article = result || 'No result found';
                this.articleAnswer = result || 'No result found';
                console.log('articleAnswer', this.articleAnswer);
                // this.error = null;
            })
            .catch(error => {
                this.articleAnswer = 'No result found';
            });
        }
    }
});