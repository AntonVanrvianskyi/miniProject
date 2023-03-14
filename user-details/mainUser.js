// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.


function renderUserInfo(object) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    // let count = 0;
    Object.keys(object).forEach(key =>{
        const item = document.createElement('div');
        item.classList.add('item');
        // item.setAttribute('id',count+=2)
        if (typeof object[key] === 'object'){

            // wrapper.setAttribute('id','address')
            item.append(renderUserInfo(object[key]));

        }else {
            // item.setAttribute('id',count+=1)
            item.innerText = `${key}: ${object[key]}`

        }
        wrapper.append(item)

    } );
    return wrapper
}
 function createUserPosts() {
    let url = new URL(location.href);
    let json = url.searchParams.get('object')
    let parse = JSON.parse(json);
    let arr = [];
    arr.push(parse);

     const wrapperUser = document.getElementsByClassName('wrapper-user')[0];

     for ( const {...rest} of arr) {
         const infoUser = document.getElementsByClassName('info')[0];
            infoUser.append(renderUserInfo(rest));
     }

     const btn = document.getElementsByClassName('btn-post')[0];
            btn.addEventListener('click', function () {
                this.isOpened = !this.isOpened
                    btn.innerText = 'hidden current post'
                if (!this.isOpened) {
                    [ ...document.getElementsByClassName('titleDiv') ].forEach(element => element.remove())
                    btn.innerText = 'post of current user'
                } else {
                    fetch(`https://jsonplaceholder.typicode.com/users/${parse.id}/posts`)
                        .then(response => response.json())
                        .then(response=>{
                            const headTitleDiv = document.createElement('div');
                            headTitleDiv.classList.add('headTitleDiv')
                            const userTitle = response.map(post =>{
                                const titleDiv = document.createElement('div');
                                titleDiv.setAttribute('class','titleDiv')
                                const aPost = document.createElement('a');
                                aPost.classList.add('link-user')
                                const link = document.createElement('div');
                                link.classList.add('link-block-user');
                                aPost.href = '/miniProject/post-details/post.html?post='+JSON.stringify(post);
                                aPost.setAttribute('target', '_blank');
                                aPost.innerText = 'post-detailes';
                                link.append(aPost)
                                titleDiv.innerText = post.title;
                                titleDiv.append(link)
                                headTitleDiv.append(titleDiv)
                                wrapperUser.appendChild(headTitleDiv)

                            });
                        });
                }
            });
 }

createUserPosts()