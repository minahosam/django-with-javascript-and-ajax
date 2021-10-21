console.log('detail')
const backBtn = document.getElementById('back-btn')
const postBox=document.getElementById('post-box')
const spinnerBox=document.getElementById('spinner-box')
const updateBtn=document.getElementById('update-btn')
const deleteBtn=document.getElementById('delete-btn')
const updateForm=document.getElementById('update-form')
console.log(window.location)
const deleteForm=document.getElementById('delete-form')
const titleInput = document.getElementById('id_title')
const alertBtn = document.getElementById('alert-button')
const bodyInput=document.getElementById('id_body')
const updateUrl = window.location.href + 'update/'
const deleteUrl = window.location.href + 'delete/'
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const url = window.location.href + 'data/'
backBtn.addEventListener('click', ()=>{
    history.back()
})
$.ajax({
    type:'GET',
    url:url,
    success:function(response){
        console.log(response)
        const data = response.data
        if (data.logged_in === data.author) {
            console.log('same')
            updateBtn.classList.remove('hidden')
            deleteBtn.classList.remove('hidden')
        } else {
            console.log('different')
        }
        spinnerBox.classList.add('hidden')
        // postBox.innerHTML = `
        //     <h3>${data.title}</h3>
        //     <hr>
        //     <p>${data.body}</p>
        // `
        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-3')
        titleEl.setAttribute('id', 'title')
        titleEl.textContent = data.title 
        titleEl.innerHTML += '<hr>'
        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-2')
        bodyEl.setAttribute('id', 'body')
        bodyEl.textContent = data.body
        postBox.appendChild(titleEl)
        postBox.appendChild(bodyEl)
        titleInput.value=data.title
        bodyInput.value=data.body
    },
    error:function(error){
        console.log(error)
    }
})
updateForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const title =document.getElementById('title')
    const body=document.getElementById('body')
    $.ajax({
        type :'POST',
        url:updateUrl,
        data:{
            'csrfmiddlewaretoken':csrf[0].value,
            'title':titleInput.value,
            'body':bodyInput.value,
        },
        success:function(response){
            console.log(response)
            title.textContent=response.title
            body.textContent=response.body
            $('#updateModal').modal('hide')
            handleAlert('success','post updated')
            updateForm.reset()
        },
        error:function(error){
            console.log(error)
        }
    })
})
deleteForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    $.ajax({
        type:'POST',
        url:deleteUrl,
        data:{
            'csrfmiddlewaretoken':csrf[0].value
        },
        success:function(response){
            window.location.href=window.location.origin + '/post/'
            localStorage.setItem('title',titleInput.value)
        },
        error:function(error){
            console.log(error)
        }
    })
})