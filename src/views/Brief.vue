<template>

<div class="w-full pb-40 pt-20 mx-auto container">

    <div class="font-['DM_Sans']"> 

        <div class="flex gap-8">
            <div class="w-1/2">
                <div class="">
                    <span>Quel type de projet ?</span>
                    <select name="" id="">
                        <option value="">Branding & Web</option>
                        <option value="">Gaming & VR, AR</option>
                    </select>
                </div>
        
                <div> 
                    <span>Quel est votre budget ?</span>
                    <select name="" id="">
                        <option value="">500K</option>
                        <option value="">800K</option>
                        <option value="">1 500 000 +</option>
                    </select> 
                </div>
        
                <div>
                    <span>A qui ai je l'honneur ?</span>
                    <input type="text" placeholder="Prénom(s) & Nom" id="">
                </div>
        
                <div>
                    <span>Avez vous un email ?</span>
                    <input type="email" placeholder="Email" id="">
                </div>
            </div>
    
            <div class="w-1/2">
                <div>
                    <span>Dans quelle entreprise travaillez-vous ? </span>
                    <input type="text" placeholder="Votre entreprise" id="">
                </div>
                
                <div> 
                    <span>Quel votre rôle dans l'entreprise ?</span>
                    <select name="" id="">
                        <option value="">Chef d'agence</option> 
                        <option value="">Chef Marketing</option> 
                        <option value="">Digital Manager</option> 
                        <option value="">Graphiste</option> 
                        <option value="">Web Designer</option> 
                        <option value="">Développeur</option> 
                    </select> 
                </div>
        
                <div> 
                    <span>Quel est l'effectif de votre entreprise ?</span>
                    <select name="" id="">
                        <option value="">1 à 10</option> 
                        <option value="">10 à 30</option> 
                        <option value="">30+</option> 
                    </select> 
                </div>
            </div>
        </div>

        
 
        <div>
            <textarea placeholder="Décrivez nous votre projet ?" id="" cols="30" rows="10"></textarea>
        </div>

    </div> 

</div>
</template>

<style scoped>
select, input, textarea {
    width: 100%;
    margin: 1em 0 1em 0;
    padding: 1rem;
} 
</style>