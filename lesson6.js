function loadGitHubUsers (searchString) {
    const result = document.getElementById('results');

    if (searchString === '') {
        while (result.firstChild) {
            result.removeChild(result.firstChild);
        }
        let text = document.createTextNode('Error! Please, enter username!');
        result.appendChild(text);

        return null;
    }

    const url = 'https://api.github.com/search/users?q=' + searchString;

    fetch(url)
        .then(function (response) {
            if (response.status === 200) {
              return response.json();
            }
        })
        .then(function (users) {
            while (result.firstChild) {
                result.removeChild(result.firstChild);
            }

            const arr = users.items.slice();

            if (arr.length === 0) {
                let text = document.createTextNode('Nothing found on request');
                result.appendChild(text);
            } else {
                let ul = document.createElement('ul');

                for (let i = 0; i < arr.length && i < 5; i++) {
                    let li = document.createElement('li');
                    let text = document.createTextNode(arr[i].login);

                    li.appendChild(text);
                    ul.appendChild(li);
                }
                result.appendChild(ul);
            }
        })
        .catch(function (error) {
            while (result.firstChild) {
                result.removeChild(result.firstChild);
            }

            let text = document.createTextNode('Error! ' + error.message);
            result.appendChild(text);

            return null;
        });
}

document.getElementById('form').addEventListener('submit', function(event){
   event.preventDefault();
   loadGitHubUsers(document.getElementById('username').value);
});