// const [right, left, up, down] = [1, 2, 3, 4];
const grid = document.getElementsByClassName("grid")[0];
let root = document.querySelector(":root");
console.log(root);
let cells = document.getElementsByClassName("cell");
const overlays = document.getElementsByClassName("overlay");
const move_button = document.getElementById("move_button");

function SetStartX(x) {
    let value = x.split("+").join(" + ");
    let r = getComputedStyle(root);
    root.style.setProperty("--start-x","calc("+value+")");
}

function SetEndX(x) {
    let value = x.split("+").join(" + ");
    let r = getComputedStyle(root);
    root.style.setProperty("--end-x","calc("+value+")");
}
let x = 1;
let y = 3;
function move() {
    let a = cells[x];
    let oa = overlays[x];
    let b = cells[y];
    let ob = overlays[y];
    let result_value = parseInt(a.innerHTML)+parseInt(b.innerHTML);
    if (x==y){
        return;
    }
    a.classList.remove("fadeout");
    void a.offsetWidth;
    a.classList.add("fadeout");
    setTimeout(() => {
        a.innerHTML = "";
        b.innerHTML = result_value;
    }, 500);
    if(x<y){
        SetStartX(String(x*40)+"px");
        SetEndX(String((y-x)*40)+"px+"+String(y-x)+"em");
        oa.classList.remove("move");
        void oa.offsetWidth;
        oa.classList.add("move");
    }else{
        SetStartX(String((x-y)*40)+"px+"+String(x-y)+"em");
        SetEndX(String(y*40)+"px");
        ob.classList.remove("move");
        void ob.offsetWidth;
        ob.classList.add("move");
    }
}


move_button.addEventListener("click",move);