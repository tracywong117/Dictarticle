import { defineStore } from 'pinia';
import axios from 'axios';

export const useArticleStore = defineStore('articleStore', {
    state: () => ({
        article: null,
        articleAnswer: null,
        prompt: '', // prompt is loaded from ./assets/prompt.txt in App.vue during mounted
        showArticle: false,
    }),
    actions: {
        getContentInsideBraces(str) {
            const regex = /{([^}]+)}/g;
            let matches = [];
            let match;
        
            while ((match = regex.exec(str)) !== null) {
                matches.push(match[1].trim()); // Trim the result to remove any extra whitespace
            }
        
            return matches;
        },
        callGroq(question) {
            console.log('prompt', this.prompt);
            console.log('callGroq', question);
            const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
            const apiKey = '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';

            axios.post(apiUrl, {
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'system',
                        content: this.prompt
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.data;
                })
                .then(data => {
                    const result = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
                    this.articleAnswer = this.getContentInsideBraces(result)[0] || 'No result found';
                    console.log('articleAnswer', this.articleAnswer);

                })
                .catch(error => {
                    this.articleAnswer = 'No result found';
                    console.error('Error:', error.message);
                });
        }
    }
});