const idMovie = location.pathname;

fetch(`${movie_detail}${idMovie}?` + new URLSearchParams({
	api_key : api_key
}))
.then(res => res.json())
.then(data => {
	setupMovieInfo(data);
})

const setupMovieInfo = (data) => {
	const movieName = document.querySelector('.movie-name');
	const genres = document.querySelector('.genres');
	const des = document.querySelector('.des');
	const title = document.querySelector('title');
	const backdrop = document.querySelector('.movie-info');
   
	title.innerHTML = movieName.innerHTML = data.title;	
	genres.innerHTML = `${data.release_date.split('-')[0]} | `;
	for(let i = 0; i < data.genres.length; i++){
		genres.innerHTML += data.genres[i].name;
		genres.innerHTML += " ";
	}
	
	if(data.adult == true){
		genres.innerHTML += ' | +18';
	}

	if(data.backdrop_path == null){
		data.backdrop_path = data.poster_path;
	}

	des.innerHTML = data.overview.substring(0,200) + '...';
    
	backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;
}


// movies clips fetching 

fetch(`${movie_detail}${idMovie}/videos?` + new URLSearchParams({
	api_key: api_key
}))
.then(res => res.json())
.then(data => {
	
	console.log(data);
    const trailerContainer = document.querySelector('.trailer-container');
    const maxClips = (data.results.length > 4) ? 4 : data.results.length;

    for(let i = 0; i < maxClips; i++){
        trailerContainer.innerHTML += `
        <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }

})

// movie recommendation fetching

fetch(`${movie_detail}${idMovie}/recommendations?` + new URLSearchParams({
	api_key: api_key,
}))
.then(res => res.json())
.then(data => {
	const container = document.querySelector('.recommendations-container');
	for(let i = 0; i < 16; i++){
		if(data.results[i].backdrop_path == null){
			i++;
		}
		container.innerHTML += `
		<div class="movie" onclick = "location.href = '/${data.results[i].id}'">
		    <img src="${img_url}${data.results[i].backdrop_path}" alt="">
		    <p class="movie-title">${data.results[i].title}</p>
	    </div>
		`;
	}
})

