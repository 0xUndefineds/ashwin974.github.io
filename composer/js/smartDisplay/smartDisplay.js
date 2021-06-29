const contentModule = document.createElement('script')
const mp = document.querySelector('.realization')
contentModule.src = "composer/js/smartDisplay/contentModule.js"
head.appendChild(contentModule)
const body = document.querySelector('body')
let theme;
let positionDisplay = 0;
const xDisplay = document.querySelector('.realization') //module vidéo
let videoContainer = document.querySelector('.video-theme')
let videoBlocks = videoContainer.firstElementChild
let videoThemeSrcPathDynamic = videoBlocks.firstElementChild;
let switchmedia;
let blockText = document.createElement("div")
let text;
let images;
let player = false;

//New
let title = document.querySelector('.title-gen-content')
let textGenDescription = document.querySelector('.text-gen-description')


function displayRevealSetting() {
    mp.classList.toggle('p0')
    setTimeout(_ => { mp.classList.toggle('p4') }, 1700)
    setTimeout(_ => { mp.classList.toggle('p0') }, 1900)
}

function genVideo(src, titleGenContent, TextGenDescription) {
    textGenDescription.innerText = TextGenDescription;
    title.innerText = titleGenContent;
    videoContainer.removeChild(videoBlocks)
    const video = document.createElement('video')
    const source = document.createElement('source')
    source.src = src
    video.appendChild(source)
    videoContainer.appendChild(video)
    video.controls = true;
    //Redeclaration des variables pour l'actualisation des valeurs pour la suprpesions
    videoContainer = document.querySelector('.video-theme')
    videoBlocks = videoContainer.firstElementChild
}

function genText(titleGenContent, texte1, img1, texte2, img2, texte3, img3, text4, img4) {
    title.innerText = titleGenContent;
    player = false;
    videoContainer.removeChild(videoBlocks)
    textGenDescription.innerText = texte1
    blockText.style.cssText = `display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;`
    videoContainer.appendChild(blockText)
    images = document.createElement("img")
    images.style.cssText = ``
    blockText.appendChild(images)
    if (texte2 != undefined) {
        const text2 = document.createElement('p')
        text2.classList.toggle('text-gen')
        text2.innerText = texte2;
        blockText.appendChild(text2)

    }
    const rdr = document.querySelectorAll('.text-gen');
    rdr.forEach(function(OxxxI, i) {
        rdr[i].style.cssText = "color:black !important;font-family: 'cmu_serifroman' !important;"
    })
}

function switchMedia(OxxxA) {
    switch (OxxxA) {
        case "apprenti":
            player = false;
            genText(content.aps.jobs, content.aps.description)
            break;
        case "web-homepage":
            player = true;
            genVideo("composer/video/website-creation-home-page.mp4", content.dev.jobs, content.dev.description)
            break;
        case "web-components":
            player = true;
            genVideo("composer/video/components-creation.mp4", content.dev2.jobs, content.dev2.description)
            break;
        case "adjoint":
            player = false;
            genText(content.att.jobs, content.att.description);
            break;
        default:
            break;
    }
}

function playerReveal() {
    displayRevealSetting()
    setTimeout(function() {
        xDisplay.classList.toggle('p1')
    }, 0)
    setTimeout(function() {
        xDisplay.classList.toggle('p2')
    }, 1500)
}
const testnet = document.querySelectorAll('.start-anim')
testnet.forEach(function(OxIII, i) {
    testnet[i].addEventListener('click', function() {
        switchmedia = this.classList[this.classList.length - 1] //pour récuperer le dernier éléments de la classlist qui contient le context
        console.log(switchmedia)
        switchMedia(switchmedia)
        console.log(player)
        this.parentNode.appendChild(xDisplay)
        if (player == true) {
            theme = this.classList;
            playerReveal();
            setTimeout(_ => { videoBlocks.play() }, 2000)
        } else {
            playerReveal()
                //genText();
        }
    })
})
const manageButton = document.querySelector('.manage')
manageButton.addEventListener('click', function(e) {
    e.stopPropagation()
    if (videoContainer.firstElementChild == videoBlocks) {
        playerReveal();
        videoBlocks.pause();
    } else {
        //Dans ce fcas smartDisplay affiche alors un media de type document
        // blockText.removeChild(textGenDescription)
        blockText.removeChild(images)
        videoContainer.removeChild(blockText)
        videoBlocks = document.createElement('video')
        videoContainer.appendChild(videoBlocks)
        playerReveal()
    }
})