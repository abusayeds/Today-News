
const loadPosts = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayPost(data))
}

const displayPost = (posts) => {
    //console.log(posts)
    const postsContainer = document.getElementById('navbarNavDropdown');
    for (const post of posts.data.news_category) {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
                <ul class="navbar-nav  fs-5 fw-normal">
                  <li class="nav-item me-4">
                    <a class="nav-link " aria-current="page" onclick="loadNewsDetails('${post.category_id}')"  href="#">${post.category_name}</a>
                  </li>
                 </ul>
              `;
        postsContainer.appendChild(postDiv);
    }

}

loadPosts();

const loadNewsDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displaypage(data))

}

const displaypage = (posts) => {
    const postsContainer = document.getElementById('news-card');
    const countData = document.getElementById("count");
    countData.innerText = posts.data.length;
    postsContainer.textContent = '';
    if (posts.data.length === 0) {
        // console.log('not found')
        postsContainer.innerHTML = `<h2 class="text-2xl mt-5 pt-5 alard text-warning text-center">Not Found</h2>`

        return;
    }
    const shortPost = posts.data.sort((a, b) => b.total_view - a.total_view)

    for (const post of shortPost) {
        const postDiv = document.createElement('row');

        postDiv.innerHTML = `
            <div class="row my-4  p-2  " style="max-width: 100%; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
            <div class="col-md-4">
                <img src=${post.image_url} class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text"> ${post.details.slice(0, 300)}</p>
                <div class="d-lg-flex d-sm-block  justify-content-between mt-5">
                <h5 class="card-text"><img src="${post.author.img}" alt="mdo" width="32" height="32" class="rounded-circle">
                 ${post.author.name === null ? 'No Found.' : post.author.name}</h5>
                    <p class="px-5"> <i class="fa-regular fa-eye"></i> ${post.total_view === null ? 'No watching' : post.total_view}</p>
                    <button onclick="newsDeteles('${post._id}')" href="#" class="btn px-5" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
                </div>
            </div>
            </div>
       `;
        postsContainer.appendChild(postDiv);
    }
    toggleSpinner(false);

}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const newsDeteles = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => displayNewsDetails(data))
}


const displayNewsDetails = news => {

    for (const post of news.data) {
        if (post.author.name) {
            const modalTitle = document.getElementById('newsDetailModalLabel');
            modalTitle.innerText = post.title;
            const newsDetails = document.getElementById('news-details');
            newsDetails.innerHTML = `
        <img src=${post.image_url} class="img-fluid w-100 rounded-start" alt="...">
        <h3>${post.author.name}</h3>
        <p> ${post.details} </p>
    `
        } else {
            const newsDetails = document.getElementById('news-details');
            newsDetails.innerHTML = `
         <h1 class ="text-center">'No Found.'</h1>
    `
        }
    }

}
loadNewsDetails("04")

