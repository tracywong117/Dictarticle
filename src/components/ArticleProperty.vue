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
                <div class="ml-2 flex flex-wrap items-center"
                    :class="[valueDropdownVisible ? 'border rounded' : 'hover:bg-gray-100']"
                    @click="toggleValueDropdown" ref="another">
                    <span v-for="(tag, index) in currentTags" :key="index" :class="[tag.color]"
                        class="items-center tag-shape tag-text m-1">
                        {{ tag.text }}
                        <span v-if="valueDropdownVisible" @click="removeCurrentTag(index)"
                            class="ml-[5px] cursor-pointer tag-text">x</span>
                    </span>
                    <input type="text" :placeholder="getValueInputPlaceholder()" class="flex-grow h-6 outline-none resize-none 
                            px-2 py-4 m-0 focus:bg-transparent leading-normal text-[16px] placeholder-[#b1b1b1]"
                        :class="[valueDropdownVisible ? 'visible' : 'hover:bg-gray-100']" v-model="newTag"
                        @keydown.enter="addTag" @keydown.backspace="checkDeleteLastTag" />
                    <div v-if="valueDropdownVisible" class="p-2 w-full tag-text">
                        <div class="py-1 px-2">
                            Select an option or create one
                        </div>
                        <div v-if="newTag" class="hover:bg-slate-100 py-1 px-2 leading-normal flex">
                            Create
                            <div class="ml-1 bg-pink-100 tag-shape tag-text" :class="chooseColor()">
                                {{ newTag }}
                            </div>
                        </div>
                        <div v-else>
                            <!-- <div v-for="(tag, index) in allTags" :key="index"
                                class="flex items-center px-2 mb-1 border rounded cursor-pointer hover:bg-slate-100 relative group">
                                <span class="mr-2">::</span>
                                <span class="m-1 tag-shape tag-text" :class="tag.color">
                                    {{ tag.text }}
                                </span>
                                <img src="/icons/more-horizontal.svg" alt="Show More"
                                    class="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div> -->
                            <div v-for="(tag, index) in allTags" :key="index" :class="[
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
                                <CustomMenu position="right">
                                    <template #trigger>
                                        <img src="/icons/more-horizontal.svg" alt="Show More"
                                            
                                            class="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            @click="toggleManageTagMenu(index)" />
                                    </template>
                                    <div class="z-[1000]">
                                        <div class="px-1">
                                            <div class="dropdown-option" @click="toggleBasicOption">
                                                <img src="/icons/setting-config.svg" class="w-4 h-4 mr-2"
                                                    alt="Change Type" />
                                                Edit Tag
                                            </div>
                                            <div class="dropdown-option">
                                                <img src="/icons/trash.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                                                Delete Tag
                                            </div>
                                        </div>
                                    </div>
                                </CustomMenu>

                                <!-- <div v-if="showManageTagMenu[index]" class="origin-top-left absolute mt-1 rounded border bg-white 
                                    text-[14px] text-gray-600 w-[250px] font-sans leading-[1.4]">
                                    <div>
                                        <div class="px-1">
                                            <div class="dropdown-option" @click="toggleBasicOption">
                                                <img src="/icons/rename.svg" class="w-4 h-4 mr-2" alt="Rename" />
                                                Rename
                                            </div>
                                            <div class="dropdown-option" @click="toggleBasicOption">
                                                <img src="/icons/setting-config.svg" class="w-4 h-4 mr-2"
                                                    alt="Change Type" />
                                                Edit Property
                                            </div>
                                            <div class="dropdown-option">
                                                <img src="/icons/trash.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                                                Delete Property
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
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
                'value': '',
                'id': '',
            }, // Property object; Needed by outside component
            keyTypeIcon: {
                'Text': '/icons/text.svg',
                'Multi-select': '/icons/multi-select.svg',
                'Select': '/icons/select.svg',
            },
            valueDropdownVisible: false,
            newTag: '',
            currentTags: [], // needed by outside component
            allTags: [], // needed by outside component
            tagClasses: ['tag-green', 'tag-red', 'tag-blue', 'tag-pink', 'tag-purple', 'tag-orange', 'tag-yellow', 'tag-grey'],
            draggedIndex: null,
            hoveredIndex: null,
            transparentImage: null, // Store the transparent image
            // showManageTagMenu: false,
            showManageTagMenu: {},

        };
    }, created() {
        // Create a transparent image programmatically
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 1, 1);
        this.transparentImage = new Image();
        this.transparentImage.src = canvas.toDataURL();
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
            if (this.newTag.trim() !== '' && !this.currentTags.some(tag => tag.text === this.newTag.trim())) {
                let color;
                if (this.allTags.length === 0) {
                    color = this.tagClasses[0];
                } else {
                    const lastColor = this.allTags[this.allTags.length - 1].color;
                    const lastColorIndex = this.tagClasses.indexOf(lastColor);
                    color = this.tagClasses[(lastColorIndex + 1) % this.tagClasses.length];
                }
                const newTag = { text: this.newTag.trim(), color: color };
                this.currentTags.push(newTag);
                if (!this.allTags.some(tag => tag.text === newTag.text)) {
                    this.allTags.push(newTag);
                }
                this.newTag = '';
            }
        },
        addStoredTag(tag) {
            if (!this.currentTags.some(currentTag => currentTag.text === tag.text)) {
                this.currentTags.push({ text: tag.text, color: tag.color });
            }
        },
        removeCurrentTag(index) {
            this.currentTags.splice(index, 1);
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
        toggleManageTagMenu(index) {
            console.log("toggleManageTagMenu", index);
            // this.$set(this.showManageTagMenu, index, !this.showManageTagMenu[index])
            this.showManageTagMenu = { ...this.showManageTagMenu, [index]: !this.showManageTagMenu[index] }
        },
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