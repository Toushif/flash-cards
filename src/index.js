
const btnLeft = document.querySelector('[btn-left]')
const btnRight = document.querySelector('[btn-right]')
const textEle = document.querySelector('[data-text]')
const transEle = document.querySelector('[data-translate]')
const flashCard = document.getElementsByClassName('flash')[0]

let list;
let trackId = 0;
let toggleBool = false;

function handleCard(e) {
    toggleBool = !toggleBool;
    toggle(toggleBool)
    toggleBool = false;
    console.log('handleCard', e)
}

function toggle(isTrue) {
    transEle.style.display = isTrue ? 'block' : 'none'
    textEle.style.display = isTrue ? 'none' : 'block'
}

function handleRight() {
    trackId += 1;
    const obj = list.find(v => v.id === trackId)
    next(obj)
    if(btnLeft.getAttribute('disabled')) btnLeft.removeAttribute('disabled')
    if(trackId === list.length) btnRight.setAttribute('disabled', true)
}

function handleLeft() {
    trackId -= 1;
    const obj = list.find(v => v.id === trackId)
    next(obj)
    if(btnRight.getAttribute('disabled')) btnRight.removeAttribute('disabled')
    if(trackId === 1) btnLeft.setAttribute('disabled', true)
}

function next(obj) {
    textEle.textContent = obj.text
    transEle.textContent = obj.translate
    textEle.style.display = 'block'
    transEle.style.display = 'none'
}

async function start() {
    btnLeft.addEventListener('click', handleLeft, false)
    btnRight.addEventListener('click', handleRight, false)
    flashCard.addEventListener('click', handleCard, false)

    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    list = data.map((v,i) => {
        return {
            id: i+1,
            text: v.title,
            translate: [...v.title].reverse().join("")
        }
    })

    initialize()
}


function initialize() {
    trackId = list[0].id
    textEle.textContent = list[0].text
    transEle.textContent = list[0].translate
    transEle.style.display = 'none'
    btnLeft.setAttribute('disabled', true)
    if(list.length === 1) btnRight.setAttribute('disabled', true)
}

start()