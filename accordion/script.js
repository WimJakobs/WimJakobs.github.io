

        
        //---------------------- Bepaalde classen inlezen ---------------------------------------------
        const vraag = document.getElementsByClassName("vraag");
        const antwoord = document.getElementsByClassName("antwoord");

        const kubus = document.getElementById("illustration-box-desktop");



        //---------- Voor elke  class="vraag"  een eventListener toekennen
        for (let teller=0; teller<vraag.length;teller++) {
            vraag[teller].addEventListener('click', antwoordManipulatie);
            vraag[teller].addEventListener('mouseover', kubusVerplaatser);
            vraag[teller].addEventListener('mouseout', kubusVerplaatserMouseOut);
        }


       
        //------------------  functie voor het uit elkaar klappen of inklappen van het antwoord
        function antwoordManipulatie(vraagArg) {
            //-- alles in variabele zetten behalve querySelector('img') want deze hoeft slechts één keer te worden ingelezen.
            let deTargetParent = vraagArg.target.parentElement;

            
            //-- is nodig indien op de   arrow   wordt geklikt  want de parent van   arrow    is     class="vraag"    moet zijn  class="vraag-en-antwoord", dus moet parent van parent hebben
            if (deTargetParent.className === 'vraag') {
                deTargetParent = deTargetParent.parentElement;
            }
          
         
            const deTargetParentVraag = deTargetParent.querySelector('div:nth-child(1)');
            const deTargetParentAntwoord = deTargetParent.querySelector('div:nth-child(2)');
            

            const styleAntwoordWaarde = deTargetParentAntwoord.style.display;

            if (styleAntwoordWaarde === '' || styleAntwoordWaarde === 'none') {
                
                containerVergrotenFunction();

                //--- inklappen van reeds uitgeklapte vraag. Er mag er slechts één uitgeklapt zijn.
                if (containerVergroten !== true) {         // Deze    if...then   is noodzakelijk vanwege de achterdeur
                    for (let teller2=0; teller2<vraag.length; teller2++) {
                        if (antwoord[teller2].style.display !== "") {
                            antwoord[teller2].setAttribute('style', 'display: none;');
                            vraag[teller2].querySelector('img').removeAttribute('style');       //rotatie weghalen door gehele style attribute te verwijderen
                            vraag[teller2].setAttribute('style', 'font-weight: 400;');      
                        }
                    }                
                }


                //--- uitklappen van geslecteerde vraag
                deTargetParentVraag.setAttribute('style', 'font-weight: 700; color: var(--Very-dark-desaturated-blue); ');
                deTargetParentVraag.querySelector('img').setAttribute('style', 'transform: rotate(180deg);')

                deTargetParentAntwoord.setAttribute('style', 'display: block;');
                
            } else {
                deTargetParentVraag.removeAttribute('style');                           // deTargetParentVraag.setAttribute('style', 'font-weight: 400;');
                deTargetParentVraag.querySelector('img').removeAttribute('style');      //rotatie weghalen door gehele style attribute te verwijderen
                
                deTargetParentAntwoord.setAttribute('style', 'display: none;');
            } 
        
        
        }



// ---------------------------------------  Kubus verplaatsen  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //---------- functies om kubus te verplaatsen welke wordt aangeroepen door een eventListener ---------------------------------
    function kubusVerplaatser() {
        kubus.setAttribute('style', 'left: -103px; transition-duration: 0.2s;');
    }

    function kubusVerplaatserMouseOut() {
        kubus.setAttribute('style', 'left: -93px; transition-duration: 0.2s;');
    }


