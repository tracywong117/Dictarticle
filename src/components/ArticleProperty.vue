<template>
    <div ref="dropdown">
        <div class="flex my-2 w-full items-baseline font-sans">
            <CustomMenu @menu-closed="resetShowOption">
                <template #trigger>
                    <div class="relative flex items-center">
                        <img :src="keyTypeIcon[property.type]" class="absolute left-2 w-4 h-4" alt="input" />
                        <input type="text" :value="property.name" readonly
                            class="pl-8 h-6 w-40 border-none rounded-sm outline-none resize-none 
                p-4 m-0 hover:bg-gray-100 leading-normal text-[16px] text-gray-600 placeholder-[#b1b1b1] bg-transparent cursor-pointer" />
                    </div>
                </template>
                <div v-if="keyMenuShowBasic">
                    <div class="px-1">
                        <div class="dropdown-option" @click="toggleBasicOption">
                            <img src="/icons/rename.svg" class="w-4 h-4 mr-2" alt="Rename" />
                            Rename
                        </div>
                        <div class="dropdown-option" @click="toggleBasicOption">
                            <img src="/icons/setting-config.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                            Edit Property
                        </div>
                        <div class="dropdown-option">
                            <img src="/icons/trash.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                            Delete Property
                        </div>
                    </div>
                </div>
                <div v-else-if="keyMenuShowEdit">
                    <div class="px-1">
                        <div class="w-full p-2 my-1 flex items-center">
                            <div class="bg-slate-100 mr-2 p-1 rounded">
                                <img src="/icons/pencil.svg" class="w-4 h-4" alt="Renaming" />
                            </div>
                            <div class="border rounded-sm">
                                <input type="text" class="h-6 w-full 
                                  bg-gray-100 placeholder-[#b1b1b1] 
                                    rounded-sm resize-none outline-none
                                    py-3 px-2 m-0 leading-normal text-[16px]
                                    " onblur="this.parentElement.style.borderColor='#ccc';"
                                    onfocus="this.parentElement.style.borderColor='rgb(216, 180, 254)';"
                                    @keyup.enter="handlePropertyRename" v-model="tempKeyName" />
                            </div>

                        </div>
                        <div class="dropdown-option" @click="toggleEditOption">
                            <div class="flex justify-between items-center w-full">
                                <div>
                                    Type
                                </div>
                                <div class="flex items-center">
                                    <img :src="keyTypeIcon[property.type]" class="w-4 h-4 mr-2" alt="text" />
                                    {{ property.type }}
                                    <img src="/icons/chevron-right-arrow.svg" class="w-4 h-4 ml-2" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="px-1 mt-1 mb-2">
                        <div class="w-full p-2 flex items-center" @click="toggleBasicOption">
                            Type
                        </div>
                        <div v-for="(icon, type) in keyTypeIcon" :key="type"
                            class="hover:bg-slate-100 w-full px-2 py-1 leading-[1.3] flex items-center"
                            @click="handleTypeChange(type)">
                            <img :src="icon" class="w-4 h-4 mr-2" :alt="type" />
                            {{ type }}
                            <img v-if="property.type === type" src="/icons/tick.svg" class="w-3 h-3 ml-auto"
                                alt="Selected" />
                        </div>
                    </div>
                </div>
            </CustomMenu>
            <div class="w-1/2">
                <div v-if="property.type == 'Text'" class="ml-2 flex flex-wrap items-center">
                    <!-- <input type="text" v-model="textValue" placeholder="Empty" class="outline-none resize-none 
                            px-2 py-1 m-0 focus:bg-slate-100 leading-normal text-[16px] placeholder-[#b1b1b1]"
                        :class="[valueDropdownVisible ? 'visible' : 'hover:bg-gray-100']" /> -->
                    <textarea rows="1" type="text" v-model="textValue" placeholder="Empty" class=" outline-none resize-none 
                            px-2 py-1 m-0 focus:bg-slate-100 leading-normal text-[16px] placeholder-[#b1b1b1]"
                        :class="[valueDropdownVisible ? 'visible' : 'hover:bg-gray-100']"
                        @input="autoAdjustRows($event.target)" />

                </div>
                <div v-else class="ml-2 flex flex-wrap items-center"
                    :class="[valueDropdownVisible ? 'border rounded' : 'hover:bg-gray-100']"
                    @click="toggleValueDropdown" ref="another">
                    <span v-for="(tag, index) in currentTags" :key="tag.id" :class="[tag.color]"
                        class="items-center tag-shape tag-text m-1">
                        {{ tag.text }}
                        <span v-if="valueDropdownVisible" @click="removeCurrentTag(index)"
                            class="ml-[5px] cursor-pointer tag-text">x</span>
                    </span>
                    <input type="text" :placeholder="getValueInputPlaceholder()" class="outline-none resize-none 
                            px-2 py-1 m-0 leading-normal text-[16px] placeholder-[#b1b1b1]"
                        :class="[valueDropdownVisible ? 'visible' : 'hover:bg-gray-100']" v-model="newTag"
                        @keydown.enter="addTag" @keydown.backspace="checkDeleteLastTag" />
                    <div v-if="valueDropdownVisible" class="p-2 w-full tag-text">
                        <div class="py-1 px-2">
                            Select an option or create one
                        </div>
                        <!-- Show "Create [newTag]" if newTag doesn't match any existing tag -->
                        <div v-if="newTag && !tagExists(newTag)"
                            class="hover:bg-slate-100 py-1 px-2 leading-normal flex">
                            Create
                            <div class="ml-1 bg-pink-100 tag-shape tag-text" :class="chooseColor()">
                                {{ newTag }}
                            </div>
                        </div>
                        <div>
                            <div v-for="(tag, index) in filteredTags" :key="index" :class="[
                                'flex items-center px-2 mb-1 border rounded cursor-pointer relative group',
                                draggedIndex === index ? 'bg-slate-100' : '',
                                draggedIndex === null && hoveredIndex === index ? 'hover:bg-slate-100' : ''
                            ]" draggable="true" @dragstart="onDragStart(index, $event)" @dragend="onDragEnd"
                                @dragover.prevent="onDragOver(index)" @mouseover="onMouseOver(index)"
                                @mouseleave="onMouseLeave(index)" @click="addStoredTag(tag)">
                                <span class="mr-2">::</span>
                                <span class="m-1 tag-shape tag-text" :class="tag.color">
                                    {{ tag.text }}
                                </span>

                                <div class="ml-auto">
                                    <CustomMenu position="right" @click.stop>
                                        <template #trigger>
                                            <img src="/icons/more-horizontal.svg" alt="Show More"
                                                class="w-5 h-5 opacity-0 group-hover:opacity-100 bg-slate-200 rounded transition-opacity duration-200" />
                                        </template>
                                        <div class="z-[1000]">
                                            <div class="px-2">
                                                <div class="mt-3 mb-2 border rounded-sm ">
                                                    <input type="text" class="h-6 w-full 
                                                    bg-gray-100 placeholder-[#b1b1b1] 
                                                        rounded-sm resize-none outline-none
                                                        py-3 px-2 m-0 leading-normal text-[16px]
                                    " onblur="this.parentElement.style.borderColor='#ccc';"
                                                        onfocus="this.parentElement.style.borderColor='rgb(216, 180, 254)';"
                                                        :value="tag.text" @input="editingText = $event.target.value"
                                                        @focus="startEditingTag(index)" @blur="saveEditedTag"
                                                        @keyup.enter="saveEditedTag" />
                                                </div>
                                                <div class="dropdown-option" @click.stop="deleteTag(tag)">
                                                    <img src="/icons/trash.svg" class="w-4 h-4 mr-2"
                                                        alt="Change Type" />
                                                    Delete
                                                </div>
                                            </div>
                                            <div class="border-t border-gray-200 my-2 pt-2 px-3 text-zinc-400">Colors
                                            </div>
                                            <div class="flex flex-wrap px-2 mb-2">
                                                <div v-for="color in tagClasses" :key="color"
                                                    class="flex items-center p-1 w-full hover:bg-slate-100"
                                                    @click.stop="changeTagColor(tag, color)">
                                                    <div class="m-1 w-4 h-4 border rounded"
                                                        :class="color + ' ' + color + '-border'">
                                                    </div>
                                                    <div class="ml-2">
                                                        {{ parseTagName(color) }}
                                                    </div>
                                                    <div v-if="tag.color === color" class="ml-auto">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            class="h-4 w-4 text-black" viewBox="0 0 20 20"
                                                            fill="currentColor">
                                                            <path fill-rule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CustomMenu>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import CustomMenu from './CustomMenu.vue';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install the uuid package

export default {
    name: 'ArticleProperty',
    components: {
        CustomMenu,
    },
    data() {
        return {
            keyDropdownVisible: false,
            keyMenuShowBasic: true,
            keyMenuShowEdit: true,
            tempKeyName: 'Text',
            property: {
                'type': 'Text',
                'name': 'Text',
                'id': '',
            }, // needed by outside component
            keyTypeIcon: {
                'Text': '/icons/text.svg',
                'Multi-select': '/icons/multi-select.svg',
                'Select': '/icons/select.svg',
            },
            valueDropdownVisible: false,
            textValue: '', // needed by outside component
            newTag: '',
            currentTagIds: [], // needed by outside component // Will store only tag IDs
            allTags: [], // needed by outside component // Will now store {id, text, color}
            tagClasses: ['tag-green', 'tag-red', 'tag-blue', 'tag-pink', 'tag-purple', 'tag-orange', 'tag-yellow', 'tag-grey'],
            draggedIndex: null,
            hoveredIndex: null,
            transparentImage: null, // Store the transparent image
            editingTag: null,
            editingText: '',
        };
    },
    created() {
        // Create a transparent image programmatically
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 1, 1);
        this.transparentImage = new Image();
        this.transparentImage.src = canvas.toDataURL();
    },
    computed: {
        isMultiline() {
            const textLength = this.textValue.length;
            const threshold = 30; // adjust this value to your liking
            return textLength > threshold;
        },
        filteredTags() {
            if (!this.newTag) {
                return this.allTags;
            }
            return this.allTags.filter(tag =>
                tag.text.toLowerCase().includes(this.newTag.toLowerCase())
            );
        },
        currentTags() {
            if (this.property.type === 'Multi-select') {
                return this.currentTagIds.map(id => this.allTags.find(tag => tag.id === id)).filter(Boolean);
            } else if (this.property.type === 'Select') {
                return this.currentTagIds.map(id => this.allTags.find(tag => tag.id === id)).filter(Boolean).slice(0, 1); // Only show the first tag
            }
        },
    },
    methods: {
        toggleBasicOption() {
            setTimeout(() => {
                this.keyMenuShowBasic = !this.keyMenuShowBasic;
            }, 20);
        },
        toggleEditOption() {
            setTimeout(() => {
                this.keyMenuShowEdit = !this.keyMenuShowEdit;
            }, 20);
        },
        toggleValueDropdown() {
            // When opening value dropdown, close key dropdown if it is open
            if (this.keyDropdownVisible) {
                this.keyDropdownVisible = false;
                this.resetShowOption();
            }
            this.valueDropdownVisible = true;
        },
        resetShowOption() {
            this.keyMenuShowBasic = true;
            this.keyMenuShowEdit = true;
        },
        handlePropertyRename() {
            this.property.name = this.tempKeyName;
            this.keyDropdownVisible = false;
            this.keyMenuShowBasic = true;
        },
        // DONE Implement property type change 
        handleTypeChange(type) {
            this.property.type = type;
            this.toggleEditOption();
        },
        handleClickOutside(event) {
            // Handle click outside of value dropdowns
            if (this.valueDropdownVisible && this.$refs.another && !this.$refs.another.contains(event.target)) {
                this.valueDropdownVisible = false;
            }
        },
        chooseColor() {
            let color;
            if (this.allTags.length === 0) {
                color = this.tagClasses[0];
            } else {
                const lastColor = this.allTags[this.allTags.length - 1].color;
                const lastColorIndex = this.tagClasses.indexOf(lastColor);
                color = this.tagClasses[(lastColorIndex + 1) % this.tagClasses.length];
            }
            return color;
        },
        addTag() {
            if (this.newTag.trim() !== '') {
                const trimmedTag = this.newTag.trim();
                const existingTag = this.allTags.find(tag => tag.text === trimmedTag);

                if (existingTag) {
                    if (!this.currentTagIds.includes(existingTag.id)) {
                        this.currentTagIds.push(existingTag.id);
                    }
                } else {
                    let color;
                    if (this.allTags.length === 0) {
                        color = this.tagClasses[0];
                    } else {
                        const lastColor = this.allTags[this.allTags.length - 1].color;
                        const lastColorIndex = this.tagClasses.indexOf(lastColor);
                        color = this.tagClasses[(lastColorIndex + 1) % this.tagClasses.length];
                    }
                    const newTag = { id: uuidv4(), text: trimmedTag, color: color };
                    this.allTags.push(newTag);
                    this.currentTagIds.push(newTag.id);
                }

                this.newTag = '';
            }
        },
        addStoredTag(tag) {
            if (this.property.type === 'Multi-select') {
                if (!this.currentTagIds.includes(tag.id)) {
                    this.currentTagIds.push(tag.id); // Add the tag to the end
                }
            } else if (this.property.type === 'Select') {
                if (this.currentTagIds.includes(tag.id)) {
                    this.currentTagIds = this.currentTagIds.filter(id => id !== tag.id); // Add the tag to the first position while keeping the rest of the tags
                    this.currentTagIds.unshift(tag.id);
                } else {
                    this.currentTagIds.unshift(tag.id); // Simply add the tag to the first position
                }
            }
        },
        removeCurrentTag(index) {
            this.currentTagIds.splice(index, 1);
        },
        checkDeleteLastTag(event) {
            if (event.key === 'Backspace' && this.newTag === '') {
                this.removeCurrentTag(this.currentTags.length - 1);
            }
        },
        getValueInputPlaceholder() {
            if (!this.valueDropdownVisible && this.currentTags.length === 0) {
                return 'Empty';
            } else if (this.valueDropdownVisible && this.currentTags.length === 0) {
                return 'Search for an option...';
            }
            return '';
        },
        onDragStart(index, event) {
            this.draggedIndex = index;
            event.dataTransfer.effectAllowed = 'move'; // Set the drag operation to "move"

            if (this.transparentImage) {
                event.dataTransfer.setDragImage(this.transparentImage, 0, 0); // Use the preloaded transparent image as the drag image
            }

            this.hoveredIndex = index; // Set the hover state to the dragged tag
        },
        onDragOver(targetIndex) {
            if (this.draggedIndex !== null && this.draggedIndex !== targetIndex) {
                const draggedTag = this.allTags[this.draggedIndex];
                this.allTags.splice(this.draggedIndex, 1);
                this.allTags.splice(targetIndex, 0, draggedTag);
                this.draggedIndex = targetIndex; // Update the dragged index
            }
        },
        onDragEnd() {
            this.draggedIndex = null; // Reset the dragged index
            this.hoveredIndex = null; // Reset the hover state
        },
        onMouseOver(index) {
            if (this.draggedIndex === null) {
                this.hoveredIndex = index; // Set hover state when not dragging
            }
        },
        onMouseLeave(index) {
            if (this.hoveredIndex === index && this.draggedIndex === null) {
                this.hoveredIndex = null; // Unset hover state when not dragging
            }
        },
        parseTagName(tag) {
            // "tag-red" return "Red"
            return tag.split('-')[1].charAt(0).toUpperCase() + tag.split('-')[1].slice(1);
        },
        // TODO: Fix the bug that after one key.enter, further editing text following by key.enter can not be saved
        startEditingTag(index) {
            this.editingTagIndex = index;
            this.editingText = this.allTags[index].text;
        },
        saveEditedTag() {
            if (this.editingText.trim() !== '' && this.editingTagIndex !== null) {
                const newText = this.editingText.trim();
                this.allTags[this.editingTagIndex].text = newText;
                // No need to update currentTags separately

                this.editingTagIndex = null;
                this.editingText = '';
            }
        },
        deleteTag(tag) {
            const allTagsIndex = this.allTags.findIndex(t => t.id === tag.id);
            if (allTagsIndex !== -1) {
                this.allTags.splice(allTagsIndex, 1);
            }

            const currentTagsIndex = this.currentTagIds.indexOf(tag.id);
            if (currentTagsIndex !== -1) {
                this.currentTagIds.splice(currentTagsIndex, 1);
            }
        },
        changeTagColor(tag, newColor) {
            const allTagsIndex = this.allTags.findIndex(t => t.id === tag.id);
            if (allTagsIndex !== -1) {
                this.allTags[allTagsIndex].color = newColor;
            }
            // No need to update currentTags separately
        },
        tagExists(tagText) {
            return this.allTags.some(tag => tag.text.toLowerCase() === tagText.toLowerCase());
        },
        tagsSimilar(tagText) {
            return this.allTags.filter(tag => tag.text.toLowerCase().includes(tagText.toLowerCase()));
        },
        autoAdjustRows(textarea) {
            const text = textarea.value;
            const rows = text.split('\n').length;
            textarea.rows = rows;
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
}
</script>

<style>
.el-popover.el-popper {
    box-shadow: none;
    padding: 0;
}

.tag-green {
    @apply bg-green-100;
    /* background-color: #e0f7fa; */
    /* color: #00796b; */
}

.tag-red {
    @apply bg-red-100
    /* background-color: #ffebee; */
    /* color: #d32f2f; */
}

.tag-blue {
    @apply bg-blue-100;
    /* background-color: #e3f2fd; */
    /* color: #1976d2; */
}

.tag-pink {
    @apply bg-pink-100;
}

.tag-purple {
    @apply bg-purple-100;
}

.tag-orange {
    @apply bg-orange-100;
    /* background-color: #efebe9; */
    /* color: #5d4037; */
}

.tag-yellow {
    @apply bg-yellow-100;
}

.tag-grey {
    background-color: #f5f5f5;
    /* color: #616161; */
}

.tag-green-border {
    @apply border-green-200;
}

.tag-red-border {
    @apply border-red-200;
}

.tag-blue-border {
    @apply border-blue-200;
}

.tag-pink-border {
    @apply border-pink-200;
}

.tag-purple-border {
    @apply border-purple-200;
}

.tag-orange-border {
    @apply border-orange-200;
}

.tag-yellow-border {
    @apply border-yellow-200;
}

.tag-grey-border {
    @apply border-gray-200;
}

.tag-text {
    @apply text-[14px] leading-[1.4] text-gray-600;
}

.tag-shape {
    @apply rounded-sm px-2 h-[19.6px];
}

.dropdown-option {
    @apply hover:bg-slate-100 w-full p-2 my-1 flex items-center;
}
</style>