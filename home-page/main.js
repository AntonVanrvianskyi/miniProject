// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули

function getUser() {
     fetch('https://jsonplaceholder.typicode.com/users')
        .then(value => value.json())
        .then(value => {
            const wrapper = document.getElementsByClassName('wrapper')[0];
            for (const user of value) {
                const headDiv = document.createElement('div');
                headDiv.classList.add('user')

               const paragraphUser = document.createElement('p');
                paragraphUser.innerText = `${user.id}. ${user.name}`;

               const a = document.createElement('a');

               a.innerText = 'more info'
               a.href = '/miniProject/user-details/user.html?object='+JSON.stringify(user);
               a.setAttribute('target', '_blank');
               a.classList.add('link');
               const linkBlock = document.createElement('div');

               linkBlock.classList.add('link-block')
               linkBlock.appendChild(a)
                headDiv.append(paragraphUser,linkBlock);
               wrapper.append(headDiv)
                document.body.appendChild(wrapper);
            }

        });
}

getUser()




