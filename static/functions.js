const handleAlert = (type , msg)=>{
    alertBtn.innerHTML=`
        <div class="alert alert-${type}" role="alert">
            ${msg}
        </div>
    `
    setTimeout(()=>{
        clearInterval(handleAlert)
    },700)
}
