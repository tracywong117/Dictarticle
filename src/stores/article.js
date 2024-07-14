import { defineStore } from 'pinia';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
            const apiUrl = 'https://dictarticle-nextjs.vercel.app/api/chat';

            axios.post(apiUrl, {
                prompt: this.prompt,
                question: question
            }, {
                headers: {
                    'Content-Type': 'application/json',
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
                    this.articleAnswer = {
                        text: this.getContentInsideBraces(result)[0] || 'No result found',
                        createdAt: new Date().toISOString(),
                        uuid: uuidv4(),
                    }
                    console.log('articleAnswer', this.articleAnswer.text);

                })
                .catch(error => {
                    this.articleAnswer = 'No result found';
                    console.error('Error:', error.message);
                });
        }
    }
});