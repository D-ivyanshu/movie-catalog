const main = document.querySelector('.main');

fetch(genres_list + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
	console.log(data);
	data.genres.forEach(item => {
		fetchMoviesListByGenres(item.id , item.name);
	})
})

// first fetch all the genres and then select movies according to different genres
const fetchMoviesListByGenres = (id, genres) => {
	fetch(movie_genres + new URLSearchParams({
		api_key : api_key,
		with_genres : id, 
		page : Math.floor(Math.random() * 3) + 1
	}))
	.then(res => res.json())
	.then(data => {
		makeCategoryElement(`${genres}_movies`, data.results)
	})
	.catch(err => console.log(err));
}


const makeCategoryElement = (category, data) => {
    main.innerHTML += `
	<div class="movie-list">
		<button class="pre-btn"><img src="img/pre.png" alt=""></button>
		<h1 class="movie-category">${category.split("_").join(" ")}</h1>
		<div class="movie-container" id = "${category}">
			 
		</div>
		<button class="nxt-btn"><img src="img/nxt.png" alt=""></button>
	</div> 
	`;
	makeCards(category, data);
}


const makeCards = (id, data) => {
	const moviesContainer  = document.getElementById(id);
	data.forEach((item, i) => {
		// if tmbd gives no image then that case 
		if(item.backdrop_path == null){
			// if the backdrop path is null then check for the poster path if it is also null then we can't do we have to return
			item.backdrop_path = item.poster_path;
			if(item.backdrop_path == null){
				return;
			}
	    } 
        

		moviesContainer.innerHTML += `
		<div class="movie" onclick = "location.href = '/${item.id}'">
			<img src="${img_url}${item.backdrop_path}" alt="">
			<p class="movie-title">${item.title}</p>
		</div>
		`;

		if(i == data.length - 1){
            setTimeout(() => {
				setupScrolling();
			}, 100);
		}
	})
}   

// for the search functionality

const form = document.querySelector('#form');
const Search = document.querySelector('#Search');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const q = Search.value;
	form.reset(); 
	fetch(search + new URLSearchParams({
		api_key: api_key,
		query:q
	}))
	.then(res => res.json())
	.then(data => {
		location.href = `/${data.results[0].id}`;
	})
	
})