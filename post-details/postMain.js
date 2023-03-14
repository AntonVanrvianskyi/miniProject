// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

function createPostInfo() {
  let url = new URL(location.href);
  let jsonPost = url.searchParams.get('post');
    let parsePost = JSON.parse(jsonPost);
    const wrapper = document.getElementsByClassName('wrapper')[0];
    const h3 = document.getElementsByClassName('h3-post')[0];
    const postDiv = document.getElementsByClassName('post-info')[0];
    for (const item in parsePost) {
            const paragraphPost = document.createElement('p');
            paragraphPost.innerText = `${item}:${parsePost[item]}`
            postDiv.appendChild(paragraphPost);

    }
    fetch(`https://jsonplaceholder.typicode.com/posts/${parsePost.id}/comments`)
        .then(response => response.json())
        .then(response =>{
                const wrapperCom = document.createElement('div');
                wrapperCom.classList.add('wrapper-comment')
            for (const responseElement of response) {
                    const divComments = document.createElement('div');
                    divComments.classList.add('div-comment')
                // const divComments = document.getElementsByClassName('div-comment')[0];
                for (const value in responseElement) {
                    const parComments = document.createElement('p');

                    parComments.innerText = `${value}: ${responseElement[value]}`;
                    divComments.appendChild(parComments);
                }
                wrapperCom.appendChild(divComments);
                document.body.appendChild(wrapperCom)

            }
            wrapper.appendChild(wrapperCom)
        })

}
createPostInfo()



