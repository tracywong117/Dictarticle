<template>
    <div>
        <div class="upload-container" onclick="document.getElementById('file-upload').click();" tabindex="0">
            <div class="upload-content">
                <svg class="upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M19.35 10.04c-.68 0-1.35.1-1.99.29A5.995 5.995 0 0 0 6.33 8.36c-.31.07-.61.15-.92.23A4.992 4.992 0 0 0 2 13c0 2.76 2.24 5 5 5h12c2.76 0 5-2.24 5-5s-2.24-5-5-5zM16 11v4h-4v-4H9l4-4 4 4h-3z" />
                </svg>
                <div class="text-[16px] text-purple-600">Browse file to upload</div>
                <input type="file" id="file-upload" @change="displayFileName">
                <div class="mt-[10px] text-[14px] text-neutral-500" id="file-name">No file chosen</div>
            </div>
        </div>
        <div class="flex justify-center mt-3">
            <button class="text-center border px-5 py-1 rounded-lg hover:border-purple-600">Get Result!</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FileUpload',
    methods: {
        displayFileName(event) {
            const fileName = event.target.files[0].name;
            document.getElementById('file-name').innerText = fileName;
        }
    }

}

</script>

<style>
.upload-container {
    width: 320px;
    /* Adjust width to match the style */
    padding: 20px;
    border: 2px dashed #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    text-align: center;
    box-sizing: border-box;
    /* Ensures padding is included in the total width */
    cursor: pointer;
    transition: border-color 0.3s;
    /* Smooth transition for border color */
    position: relative;
}

.upload-container:hover {
    border-color: #007BFF;
    /* Changes border color on hover */
}

.upload-icon {
    width: 48px;
    height: 48px;
    fill: #007BFF;
    margin-bottom: 10px;
}

.upload-container input[type="file"] {
    display: none;
    /* Hide the default file input */
}

/* .file-name {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
} */

.upload-container:focus-within {
    border-color: #007BFF;
    /* Changes border color on focus */
}

.upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>