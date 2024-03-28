 var cl = console.log;

const showModal = document.getElementById("showModal");
const backdrop = document.getElementById("backdrop");
const submitBtn = document.getElementById("submitBtn");
const updateBtn =document.getElementById("updateBtn");
const moviemodal = document.getElementById("moviemodal");
const movieform = document.getElementById("movieform");
const titleControl = document.getElementById("title");
const imgurlControl = document.getElementById("imgurl");
const overviewControl = document.getElementById("overview");
const ratingControl = document.getElementById("rating");
const moviecontainer = document.getElementById("moviecontainer");

const closeModalbtns = [...document.querySelectorAll(".closeModal")];

let moviearr = [];

const templatingOfMovie = (arr) => {
	let result = ``;
	arr.forEach(obj => {
		result += `
					<div class="col-md-4" >
					<div class="card mb-4"  >
						<figure class="moviecard mb-0" id="${obj.movieId}">
							<img src ="${obj.imgurl}" alt="${obj.title}" title="${obj.title}" >
							<figcaption>
								<div class="ratingsection">
									<div class="row">
										<div class="col-10">
											<h2 class="mb-0">${obj.title}</h2>
										</div>
										<div class="col-2">
											<span class="color">${obj.rating}</span>
										</div>
									</div>
								</div>
								<div class="overviewsection">
									<h3>
										${obj.title}
									</h3>
									<em>Overview</em>
									<p>
										${obj.overview}
									</p>
									<div class="action">
										<button class="btn btn-outline-info" onClick = "onMovieEdit(this)">Edit</button>
										<button class="btn btn-outline-danger" onClick = "onMovieDelete(this)">Delete</button>
									</div>
								</div>
							</figcaption>
						</figure>
					</div>
				</div>`
	})
	moviecontainer.innerHTML = result;
}

if(localStorage.getItem("moviearr")){
	moviearr= JSON.parse(localStorage.getItem("moviearr"));
	templatingOfMovie(moviearr);
}

templatingOfMovie(moviearr);


const modalbackdroptoggle = () => {
	backdrop.classList.toggle('active');
	moviemodal.classList.toggle('active');
}

Uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

const onMovieEdit = (ele) => {
		let editId = ele.closest(".moviecard").id;
		cl(editId);
		localStorage.setItem("editId", editId);
		let editObj = moviearr.find(f => f.movieId === editId)
		cl(editObj);
		modalbackdroptoggle();
		titleControl.value = editObj.title;
		imgurlControl.value = editObj.imgurl;
		overviewControl.value = editObj.Overview;
		ratingControl.value = editObj.rating;
		submitBtn.classList.add("d-none");
		updateBtn.classList.remove("d-none");



}

const onMovieDelete = (ele) => {
	Swal.fire({
		title: "Do you want to remove Movie?",
		showDenyButton: true,
		showCancelButton: true,
		confirmButtonText: "Yes",
		
	  }).then((result) => {
		if (result.isConfirmed)
				{
					
				let deleteId = ele.closest(".moviecard").id;
				cl(deleteId);
				let getDeleteIndex = moviearr.findIndex(f => f.id === deleteId)
				cl(getDeleteIndex)
				moviearr.splice(getDeleteIndex, 1);
				localStorage.setItem("moviearr", JSON.stringify(moviearr));
				ele.closest(".col-md-4").remove();
				  Swal.fire("Removed Successfully", 2000, "success");
				}
		
	  });

	
}

const addmovieCard = (obj) => {
	let card = document.createElement("div");
	card.id = obj.movieId;
	card.className = "col-md-4";
	card.innerHTML = `<div class="card mb-4"  >
	<figure class="moviecard mb-0" id="${obj.movieId}">
		<img src ="${obj.imgurl}" alt="${obj.title}" title="${obj.title}" >
		<figcaption>
			<div class="ratingsection">
				<div class="row">
					<div class="col-10">
						<h2 class="mb-0">${obj.title}</h2>
					</div>
					<div class="col-2">
						<span class="color">${obj.rating}</span>
					</div>
				</div>
			</div>
			<div class="overviewsection">
				<h3>
					${obj.title}
				</h3>
				<em>Overview</em>
				<p>
					${obj.overview}
				</p>
				<div class="action">
					<button class="btn btn-outline-info" onClick = "onMovieEdit(this)">Edit</button>
					<button class="btn btn-outline-danger" onClick = "onMovieDelete(this)">Delete</button>
				</div>
			</div>
		</figcaption>
	</figure>
</div>
	`;
	moviecontainer.prepend(card);
}

const onMovieadd = (e) => {
	e.preventDefault();
	let movieObj = {
		title : titleControl.value,
		imgurl : imgurlControl.value,
		overview : overviewControl.value,
		rating : ratingControl.value,
		movieId : Uuid()
	}
	moviearr.unshift(movieObj);
	localStorage.setItem("moviearr", JSON.stringify(moviearr));
	// templatingOfMovie(moviearr);
	
	addmovieCard(movieObj);
	e.target.reset();
	modalbackdroptoggle();
	Swal.fire({
		title : `Movie ${movieobj.title} is added successfully`,
		icon : success,
		timer : 5000
	})
}


showModal.addEventListener("click", modalbackdroptoggle);
  
closeModalbtns.forEach(btn => {
	btn.addEventListener("click", modalbackdroptoggle)
	
})

const onMovieupdate = () => {
	let updateId = localStorage.getItem("editId");
	let updatedObj = {
		title : titleControl.value,
		imgurl : imgurlControl.value,
		overview : overviewControl.value,
		rating : ratingControl.value,
		movieId : updateId
	}
	cl(updatedObj);
	let getIndex = moviearr.findIndex(f => f.movieId === updateId);
	moviearr[getIndex] = updatedObj;
	localStorage.setItem("moviearr", JSON.stringify(moviearr));
	let getCard = document.getElementById(updateId);
	cl(getCard)
	getCard.innerHTML = `	<img src ="${updatedObj.imgurl}" alt="${updatedObj.title}" title="${updatedObj.title}" >
	<figcaption>
		<div class="ratingsection">
			<div class="row">
				<div class="col-10">
					<h2 class="mb-0">${updatedObj.title}</h2>
				</div>
				<div class="col-2">
					<span class="color">${updatedObj.rating}</span>
				</div>
			</div>
		</div>
		<div class="overviewsection">
			<h3>
				${updatedObj.title}
			</h3>
			<em>Overview</em>
			<p>
				${updatedObj.overview}
			</p>
			<div class="action">
				<button class="btn btn-outline-info" onClick = "onMovieEdit(this)">Edit</button>
				<button class="btn btn-outline-danger" onClick = "onMovieDelete(this)">Delete</button>
			</div>
		</div>
	</figcaption>`
	modalbackdroptoggle();

	Swal.fire({
		title : `${updatedObj.title} is updated !!!`,
		timer : 2500,
		icon : 'success',
	})


}

movieform.addEventListener("submit", onMovieadd);
updateBtn.addEventListener("click",onMovieupdate);















// const modalbackdropshow = () => {
	// backdrop.classList.toggle(`active`);
	// moviemodal.classList.toggle(`active`);
	
// } 



// const modalbackdrophide = () => {
	// backdrop.classList.toggle('active');
	// moviemodal.classList.toggle('active');
// }
