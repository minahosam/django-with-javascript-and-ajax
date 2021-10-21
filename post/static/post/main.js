console.log('hell')
postsBar=document.getElementById('posts-bar')
const postsBox = document.getElementById('posts-text')
const spinner = document.getElementById('spinner-border')
const loadBtn = document.getElementById('load-btn')
const endBtn = document.getElementById('end-btn')
const postForm = document.getElementById('post-form')
const title = document.getElementById('id_title')
const body = document.getElementById('id_body')
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const alertBtn = document.getElementById('alert-button')
const addBtn =  document.getElementById('add-btn')
const closeBtn=[...document.getElementsByClassName('close-btn')]
const dropzone=document.getElementById('dropzone')
const url = window.location.href
// postsBar.textContent='hhi'
const deleted=localStorage.getItem('title')
if (deleted) {
    handleAlert('danger',`delted${deleted}`)
    localStorage.clear()
}
$.ajax({
    type:'GET',
    url:'/post/json/',
    success:function(response){
        console.log(response)
    },
    error: function(error){
        console.log(error)
    }
})

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const likeUnlikePosts = ()=>{
    const likeForm = [...document.getElementsByClassName('like-unlike-form')]
    likeForm.forEach(form => form.addEventListener('submit',e=>{
        e.preventDefault()
        const postId=e.target.getAttribute('data-post-number')
        console.log(postId)
        const btnText=document.getElementById(`${postId}`)
        $.ajax({
            type:'POST',
            url:'/post/jpost/like-unlike/',
            data:{
                'csrfmiddlewaretoken':csrftoken,
                'pk':postId,
            },
            success:function(response){
                console.log(response)
                btnText.textContent = response.liked ? `unlike(${response.count})` : `like(${response.count})`
            },
            error:function(error){
                console.log(error)
            }
        })
    }))
}

let visible = 2
const getData = ()=>{
    $.ajax({
        type:'GET',
        url:`/post/jpost/${visible}`,
        success:function(response){
            // console.log(response)
            console.log(response.data)
            data=response.data
            setTimeout(()=>{
                spinner.classList.add('hidden')
                // spinner.textContent='loading'
                data.forEach(element => {
                    console.log(element.id)
                    postsBox.innerHTML += `
                    <div class="card mt-2 mb-2">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.body}</p>
                        </div>
                        <div class='row'>
                            <div class='col-1'>
                                <a href="${url}${element.id}" class="btn btn-primary">details</a>
                            </div>
                            <div class='col-1'>
                                <form class='like-unlike-form' data-post-number='${element.id}' method='POST'>
                                    
                                    <button class="btn btn-primary" id='${element.id}'>${element.like ? `unlike(${element.count})` : `like(${element.count})`}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    `
                });
                likeUnlikePosts()
            },700)
            if (response.size === 0) {
                endBtn.textContent = 'no posts yet'
            }else if (response.size <=  visible){
                loadBtn.classList.add('hidden')
                endBtn.textContent='no posts else'
            }
        },
        error:function(error){
            console.log(error)
        }
    })
}

loadBtn.addEventListener('click',()=>{
    visible += 2
    getData()
})
let postId = null
postForm.addEventListener('submit',e=>{
    e.preventDefault()
    $.ajax({
        type:'POST',
        url:'/post/',
        data:{
            'csrfmiddlewaretoken':csrf[0].value,
            'title':title.value,
            'body':body.value,
        },
        success:function(response){
            console.log(response)
            postId = response.id
            console.log(postId)
            // postsBox.insertAdjacentHTML('afterend',`
            //     <div class="card mt-2 mb-2">
            //         <div class="card-body">
            //             <h5 class="card-title">${response.title}</h5>
            //             <p class="card-text">${response.body}</p>
            //         </div>
            //         <div class='row'>
            //             <div class='col-1'>
            //                 <a href="#" class="btn btn-primary">details</a>
            //             </div>
            //             <div class='col-1'>
            //                 <form class='like-unlike-form' data-post-number='${response.id}' method='POST'>
                                
            //                     <button class="btn btn-primary" id='${response.id}'>${response.like ? `unlike(${response.count})` : `like(${response.count})`}</button>
            //                 </form>
            //             </div>
            //         </div>
            //     </div>
            // `)
            likeUnlikePosts()
            // $('#postModal').modal('hide')
            handleAlert('success','post added correctly')
            // postForm.reset()
        },
        error:function(error){
            console.log(error)
            handleAlert('danger','something wrong')
        }
    })
})
addBtn.addEventListener('click',()=>{
    dropzone.classList.remove('hidden')
})
closeBtn.forEach(btn=>btn.addEventListener('click',()=>{
    postForm.reset()
    if (!dropzone.classList.contains('hidden')) {
        dropzone.classList.add('hidden')
    }
}))
Dropzone.autoDiscover=false
const myDropzone=new Dropzone('#dropzone',{
    url:'upload/',
    init:function(){
        this.on('sending',function(file,xhr,formData){
            formData.append('csrfmiddlewaretoken',csrftoken),
            console.log(postId),
            formData.append('new_post_id',postId),
            console.log(formData)
        })
    },
    maxFiles:5,
    maxFilesize:4,
    acceptedFiles:'.jpg , .jpeg'
})
getData()