<template>
    <!-- <div class="flex my-2 items-center">
        <el-popover placement="bottom-start" :show-arrow="false" trigger="click" width="250">
            <template #reference>
                <div class="relative flex items-center">
                    <img src="/icons/text.svg" class="absolute left-2 w-4 h-4" alt="input" />
                    <input type="text" value="Text" readonly
                        class="pl-8 custom-input h-6 w-2/7 border-none rounded-sm outline-none resize-none p-4 m-0 hover:bg-gray-100 leading-normal text-[16px] placeholder-[#b1b1b1] bg-transparent cursor-pointer" />
                </div>

            </template>
<div>
    <div v-if="showBasicOption">
        <div class="px-1">
            <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center" @click="showBasicOption = false">
                <img src="/icons/rename.svg" class="w-4 h-4 mr-2" alt="Rename" />
                Rename
            </div>
            <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center" @click="showBasicOption = false">
                <img src="/icons/setting-config.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                Edit Property
            </div>
            <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center">
                <img src="/icons/trash.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                Delete Property
            </div>
        </div>
    </div>
    <div v-else>
        <div class="px-1">
            <div class="w-full p-2 my-1 flex items-center">
                <div class="bg-slate-100 mr-2 p-1 rounded">
                    <img src="/icons/pencil.svg" class="w-4 h-4" alt="Renaming" />
                </div>
                <div class="border rounded-sm">
                    <input type="text" value="Text" class="h-6 w-full 
                                  bg-gray-100 placeholder-[#b1b1b1] 
                                    rounded-sm resize-none outline-none
                                    py-3 px-2 m-0 leading-normal text-[16px]
                                    " onblur="this.parentElement.style.borderColor='#ccc';"
                        onfocus="this.parentElement.style.borderColor='rgb(216, 180, 254)';" />
                </div>

            </div>
            <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center" @click="showBasicOption = true">
                <div class="flex justify-between items-center w-full">
                    <div>
                        Type
                    </div>
                    <div class="flex items-center">
                        <img src="/icons/text.svg" class="w-4 h-4 mr-2" alt="text" />
                        Text
                        <img src="/icons/chevron-right-arrow.svg" class="w-4 h-4 ml-2" />
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</el-popover>
<input type="text" placeholder="Empty"
    class="custom-input h-6 w-2/7 border-none rounded-sm outline-none resize-none p-4 m-0 hover:bg-gray-100 focus:bg-transparent leading-normal text-[16px] placeholder-[#b1b1b1] bg-transparent" />
</div> -->
    <div class="relative inline-block text-left" ref="dropdown">
        <!-- <div>
            <button @click="toggleDropdown" type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="options-menu" aria-expanded="true" aria-haspopup="true">
                Options
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M5.292 7.292a1 1 0 011.415 0L10 10.586l3.293-3.293a1 1 0 111.415 1.414l-4 4a1 1 0 01-1.415 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div> -->
        <div class="flex my-2 items-center">
            <div class="relative flex items-center" @click="toggleDropdown">
                <img :src="propertyTypeIcon[property.type]" class="absolute left-2 w-4 h-4" alt="input" />
                <input type="text" :value="property.name" readonly
                    class="pl-8 custom-input h-6 w-2/7 border-none rounded-sm outline-none resize-none p-4 m-0 hover:bg-gray-100 leading-normal text-[16px] placeholder-[#b1b1b1] bg-transparent cursor-pointer" />
            </div>
            <input type="text" placeholder="Empty" ref="another"
                class="custom-input h-6 w-2/7 border-none rounded-sm outline-none resize-none p-4 m-0 hover:bg-gray-100 focus:bg-transparent leading-normal text-[16px] placeholder-[#b1b1b1] bg-transparent" />
        </div>

        <transition name="fade">
            <div v-if="isDropdownOpen" class="origin-top-left absolute mt-1 rounded border bg-white 
                text-[14px] text-gray-600 w-[250px] font-sans leading-[1.4]">
                <div v-if="showBasicOption">
                    <div class="px-1">
                        <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center" @click="toggleBasicOption">
                            <img src="/icons/rename.svg" class="w-4 h-4 mr-2" alt="Rename" />
                            Rename
                        </div>
                        <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center" @click="toggleBasicOption">
                            <img src="/icons/setting-config.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                            Edit Property
                        </div>
                        <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center">
                            <img src="/icons/trash.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                            Delete Property
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="px-1">
                        <div class="w-full p-2 my-1 flex items-center">
                            <div class="bg-slate-100 mr-2 p-1 rounded">
                                <img src="/icons/pencil.svg" class="w-4 h-4" alt="Renaming" />
                            </div>
                            <div class="border rounded-sm">
                                <input type="text" value="Text" class="h-6 w-full 
                                  bg-gray-100 placeholder-[#b1b1b1] 
                                    rounded-sm resize-none outline-none
                                    py-3 px-2 m-0 leading-normal text-[16px]
                                    " 
                                    onblur="this.parentElement.style.borderColor='#ccc';"
                                    onfocus="this.parentElement.style.borderColor='rgb(216, 180, 254)';"
                                    @keyup.enter="handlePropertyRename"
                                    v-model="tempPropertyName" />
                            </div>

                        </div>
                        <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center" @click="toggleBasicOption">
                            <div class="flex justify-between items-center w-full">
                                <div>
                                    Type
                                </div>
                                <div class="flex items-center">
                                    <img :src="propertyTypeIcon[property.type]" class="w-4 h-4 mr-2" alt="text" />
                                    {{ property.type }}
                                    <img src="/icons/chevron-right-arrow.svg" class="w-4 h-4 ml-2" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
import { ElPopover } from 'element-plus';

export default {
    name: 'ArticleProperty',
    components: {
        ElPopover,
    },
    data() {
        return {
            showBasicOption: true,
            isDropdownOpen: false,
            tempPropertyName: '',
            property: {
                'type': 'Text',
                'name': 'Text',
                'value': '',
                'id': '',
            },
            propertyTypeIcon: {
                'Text': '/icons/text.svg',
                'Multi-select': '/icons/multi-select.svg',
                'Select': '/icons/select.svg',
            },
            
        };
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
            if (!this.isDropdownOpen) {
                this.showBasicOption = true;
            }
        },
        toggleBasicOption() {
            setTimeout(() => {
                this.showBasicOption = !this.showBasicOption;
            }, 20);
        },
        handleClickOutside(event) {
            if (this.isDropdownOpen && this.$refs.dropdown && (!this.$refs.dropdown.contains(event.target) || this.$refs.another.contains(event.target))) {
                this.isDropdownOpen = false;
                this.showBasicOption = true;
            }
        },
        handlePropertyRename() {
            this.property.name = this.tempPropertyName;
            this.isDropdownOpen = false;
            this.showBasicOption = true;
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}
</style>