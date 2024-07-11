<template>
    <div>
        <div class="upload-container" onclick="document.getElementById('file-upload').click();" tabindex="0">
            <div class="upload-content">
                <img src="../assets/icons/cloud-upload.svg" alt="Cloud Upload Icon" class="upload-icon w-12 h-12">
                <div class="text-[16px]">Browse file to upload</div>
                <input type="file" id="file-upload" @change="displayFileName">
                <div class="mt-[10px] text-[14px] text-neutral-500" id="file-name">No file chosen</div>
            </div>
        </div>
        <div class="flex justify-center mt-3">
            <button class="flex items-center text-center border px-5 py-1 rounded-lg hover:border-purple-600"
                @click="setShowArticle">
                <img src="../assets/icons/magic-star.svg" alt="Magic Star Icon" class="w-5 h-5 mr-2">
                Get Result!
            </button>
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
    /* border-color: #007BFF; */
    @apply border-purple-300;
    /* Changes border color on hover */
}

.upload-icon {
    width: 48px;
    height: 48px;
    /* fill: #007BFF; */
    @apply fill-purple-400;
    margin-bottom: 10px;
}

.upload-container input[type="file"] {
    display: none;
    /* Hide the default file input */
}

.upload-container:focus-within {
    @apply border-purple-300;
    /* Changes border color on focus */
}

.upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>