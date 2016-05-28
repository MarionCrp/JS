// Fonction principale : 
// 		- Affichage de l'heure
//		- Appelle de la fonction de reveil_veille()
function horloge(){
	var date = new Date();
	var heure = date.getHours();
	var minutes = date.getMinutes();
	var secondes = date.getSeconds();
	var minutes_time = heure*60 + minutes;

	if (heure < 10) {
		heure = '0' + heure;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (secondes < 10) {
		secondes = '0' + secondes;
	}

	document.getElementById("time").innerHTML = heure + ':' + minutes + ':' + secondes;	
	setTimeout(horloge, 1000);

	reveil_veille(minutes_time);
	
	}

// Fonction de veille des réveils. 
//		On compare le temps en minutes du réveil et le temps en minutes du temps actuel ainsi que l'activation ou non du réveil
function reveil_veille(minutes_time){
	//Variable disponible pour tout le fichier
	nb_reveil = document.getElementsByClassName("reveil").length;
	
	// On fait la veille pour chacun des réveils
	for(var i = 1; i <= nb_reveil; i++){
		var reveil = document.getElementById("reveil_" + i);
		var sonnerie = reveil.getElementsByClassName('son')[0].value;
		var reveil_heure = parseInt(reveil.querySelector('.heure').selectedIndex);
		var reveil_minutes = parseInt(reveil.querySelector('.minutes').selectedIndex);
		var reveil_time = reveil_heure*60 + reveil_minutes;
		var alarm_selected = reveil.querySelector('.checked');
		var alarm_title = reveil.getElementsByTagName('input').libelle_reveil.value

		// On s'occupe de changer le design du bouton d'activation et de désactivation pour chaque réveil
		alarm_selected.addEventListener('click', function() {
			if(alarm_selected.checked)	{
				alarm_selected.parentNode.className = "btn btn-success";
				alarm_selected.nextSibling.textContent = " Activé ";
			}
			else { 
				alarm_selected.parentNode.className = "btn btn-danger";
				alarm_selected.nextSibling.textContent = " Désactivé ";
			}
		});

		// Si l'utilisateur ne spécifie pas de Titre à son réveil, le titre par défaut est "Alarme"
		if (alarm_title == ""){
			alarm_title = 'Alarme';
		}

		// On fait sonner le réveil si les conditions sont remplies
		if (reveil_time == minutes_time && alarm_selected.checked) {

			// On gère ici quel son sera joué en fonction du son choisi
			if (sonnerie == 'Alarme 1'){
				var sound = document.getElementsByTagName('audio')[0];
			} else if (sonnerie == 'Alarme 2'){
				var sound = document.getElementsByTagName('audio')[1];
			} else if (sonnerie == 'Compte à Rebours') {
				var sound = document.getElementsByTagName('audio')[2];
			} else if (sonnerie == 'Coq'){
				var sound = document.getElementsByTagName('audio')[3];
			} else if (sonnerie == 'Chèvre') {
				var sound = document.getElementsByTagName('audio')[4];
			} else {
				var sound = document.getElementsByTagName('audio')[5];
			}

			// On répète le son jusqu'à ce que l'alerte soit fermée
			sound.addEventListener('ended', function() {
			    this.currentTime = 0;
			    this.play();
			}, false);

			sound.play();
			
			alert(alarm_title);
			
			sound.pause();

			// On désactive le réveil afin que la veille ne se déclenche plus pour la même minute
			reveil.querySelector('.checked').checked = false;
			// On remet le bouton en Rouge, et au statut "désactivé"
			alarm_selected.parentNode.className = "btn btn-danger";
			alarm_selected.nextSibling.textContent = " Désactivé ";
		}
	}
}

// Formulaire pour remplir les champs 'select' du formulaire
function reveil_form(){
	var heure = document.getElementsByClassName("heure")[0]; 
	var minutes = document.getElementsByClassName("minutes")[0]; 
	var i;
	for(i = 0; i <= 23; i++){
		if (i < 10) heure.innerHTML += "<option>0" + i + "</option>";
		else heure.innerHTML += "<option>" + i + "</option>";
	}
	for(i = 0; i < 60; i += 1){
		if (i < 10) minutes.innerHTML += "<option>0" + i + "</option>";
		else minutes.innerHTML += "<option>" + i + "</option>";
	}
}

// Fonction d'ajout d'un réveil
function ajouter_reveil(){
	var reveil = document.getElementById("bouton_ajout");
	reveil.addEventListener("click", function(){
		var clone = document.getElementById("reveil_1").cloneNode(true);
	 	document.getElementById("tab").appendChild(clone);
	 	clone.id = "reveil_" + ++nb_reveil;
	 	clone.getElementsByTagName('input').libelle_reveil.value = "";
	 	bouton_suppr = clone.querySelector('span');

	 	//On place une veille sur le bouton de suppression
		bouton_suppr.addEventListener("click",function(){	
			suppression(this);
			});
	});
}

function suppression(element){
	var reveil_a_supprimer = element.parentElement.parentElement;
	document.getElementById("tab").removeChild(reveil_a_supprimer);
}


window.addEventListener("load", function() {
	horloge();
	ajouter_reveil();
	reveil_form();
	suppression();
	play_sound();
});



