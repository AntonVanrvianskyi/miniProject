function renderUserInfo(object) {
    const wrapper = document.createElement('div');

    Object.keys(object).forEach(key =>{
        const item = document.createElement('div');

        if (typeof object[key] === 'object'){

            item.innerHTML = `<div class = 'road'>${key}:</div>`;
            item.classList.add('object-key')
            item.append(renderUserInfo(object[key]));


        }else {

            item.classList.add('item');
            item.innerHTML = `<b>${key}</b>: ${object[key]}`

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

                                response.map(post =>{

                                const titleDiv = document.createElement('div');
                                titleDiv.setAttribute('class','titleDiv')
                                const aPost = document.createElement('a');
                                aPost.classList.add('link-user')
                                const link = document.createElement('div');
                                link.classList.add('link-block-user');
                                aPost.href = '/miniProject/post-details/post.html?post='+JSON.stringify(post);
                                aPost.setAttribute('target', '_blank');
                                aPost.innerText = 'post-details';
                                link.append(aPost)
                                titleDiv.innerHTML = `<p>${post.title}</p>`;
                                titleDiv.append(link)
                                headTitleDiv.append(titleDiv)
                                wrapperUser.appendChild(headTitleDiv)

                            });
                        });
                }
            });
 }

createUserPosts()