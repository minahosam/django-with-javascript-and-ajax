// console.log('hello world')
// const testQz=document.getElementById('test-qz')
// // change content
// testQz.textContent='bye'
// // when click
// testQz.addEventListener('click',()=>{
//     console.log('clicked')
//     testQz.innerHTML='cliicked'
// })
// // when mouseover
// testQz.addEventListener('mouseover',()=>{
//     console.log('on')
// })
// // when mouseout
// testQz.addEventListener('mouseout',()=>{
//     console.log('off')
// })
// document.addEventListener('scroll',()=>{
//     const positionY=window.scrollY
//     console.log(positionY)
// })
// //get data with ajax
// const url='https://swapi.dev/api/people/'
// //jquery ajax method
// $.ajax({
//     type:'GET',
//     url:url,
//     success:function(response){
//         console.log(response)
//     },
//     error:function(error){
//         console.log(error)
//     }
// })
// //XMLHttpRequest method
// // when req.readystate is equal to four is basically that request is completed and the response is ready if zero mean that the request isn't yet intialized if one mean that the connection has been created if two mean the request has been received if three mean that the request is processing ok
// const req = new XMLHttpRequest();
// req.addEventListener('readystatechange',()=>{
//     if (req.readyState===4){
//         console.log('xhtml',JSON.parse(req.responseText))
//     }
// })
// req.open('GET',url)
// req.send()
// // fetch method
// fetch(url)
// .then(resp=> resp.json()).then(data=> console.log('fetch',data))
// .catch(err=> console.log(err))