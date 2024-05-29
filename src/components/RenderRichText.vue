<template>
    <div v-if="document" class="mt-4 mb-4" v-for="node in document.content">

        <!-- Headings -->
        <!-- Does it have one child ? -->
        <div v-if="node.nodeType == 'heading-1' || node.nodeType == 'heading-2' || node.nodeType == 'heading-3'">
            <h1 v-if="node.content.length == 1 && node.nodeType == 'heading-1'">
                <div v-if="node.content[0].value !== ''">
                    h1 {{ node.content[0].value }} {{ node.nodeType }}
                </div>
            </h1>
            
            <h2 v-if="node.content.length == 1 && node.nodeType == 'heading-2'">
                <div v-if="node.content[0].value !== ''">
                    h2 {{ node.content[0].value }} {{ node.nodeType }}
                </div>
            </h2>
            
            <h3 v-if="node.content.length == 1 && node.nodeType == 'heading-3'">
                <div v-if="node.content[0].value !== ''">
                    h2 {{ node.content[0].value }} {{ node.nodeType }}
                </div>
            </h3>
            <!-- TODO's Does it have multiple children ? -->
        </div>

        <!-- Paragraphs -->
        <!-- Does it have one child ? -->
        <section v-if="node.nodeType == 'paragraph' && node.content.length == 1 ">
            'length == 1'
            <p v-if="node.content[0].value !== ''">
                {{ node.content[0].value }}
            </p>
        </section>


        <!-- Does it have multiple children ? -->
        <div v-if="node.nodeType == 'paragraph' && node.content.length > 1 ">
                        
            <!-- node type : text -->
            'multiple children'
            <span v-for="child in node.content">
                <span v-if="child.nodeType == 'text'">
                    {{ child.value }} 
                </span> 
            </span>
            
            <!-- node type : hyperlink -->
            <span style="color: blue;" v-for="child in node.content">
                <a :href="child.data.uri" v-if="child.nodeType == 'hyperlink'">
                    {{ child.content[0].value }} 
                </a>
            </span>
            
             
        </div>

        <!-- Embed Entry -->
        <!-- <div v-if="node.nodeType == 'embedded-entry-block'">
            {{ node.data.target.fields }}
        </div> -->

        <!-- Embed Asset Block -->
        <div v-if="node.nodeType == 'embedded-asset-block'">
            {{ node.data.target.fields }}
        </div>
         
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
const SetMark = (mark)=>{
    if (mark == 'bold') {
        return 'bold'
    } else if(mark == 'italic'){
        return 'italic'
    } else if(mark == 'underline'){
        return 'underline'
    }
}
const props = defineProps({
    document: Object
})
onMounted(()=>{
    // console.log(props.document.content)
    for (let index = 0; index < props.document.content.length; index++) {
        const element = props.document.content[index];
        console.log(element) 
    }
})
</script>