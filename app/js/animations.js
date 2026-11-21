import Splitting from "splitting";
import gsap from 'gsap'

const AnimateSplittingTextIn = (target)=>{

    const targetHeight = target.getBoundingClientRect().height

    
    
    const words = []
    for (let i = 0; i < target.children[0].children.length; i++) {
        const word = target.children[0].children[i];
        if(word.classList.contains('word')){
            words.push(word)
        }
    } 

    const allchars = []
    if (words.length !== 0) {
        for (let i = 0; i < words.length; i++) {
            const chars = words[i]; 
            for (let j = 0; j < chars.children.length; j++) {
                const char = chars.children[j];
                allchars.push(char)
            }
        }
    }

 
    let tl = gsap.timeline({
        defaults: {
            duration: 1.5,
            ease: 'expo.out'
        }
    })

    for (let i = 0; i < allchars.length; i++) {
        const char = allchars[i];
        tl.fromTo(char, {y: targetHeight}, {y: 0}, i/30)
    }
}

const HideSplittingText = (target)=>{

    target.style.clipPath = 'inset(0px 0px)'

    const targetHeight = target.getBoundingClientRect().height
    
    const words = []
    for (let i = 0; i < target.children[0].children.length; i++) {
        const word = target.children[0].children[i];
        if(word.classList.contains('word')){
            words.push(word)
        }
    } 

    const allchars = []
    if (words.length !== 0) {
        for (let i = 0; i < words.length; i++) {
            const chars = words[i]; 
            for (let j = 0; j < chars.children.length; j++) {
                const char = chars.children[j];
                allchars.push(char)
            }
        }
    } 

    for (let i = 0; i < allchars.length; i++) {
        const char = allchars[i];
        gsap.set(char, {y: targetHeight})
    }
}

const AnimateSplittingTextOut = (target)=>{

    const targetHeight = target.getBoundingClientRect().height
    
    const words = []
    for (let i = 0; i < target.children[0].children.length; i++) {
        const word = target.children[0].children[i];
        if(word.classList.contains('word')){
            words.push(word)
        }
    } 

    const allchars = []
    if (words.length !== 0) {
        for (let i = 0; i < words.length; i++) {
            const chars = words[i]; 
            for (let j = 0; j < chars.children.length; j++) {
                const char = chars.children[j];
                allchars.push(char)
            }
        }
    }

 
    let tl = gsap.timeline({
        defaults: {
            duration: .45,
            ease: 'expo.in'
        }
    })

    for (let i = 0; i < allchars.length; i++) {
        const char = allchars[i];
        tl.to(char, {y: -targetHeight}, i/100)
    }
}
 
export { 
    AnimateSplittingTextIn,
    AnimateSplittingTextOut,
    HideSplittingText
}