// ---------------------------------------  Container vergroten (middels ?achterdeur=true) ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //---------------------- Beginzaken voor automatisch vergroten container als achterdeur -------------------------------------
    //-------- Is nodig op te slaan want door  height: auto   wordt telkenmale de nieuwe waarde uitgelezen. Of in diepere laag het originele te vinden is, is onbekend */
    let ComputedStyleContainerHeightOrigineelMobiel = "";
    let ComputedStyleContainerSubHeightOrigineelMobiel = "";
    let ComputedStyleContainerHeightOrigineelDesktop = "";
    let ComputedStyleContainerSubHeightOrigineelDesktop = "";


    //---------------------- URL zaken inlezen,   want wil dit via een achterdeur doen --------------------------------------------------
    const argumentenURL = new URLSearchParams(window.location.search);
    console.log('argumentenURL ', argumentenURL);
    let containerVergroten = argumentenURL.get('achterdeur')
    containerVergroten = (containerVergroten=="true");



    //-----------------------                                                          --------------------------------------------------
    if (containerVergroten === true) {
       

        // ---- (fictieve) Scrollbar  om verspringen te voorkomen. Dit zal in <body> moeten worden gezet.
        const body = document.querySelector('body');      
        body.setAttribute('style', 'overflow-y: scroll;')


        // -----  indien browser-/windowbreedte wordt aangepast kunnen bepaalde zaken zoals paddng-bottom vanwege wisseling dekstop / mobiel veranderen. Daarom moet er worden gelistened.
        window.addEventListener('resize', () => { 
            console.log('window is veranderd')
            
            containerVergrotenFunction()        

        });
    }




    function origineleCSSwaarden() {
        
        if (ComputedStyleContainerSubHeightOrigineelMobiel===""  ||  ComputedStyleContainerSubHeightOrigineelDesktop==="") {
        
            const container = document.getElementsByClassName('container')[0];
            const containerSub = document.getElementsByClassName('container-sub')[0];

            const actueleWidthContainer = container.offsetWidth;

            const ComputedStyleContainer = getComputedStyle(container);
            const ComputedStyleContainerSub = getComputedStyle(containerSub);                
            
            
            
            if (ComputedStyleContainerSubHeightOrigineelMobiel==="" && actueleWidthContainer<1440) {            
                
                    //-- bedoeling om de eerste waarden van css height op te slaan in variabelen want  height wordt door auto steeds aangepast.
                    
                    container.removeAttribute('style');     //moet eerst style verwijderen want hier kunnen de desktopwaarden inzitten.  Note: Is ook onder desktop geplaatst. Kan niet anders want er is geen garantie dat schermbreedte/containterbreedte goed staat. Zal hiervoor worden geplaatst levert dat bij tijd en wijle onndige handeling op  en  mogelijk verkeerde weergave.
                    containerSub.removeAttribute('style');   //moet eerst style verwijderen want hier kunnen de desktopwaarden inzitten

                    ComputedStyleContainerHeightOrigineelMobiel = ComputedStyleContainer.height;                
                    ComputedStyleContainerSubHeightOrigineelMobiel = ComputedStyleContainerSub.height;           

            }
            
        
            if (ComputedStyleContainerSubHeightOrigineelDesktop==="" && actueleWidthContainer>=1440) {
                    //-- bedoeling om de eerste waarden van css height op te slaan in variabelen want  height wordt door auto steeds aangepast.

                    container.removeAttribute('style');     //moet eerst style verwijderen want hier kunnen de Mobielwaarden inzitten
                    containerSub.removeAttribute('style');   //moet eerst style verwijderen want hier kunnen de Mobielwaarden inzitten

                    ComputedStyleContainerHeightOrigineelDesktop = ComputedStyleContainer.height;
                    ComputedStyleContainerSubHeightOrigineelDesktop = ComputedStyleContainerSub.height;

            }
        }
        
    }






    function containerVergrotenFunction() {

        if (containerVergroten == true) {

            const container = document.getElementsByClassName('container')[0];
            const containerSub = document.getElementsByClassName('container-sub')[0];            
            const actueleWidthContainer = container.offsetWidth;
            
            origineleCSSwaarden();

            if (actueleWidthContainer<1440) {
                container.setAttribute('style', `height: auto; min-height: ${ComputedStyleContainerHeightOrigineelMobiel}; padding-bottom: 86px;`);  
                containerSub.setAttribute('style', `height: auto; min-height: ${ComputedStyleContainerSubHeightOrigineelMobiel}; `);   
            }

            if (actueleWidthContainer>=1440) {
                container.setAttribute('style', `height: auto; min-height: ${ComputedStyleContainerHeightOrigineelDesktop}; padding-bottom: 128px; `);  
                containerSub.setAttribute('style', `height: auto; min-height: ${ComputedStyleContainerSubHeightOrigineelDesktop}; `);     /*  containerSub.setAttribute('style', 'min-height: 509px;');  */    /*  min-height: 509px;  werkt niet. height prioriteert ondanks dat het intern het anders beschrijft.  Uitvinken hight in css dan werkt min-height wel in css en anders niet. Dus dat zegt genoeg. */   /* maar met height: auto    werkt het wel */
            }

        }
    }


































