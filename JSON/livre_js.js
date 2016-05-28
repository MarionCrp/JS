function chapitren(){
	var chap = window.location.hash;
	if(chap == ""){
		var chapn = "chapitre1";
		var title = "Chapitre 1";
	} else {
		var chapn = "chapitre" + window.location.hash.substring(1);
		var title = "Chapitre " + window.location.hash.substring(1);
	}
		var req = new XMLHttpRequest();
		req.open("GET", chapn + ".json");
		req.onerror = function(){
			console.log("Echec de chargement " + chapn + ".json");
		};
		req.onload = function(){
			if (req.status === 200){
				var data = JSON.parse(req.responseText);
				var texte = document.getElementById("txt");
				var titre = document.getElementById("title");
				titre.innerHTML = title;
				texte.innerHTML = data.txt;
				document.getElementById("links").innerHTML = "";
				
				for(var i = 0; i < data.links.length; i++){

					var lien = document.createElement("A");
					var href = data.links[i].link;
					lien.href = href;
					lien.textContent = data.links[i].txt;
					a = document.getElementById('links').appendChild(lien);
					document.getElementById('links').innerHTML += "<br>";
					lien.innerHTML = data.links[i].txt;
				}
				
			}
			else {
				console.log("Erreur " + req.status);
			}
		};
		req.send();
}

window.addEventListener("load", function() {
	chapitren();
	window.addEventListener("hashchange", chapitren);
});